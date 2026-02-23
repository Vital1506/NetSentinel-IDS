import joblib
import os
from app.services.feature_service import extract_features

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(BASE_DIR))
MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "model.pkl")

model = joblib.load(MODEL_PATH)

def analyze_url(url):
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
        "prediction": prediction
    }