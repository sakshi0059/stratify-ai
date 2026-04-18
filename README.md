<div align="center">

# ⚡ Stratify AI

### *Predict. Simulate. Decide.*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://stratify-ai-delta.vercel.app/)
[![Backend API](https://img.shields.io/badge/⚡_Backend_API-Render-46E3B7?style=for-the-badge&logo=render)](https://stratify-ai-k5sb.onrender.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://vitejs.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)

<br/>

> **Stratify AI** is a full-stack machine learning application that transforms static churn predictions  
> into **interactive, real-time simulations** — bridging the gap between data science and business decisions.

<br/>

---

</div>

## 📌 Table of Contents

- [🧠 What is Stratify AI?](#-what-is-stratify-ai)
- [🔥 Core Features](#-core-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🧩 Tech Stack](#-tech-stack)
- [🔄 How It Works](#-how-it-works)
- [💡 What Sets This Apart](#-what-sets-this-apart)
- [🎯 Real-World Value](#-real-world-value)
- [🚀 Getting Started](#-getting-started)
- [⚠️ Current Limitations](#️-current-limitations)
- [🔭 Future Scope](#-future-scope)

---

## 🧠 What is Stratify AI?

Most machine learning projects stop at a prediction.  
**Stratify AI doesn't.**

```
Traditional ML:    Input ──→ Prediction                        ✗ static, passive

Stratify AI:       Input ──→ Prediction ──→ Modify ──→ Re-evaluate ──→ Understand   ✔ interactive, actionable
```

Stratify AI is a **full-stack churn prediction system** that allows users to not only receive predictions — but to **experiment, explore, and understand** them through dynamic what-if simulations. It turns a model into a decision-making tool.

---

## 🔥 Core Features

### `01` — Prediction Engine
> Accepts structured customer data and produces instant, interpretable predictions.

| Input Feature     | Description                          |
|-------------------|--------------------------------------|
| `Tenure`          | How long the customer has been active |
| `Monthly Charges` | Current monthly billing amount       |
| `Total Charges`   | Cumulative charges to date           |

**Outputs:**
- ✅ **Churn Probability** — Numerical likelihood of churn
- ✅ **Outcome Label** — Churn / No Churn classification

---

### `02` — What-If Simulation *(Core Feature 🔥)*
> The feature that makes Stratify AI genuinely useful.

Users can **dynamically modify any input value** and the system recalculates predictions **instantly** through live API calls.

```
❓ "What happens if tenure increases by 6 months?"
❓ "How does a 20% pricing change affect churn probability?"
❓ "At what monthly charge does this customer become high-risk?"
```

This transforms Stratify AI from a prediction tool into an **interactive decision support system**.

---

### `03` — Insight Generation
> Beyond numbers — context, reasoning, and recommended actions.

| Insight Type              | Description                                   |
|---------------------------|-----------------------------------------------|
| 📊 Churn Probability      | Exact likelihood score                        |
| 🧩 Customer Segment       | Behavioral classification                     |
| ⚠️ Risk Priority          | `LOW` → `MEDIUM` → `HIGH` → `CRITICAL`        |
| 💡 Recommended Actions    | Suggested retention strategies                |
| 🧠 Reasoning              | Human-readable explanation of the prediction  |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────┐
│              👤  User Interface              │
│         React + Vite  (Vercel)              │
└──────────────────────┬──────────────────────┘
                       │  HTTP / Fetch API
                       ▼
┌─────────────────────────────────────────────┐
│              ⚡  REST API Layer              │
│           FastAPI  (Python / Render)        │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│            🧠  ML Inference Engine           │
│     Scikit-learn Model + Pandas + NumPy     │
└──────────────────────┬──────────────────────┘
                       │  JSON Response
                       ▼
┌─────────────────────────────────────────────┐
│           📊  Prediction + Insights         │
│     Probability · Risk · Actions · Reason  │
└─────────────────────────────────────────────┘
```

---

## 🧩 Tech Stack

### 🌐 Frontend
| Technology | Role |
|------------|------|
| **React + Vite** | Fast, component-based UI with hot module reload |
| **CSS** | Styling, layout, responsive design |
| **Fetch API** | Async communication with the backend |

### ⚙️ Backend
| Technology | Role |
|------------|------|
| **FastAPI** | High-performance Python API framework |
| **REST API** | Standard JSON communication protocol |

### 🧠 Machine Learning
| Technology | Role |
|------------|------|
| **Scikit-learn** | Model training, prediction pipeline |
| **Pandas** | Data loading and feature processing |
| **NumPy** | Numerical operations and array handling |

### 🚀 Deployment
| Technology | Role |
|------------|------|
| **Vercel** | Frontend hosting — fast CDN delivery |
| **Render** | Backend API hosting — auto-deploy from GitHub |

---

## 🔄 How It Works

```
Step 1 ──  User enters customer data (Tenure, Monthly Charges, Total Charges)
              │
Step 2 ──  Frontend sends POST request to FastAPI backend
              │
Step 3 ──  Backend validates and preprocesses input data
              │
Step 4 ──  ML model generates prediction + confidence score
              │
Step 5 ──  System generates insights: segment, risk level, reasoning, actions
              │
Step 6 ──  JSON response returned to frontend
              │
Step 7 ──  UI updates instantly with prediction results
              │
Step 8 ──  User modifies inputs (What-If) → Returns to Step 2
```

---

## 💡 What Sets This Apart

| Feature | Traditional ML Apps | Stratify AI |
|---------|---------------------|-------------|
| Prediction | ✅ | ✅ |
| Real-Time Simulation | ❌ | ✅ |
| Insight Generation | ❌ | ✅ |
| Decision Guidance | ❌ | ✅ |
| Full-Stack Integration | ❌ | ✅ |
| Interactive What-If | ❌ | ✅ |

---

## 🎯 Real-World Value

- 🏢 **Business Teams** — Identify high-risk customers before they churn
- 📈 **Retention Strategy** — Simulate the impact of pricing or engagement changes
- 🤝 **Customer Success** — Prioritize outreach using risk scores
- 📊 **Decision Support** — Back strategic decisions with model-driven reasoning
- 🔮 **Foundation** — Designed to evolve into a full enterprise decision platform

---

## 🚀 Getting Started

### Prerequisites
```
Node.js >= 18
Python >= 3.10
pip
```

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/stratify-ai.git
cd stratify-ai
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
> API runs at `http://127.0.0.1:8000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
> App runs at `http://localhost:5173`

### 4. Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=https://stratify-ai-k5sb.onrender.com
```

---

## ⚠️ Current Limitations

| Limitation | Details |
|------------|---------|
| 🔐 No Authentication | System is open-access, no user management |
| 📦 Limited Dataset | Model trained on a constrained dataset |
| ⚙️ Not Production-Optimized | Model not tuned for high-volume scaling |

---

## 🔭 Future Scope

```
v2.0  ──  📊  Dashboards & data visualization layer
v2.1  ──  🔐  User authentication & role-based access
v2.2  ──  🤖  Improved model accuracy with larger datasets
v2.3  ──  💬  NLP module for customer feedback analysis
v3.0  ──  ☁️  Production-scale backend with distributed inference
```

---

## 🏆 Summary

<div align="center">

**Stratify AI** is not just a machine learning project.  
It is a complete, interactive system that bridges:

`Machine Learning` × `Backend Engineering` × `Frontend Development`

*Delivering a practical tool for predictive analysis and data-driven decision making.*

<br/>

---

*Built with precision. Designed for impact.*

</div>
