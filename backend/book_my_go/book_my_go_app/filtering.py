import os
import re
import pandas as pd
from .ml_utils import predict_sentiment

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATA_PATH = os.path.join(BASE_DIR, 'hotel_reviews.csv')


def load_dataset():
    """Load the hotel reviews CSV"""
    return pd.read_csv(DATA_PATH)


def is_valid_review(text):
    """Minimal filtering - only filter truly unusable reviews"""
    if pd.isna(text) or not text.strip():
        return False
    
    text_lower = text.strip().lower()
    if 'no comments available' in text_lower:
        return False
        
    return True


def preprocess_text(text):
    """Basic preprocessing for deduplication and analysis"""
    if not text:
        return ""
    text = text.lower().strip()  # lowercase and strip spaces
    text = re.sub(r'\s+', ' ', text)  # replace multiple spaces with one
    text = re.sub(r'[^\w\s]', '', text)  # remove punctuation
    return text


def remove_duplicates(reviews_list):
    """Remove duplicates based on preprocessed review text"""
    seen_texts = set()
    unique_reviews = []
    for r in reviews_list:
        text = preprocess_text(r['review_text'])
        if text not in seen_texts:
            seen_texts.add(text)
            unique_reviews.append(r)
    return unique_reviews


def analyze_sentiment_for_text(text):
    """Analyze sentiment for a single text using your custom BERT model"""
    if not is_valid_review(text):
        return None, None
    
    try:
        result = predict_sentiment(text)
        return result['label'], result['confidence']
    except Exception as e:
        print(f"Error analyzing sentiment: {e}")
        return None, None


def get_hotels_with_sentiment_analysis(area=None, min_rating=0, max_rating=None):
    """Returns hotels with ratings, reviews, and sentiment info"""
    df = load_dataset()

    # Filter by area
    if area:
        df = df[df['Area'] == area]

    # Filter by rating
    df = df[df['Rating(Out of 10)'] >= min_rating]
    if max_rating is not None:
        df = df[df['Rating(Out of 10)'] <= max_rating]

    hotels = []

    for hotel_name in df['Name'].unique():
        hotel_reviews = df[df['Name'] == hotel_name]

        hotel_info = {
            'name': hotel_name,
            'area': hotel_reviews['Area'].iloc[0],
            'avg_rating': round(hotel_reviews['Rating(Out of 10)'].mean(), 2),
            'total_reviews': len(hotel_reviews),
        }

        # Detect review column
        review_column = None
        for col in ['Review_Text', 'Review', 'review']:
            if col in hotel_reviews.columns:
                review_column = col
                break

        # Analyze sentiment
        review_sentiments = []
        if review_column:
            for review_text in hotel_reviews[review_column].fillna(''):
                sentiment_label, confidence = analyze_sentiment_for_text(review_text)
                if sentiment_label is not None and confidence is not None:
                    review_sentiments.append({
                        'review_text': preprocess_text(review_text),
                        'original_text': review_text,
                        'sentiment': sentiment_label,
                        'confidence': round(confidence, 2)
                    })

        # Remove duplicates
        review_sentiments = remove_duplicates(review_sentiments)

        hotel_info['reviews'] = review_sentiments
        hotel_info['analyzed_reviews_count'] = len(review_sentiments)

        # Sentiment summary
        if review_sentiments:
            total_reviews = len(review_sentiments)
            pos_count = sum(1 for r in review_sentiments if r['sentiment'] == 'positive')
            neg_count = sum(1 for r in review_sentiments if r['sentiment'] == 'negative')
            neu_count = sum(1 for r in review_sentiments if r['sentiment'] == 'neutral')

            hotel_info.update({
                'positive_reviews': pos_count,
                'negative_reviews': neg_count,
                'neutral_reviews': neu_count,
                'positive_percentage': round(pos_count / total_reviews * 100, 2),
                'negative_percentage': round(neg_count / total_reviews * 100, 2),
                'neutral_percentage': round(neu_count / total_reviews * 100, 2),
                'review_summary': max({'positive': pos_count, 'negative': neg_count, 'neutral': neu_count}, key=lambda k: {'positive': pos_count, 'negative': neg_count, 'neutral': neu_count}[k])
            })
        else:
            hotel_info.update({
                'positive_reviews': 0,
                'negative_reviews': 0,
                'neutral_reviews': 0,
                'positive_percentage': 0,
                'negative_percentage': 0,
                'neutral_percentage': 0,
                'review_summary': 'no_reviews'
            })

        hotels.append(hotel_info)

    hotels.sort(key=lambda x: x['avg_rating'], reverse=True)
    return hotels


def recommend_hotels(area=None, min_rating=0, max_rating=None):
    return get_hotels_with_sentiment_analysis(area, min_rating, max_rating)


if __name__ == "__main__":
    results = recommend_hotels("Mahipalpur, New Delhi", min_rating=7.5)
    for hotel in results[:3]:
        print(f"Hotel: {hotel['name']}")
        print(f"Analyzed Reviews: {hotel['analyzed_reviews_count']}")
        print(f"Sentiment Summary: {hotel['review_summary']}")
        print("---")
