import os
import pandas as pd

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATA_PATH = os.path.join(BASE_DIR, 'hotel_reviews.csv')

def load_dataset():
    return pd.read_csv(DATA_PATH)

def get_avg_ratings_by_area():
    df = load_dataset()
    print(df.columns.tolist())  # to confirm column names
    avg_ratings = df.groupby(['Name', 'Area'])['Rating(Out of 10)'].mean().reset_index()
    return avg_ratings


def filter_hotels_by_area_and_rating(area, min_rating=0):
    avg_ratings = get_avg_ratings_by_area()
    filtered = avg_ratings[(avg_ratings['Area'] == area) & (avg_ratings['Rating(Out of 10)'] >= min_rating)]
    return filtered

def recommend_hotels(area, min_rating=0):
    filtered_df = filter_hotels_by_area_and_rating(area, min_rating)
    return filtered_df.to_dict(orient='records')

if __name__ == "__main__":
    # Test
    results = recommend_hotels("Mahipalpur, New Delhi", 7.5)
    print(results)
