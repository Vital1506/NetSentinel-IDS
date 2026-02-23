🛡 NetSentinel IDS
Intelligent Phishing Detection & SOC Simulation Platform
🚀 Overview

NetSentinel IDS is a machine learning-powered phishing detection system integrated with a real-time Security Operations Center (SOC) simulation.

It analyzes URLs using a trained ML model, assigns dynamic risk scores, classifies threat severity, and automatically generates incidents for high-risk detections.

The platform includes:

Real-time WebSocket alert system

Severity-based threat classification

Incident response management dashboard

ML-based probability scoring

Role-ready backend architecture

Enterprise modular structure

🧠 Key Features
🔍 Machine Learning Detection

Custom feature extraction engine

RandomForestClassifier model

Probability-based risk scoring

Dynamic severity classification:

LOW

MEDIUM

HIGH

CRITICAL

🚨 SOC Alert Engine

Real-time WebSocket feed

Flashing CRITICAL alerts

Sound notification

Severity escalation

Alert counter badge

📊 Analytics Dashboard

Risk distribution charts

Weekly scan trend visualization

Animated statistics counters

Live monitoring feed

🗂 Incident Response Management

Auto-create incidents for HIGH/CRITICAL threats

Incident database storage

Status lifecycle (OPEN / INVESTIGATING / RESOLVED)

Incident dashboard

🏗 Project Architecture
NetSentinel-IDS/
│
├── run.py
├── config.py
├── train_model.py
├── models/
│   └── model.pkl
│
├── app/
│   ├── __init__.py
│   ├── models.py
│   │
│   ├── services/
│   │   ├── feature_service.py
│   │   └── model_service.py
│   │
│   ├── routes/
│   │   ├── web_routes.py
│   │   └── api_routes.py
│   │
│   ├── templates/
│   └── static/
⚙️ Installation
1️⃣ Clone the Repository
git clone <your-repo-url>
cd NetSentinel-IDS
2️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate   # Windows
3️⃣ Install Dependencies
python -m pip install -r requirements.txt

If needed:

python -m pip install flask-socketio eventlet scikit-learn joblib
4️⃣ Train the ML Model
python train_model.py

This will generate:

models/model.pkl
5️⃣ Run the Application
python run.py

Open browser:

http://127.0.0.1:5000
🔬 How It Works

User submits URL

Feature extraction engine processes lexical patterns

ML model predicts phishing probability

Risk score is calculated

Severity classification assigned

WebSocket event emitted

If HIGH/CRITICAL:

Incident created in database

Alert triggered in frontend

🧩 Technology Stack
Backend

Flask

Flask-SQLAlchemy

Flask-SocketIO

Flask-JWT-Extended

Flask-Limiter

Scikit-learn

Joblib

Frontend

HTML5

CSS3 (SOC Design System)

Vanilla JavaScript (Modular Architecture)

Chart.js

Database

SQLite (development)

🛡 Threat Classification Logic
Risk Score	Threat Level
0–24%	LOW
25–49%	MEDIUM
50–74%	HIGH
75–100%	CRITICAL
📈 Future Enhancements

Role-Based Access Control (RBAC)

Analyst assignment system

Incident resolution tracking

VirusTotal API integration

Domain WHOIS verification

Docker containerization

Production deployment with Gunicorn

Redis-backed rate limiting

SIEM-style log monitoring panel