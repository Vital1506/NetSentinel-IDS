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
```text
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
```

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Vital1506/NetSentinel-IDS.git
cd NetSentinel-IDS
```

---

### 2️⃣ Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
```

---

### 3️⃣ Install Dependencies

Preferred:
```bash
pip install -r requirements.txt
```

Alternative:
```bash
pip install flask flask-sqlalchemy flask-socketio flask-jwt-extended flask-limiter scikit-learn joblib
```

---

### 4️⃣ Train Machine Learning Model
```bash
python train_model.py
```

This generates:
```text
models/model.pkl
```

---

### 5️⃣ Run Application
```bash
python run.py
```

Open in browser:
```text
http://127.0.0.1:5000
```

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
Cybersecurity Enthusiast  
GitHub: https://github.com/Vital1506

---

# 🌱 Biomass-Derived Activated Carbon for Supercapacitors

### Turning agricultural biomass into a functional energy-storage material.

## The Challenge

Can agricultural biomass be transformed into a low-cost material suitable for energy storage?

## The Idea

Instead of treating biomass as waste, I explored its potential as a precursor for porous activated carbon.

**Biomass → Activated Carbon → Electrode → Supercapacitor → Testing**

## What I Did

- Prepared biomass-derived activated carbon
- Fabricated electrodes on nickel foam
- Built 2-electrode and 3-electrode configurations
- Performed CV, GCD and EIS measurements
- Analysed electrochemical behaviour using Origin and ZSimpWin

## Results

| Configuration | Specific Capacitance |
|---|---:|
| 2-electrode | 43.33 F g⁻¹ |
| 3-electrode | 26.66 F g⁻¹ |

## What I Learned

This project taught me how a material moves from an initial idea through:

**Material → Prototype → Testing → Data → Interpretation**

More importantly, it showed me how sustainable materials research can connect scientific exploration with real-world applications.

## My Role

Research Intern  
Department of Metallurgical & Materials Engineering  
IIT Madras

May – July 2025
