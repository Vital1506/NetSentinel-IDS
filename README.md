# 🛡 NetSentinel IDS  
### Intelligent Phishing Detection & SOC Simulation Platform

---

## 🚀 Overview

**NetSentinel IDS** is a machine learning-powered phishing detection platform integrated with a real-time Security Operations Center (SOC) simulation system.

The application analyzes URLs using a trained RandomForest model, assigns dynamic probability-based risk scores, classifies threat severity, and automatically generates incidents for high-risk detections.

This project simulates an enterprise-grade cybersecurity monitoring system.

---

## 🧠 Core Features

### 🔍 Machine Learning Detection
- Custom URL lexical feature extraction engine
- RandomForestClassifier trained model
- Probability-based risk scoring
- Severity classification:
  - LOW
  - MEDIUM
  - HIGH
  - CRITICAL

---

### 🚨 Real-Time SOC Alert Engine
- WebSocket-based live alert streaming
- Critical threat escalation system
- Dynamic risk bar visualization
- Instant UI updates without refresh

---

### 📊 Analytics Dashboard
- Risk distribution visualization
- Weekly scan trend chart
- Live monitoring feed
- Animated statistics counters

---

### 🗂 Incident Response Management
- Automatic incident creation for HIGH & CRITICAL threats
- Database-backed incident tracking
- Status lifecycle:
  - OPEN
  - INVESTIGATING
  - RESOLVED
- Timestamp logging

---

## 🏗 Project Architecture
NetSentinel-IDS/
│
├── run.py
├── config.py
├── train_model.py
├── models/
│ └── model.pkl
│
├── app/
│ ├── init.py
│ ├── models.py
│ │
│ ├── services/
│ │ ├── feature_service.py
│ │ └── model_service.py
│ │
│ ├── routes/
│ │ ├── web_routes.py
│ │ └── api_routes.py
│ │
│ ├── templates/
│ └── static/

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository
git clone https://github.com/Vital1506/NetSentinel-IDS.git

cd NetSentinel-IDS

---

### 2️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate


---

### 3️⃣ Install Dependencies

If needed:
pip install -r requirements.txt

If needed:


pip install flask flask-sqlalchemy flask-socketio scikit-learn joblib


---

### 4️⃣ Train Machine Learning Model


python train_model.py


This generates:


models/model.pkl


---

### 5️⃣ Run Application


python run.py


Open in browser:


http://127.0.0.1:5000


---

## 🛡 Threat Classification Logic

| Risk Score | Threat Level |
|------------|-------------|
| 0–24%      | LOW         |
| 25–49%     | MEDIUM      |
| 50–74%     | HIGH        |
| 75–100%    | CRITICAL    |

---

## 🧩 Technology Stack

### Backend
- Flask
- Flask-SocketIO
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-Limiter
- Scikit-learn
- Joblib

### Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js

### Database
- SQLite (Development)

---

## 🔬 How It Works

1. User submits URL
2. Feature extraction engine analyzes lexical patterns
3. ML model predicts phishing probability
4. Risk score is calculated
5. Threat level is assigned
6. Real-time alert emitted via WebSocket
7. If HIGH/CRITICAL → Incident is automatically created

---

## 🎯 Project Highlights

- Machine Learning integrated into production backend
- Real-time WebSocket communication
- SOC workflow simulation
- Modular enterprise architecture
- Automated incident lifecycle tracking
- Probability-based threat scoring

---

## 🚀 Future Enhancements

- Role-Based Access Control (RBAC)
- Analyst assignment system
- VirusTotal API integration
- Domain WHOIS verification
- Docker containerization
- Production deployment with Gunicorn
- Redis-based rate limiting
- SIEM-style log monitoring panel

---

## 👨‍💻 Author

**Vital Karthikeyan**  
Cybersecurity  Enthusiast  
GitHub: https://github.com/Vital1506


Run:

