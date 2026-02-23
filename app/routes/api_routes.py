from flask import Blueprint, request, jsonify
from app.services.model_service import analyze_url
from app import socketio

api_bp = Blueprint("api", __name__)

@api_bp.route("/check", methods=["POST"])
def check_url():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL missing"}), 400

    result = analyze_url(url)

    # Emit live event
    socketio.emit("new_scan", {
        "url": url,
        "risk_score": result["risk_score"],
        "threat_level": result["threat_level"]
    })

    return jsonify(result)