from pathlib import Path
from transformers import BertTokenizerFast, BertForSequenceClassification
import torch
import numpy as np

# Go up one level from book_my_go_app to book_my_go, then into ml_models
MODEL_DIR = Path(__file__).resolve().parent.parent / "ml_models" / "bert_hotel_sentiment_custom"
MODEL_PATH = str(MODEL_DIR)

# Verify the path exists (optional - remove in production)
if not MODEL_DIR.exists():
    raise FileNotFoundError(f"Model directory not found: {MODEL_PATH}")

# Load tokenizer
tokenizer = BertTokenizerFast.from_pretrained(
    MODEL_PATH,
    local_files_only=True
)

# Load model
model = BertForSequenceClassification.from_pretrained(
    MODEL_PATH,
    local_files_only=True,
    use_safetensors=True
)

def predict_sentiment(text):
    """
    Predict sentiment for hotel review text
    Returns: dictionary with label, confidence, and all scores
    """
    if not text or not text.strip():
        return {
            'label': 'neutral',
            'confidence': 0.5,
            'scores': {'negative': 0.33, 'neutral': 0.34, 'positive': 0.33}
        }
    
    # Tokenize input
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    
    # Get predictions
    with torch.no_grad():
        outputs = model(**inputs)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
        probs = probabilities[0].numpy()
    
    # Map to sentiment labels based on your training (0=negative, 1=neutral, 2=positive)
    labels = ['negative', 'neutral', 'positive']
    predicted_class = np.argmax(probs)
    confidence = probs[predicted_class]
    
    return {
        'label': labels[predicted_class],
        'confidence': float(confidence),
        'scores': {
            'negative': float(probs[0]),
            'neutral': float(probs[1]),
            'positive': float(probs[2])
        }
    }