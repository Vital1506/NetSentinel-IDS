import os

import joblib

from app.services.feature_service import extract_features

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(BASE_DIR))
MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "model.pkl")


def get_model():
    """Load the trained model when it is first needed."""
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"Trained model not found at {MODEL_PATH}. Run train_model.py first."
        )
    return joblib.load(MODEL_PATH)


def analyze_url(url):
    model = get_model()
    features = extract_features(url)

    prediction = int(model.predict([features])[0])
    probability = float(model.predict_proba([features])[0][1])
    risk_score = int(probability * 100)

    if risk_score < 25:
        threat = "LOW"
    elif risk_score < 50:
        threat = "MEDIUM"
    elif risk_score < 75:
        threat = "HIGH"
    else:
        threat = "CRITICAL"

    return {
        "risk_score": risk_score,
        "threat_level": threat,
        "prediction": prediction,
    }
