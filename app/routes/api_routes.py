from flask import Blueprint, jsonify, request

from app import socketio
from app.services.model_service import analyze_url

api_bp = Blueprint("api", __name__)


@api_bp.route("/check", methods=["POST"])
def check_url():
    data = request.get_json(silent=True) or {}
    url = data.get("url")

    if not isinstance(url, str) or not url.strip():
        return jsonify({"error": "URL missing"}), 400

    try:
        result = analyze_url(url.strip())
    except FileNotFoundError as exc:
        return jsonify({"error": str(exc)}), 503

    socketio.emit(
        "new_scan",
        {
            "url": url.strip(),
            "risk_score": result["risk_score"],
            "threat_level": result["threat_level"],
        },
    )

    return jsonify(result)
