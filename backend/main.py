from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import pandas as pd
import model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Train model once
model_obj = model.train_model()


@app.get("/")
def home():
    return {"message": "API is running 🚀"}


@app.get("/predict")
def predict(
    tenure: int = Query(...),
    monthly_charges: float = Query(...),
    total_charges: float = Query(...)
):
    note = None

    # ✅ MUST BE INSIDE FUNCTION (indentation)
    if monthly_charges > 150:
        note = "Monthly charges exceeded normal range → adjusted to 150"
        monthly_charges = 150

    if tenure > 72:
        note = "Tenure exceeded normal range → adjusted to 72"
        tenure = 72

    if total_charges > 10000:
        note = "Total charges exceeded normal range → adjusted to 10000"
        total_charges = 10000

    # ✅ Input DataFrame
    data = pd.DataFrame([{
        "tenure": tenure,
        "MonthlyCharges": monthly_charges,
        "TotalCharges": total_charges
    }])

    # ✅ Prediction
    prediction = int(model_obj.predict(data)[0])
    prob = model_obj.predict_proba(data)[0][1]

    user_data = {k: round(v, 2) for k, v in data.iloc[0].to_dict().items()}

    # ✅ Action
    if prob >= 0.8:
        action = {"name": "Premium Retention Plan", "cost": 1000, "saved": 10}
    elif prob >= 0.6:
        action = {"name": "Discount Offer", "cost": 500, "saved": 6}
    elif prob >= 0.4:
        action = {"name": "Personalized Email", "cost": 50, "saved": 3}
    elif prob >= 0.2:
        action = {"name": "Engagement Call", "cost": 100, "saved": 2}
    else:
        action = {"name": "No Action Needed", "cost": 0, "saved": 0}

    # ✅ Priority
    if prob >= 0.8:
        priority = "CRITICAL"
    elif prob >= 0.6:
        priority = "HIGH"
    elif prob >= 0.4:
        priority = "MEDIUM"
    else:
        priority = "LOW"

    # ✅ Confidence
    confidence = "High Confidence" if prob > 0.75 or prob < 0.25 else "Moderate Confidence"

    # ✅ Warning
    warning = "⚠️ Early churn signal detected" if prob > 0.6 else "No immediate risk"

    # ✅ Segment
    if monthly_charges > 100 and tenure > 24:
        segment = "Premium Customer"
    elif monthly_charges > 70:
        segment = "High Value Customer"
    elif tenure < 12:
        segment = "At-Risk New Customer"
    else:
        segment = "Standard Customer"

    # ✅ Reason
    reasons = []
    if tenure < 12:
        reasons.append("Low tenure")
    if monthly_charges > 70:
        reasons.append("High monthly charges")
    if total_charges < 1000:
        reasons.append("Low total spending")

    reason = ", ".join(reasons) if reasons else "Stable customer"

    # ✅ Insight
    insight = f"""
Customer has a {round(prob*100,2)}% probability of churn.
Key factors: {reason}.
Recommended strategy: {action['name']} based on risk level.
"""

    # ✅ RETURN (comma fixed)
    return {
        "user_data": user_data,
        "churn_prediction": prediction,
        "churn_probability": round(prob * 100, 2),
        "priority": priority,
        "warning": warning,
        "segment": segment,
        "confidence": confidence,
        "reason": reason,
        "action": action["name"],
        "cost": action["cost"],
        "expected_saves": action["saved"],
        "insight": insight,
        "note": note
    }