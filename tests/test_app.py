from app import create_app
from app.services.feature_service import extract_features


def test_feature_extraction_returns_expected_vector():
    features = extract_features("https://example.com/login?id=123")
    assert len(features) == 13
    assert all(isinstance(value, (int, float)) for value in features)


def test_home_page():
    app = create_app()
    client = app.test_client()
    response = client.get("/")
    assert response.status_code == 200


def test_dashboard_page():
    app = create_app()
    client = app.test_client()
    response = client.get("/dashboard")
    assert response.status_code == 200


def test_login_rejects_invalid_credentials():
    app = create_app()
    client = app.test_client()
    response = client.post(
        "/auth/login",
        json={"username": "invalid", "password": "invalid"},
    )
    assert response.status_code == 401


def test_check_url_rejects_missing_url():
    app = create_app()
    client = app.test_client()
    response = client.post("/api/check", json={})
    assert response.status_code == 400
