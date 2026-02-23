from flask import Blueprint, render_template
from datetime import datetime

web_bp = Blueprint("web", __name__)

# Fake stats for dashboard
stats_data = {
    "total": 120,
    "high": 20,
    "medium": 35,
    "low": 65
}

fake_scans = [
    {
        "url": "http://example.com",
        "risk_score": 10,
        "threat_level": "LOW",
        "timestamp": datetime.now()
    }
]

@web_bp.route("/")
def index():
    return render_template("index.html")

@web_bp.route("/dashboard")
def dashboard():
    return render_template(
        "dashboard.html",
        stats=stats_data,
        scans=fake_scans
    )