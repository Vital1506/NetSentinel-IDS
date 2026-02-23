import random
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from app.services.feature_service import extract_features

safe_urls = [
    "https://google.com",
    "https://github.com",
    "https://stackoverflow.com",
    "https://wikipedia.org",
    "https://amazon.in",
    "https://microsoft.com",
]

phishing_urls = [
    "http://login-google-security.com",
    "http://verify-paypal-account.com",
    "http://update-bank-info.net",
    "http://secure-facebook-login.ru",
    "http://free-gift-card-claim.com",
    "http://192.168.0.1/verify",
]

X = []
y = []

for _ in range(500):
    url = random.choice(safe_urls)
    X.append(extract_features(url))
    y.append(0)

for _ in range(500):
    url = random.choice(phishing_urls)
    X.append(extract_features(url))
    y.append(1)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print("Model Accuracy:", accuracy)

joblib.dump(model, "models/model.pkl")
print("Model saved to models/model.pkl")