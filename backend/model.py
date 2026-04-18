import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


def train_model():
    df = pd.read_csv("data/churn.csv")

    # Target conversion
    df['Churn'] = df['Churn'].map({'Yes': 1, 'No': 0})

    # Features (must match main.py)
    features = ['tenure', 'MonthlyCharges', 'TotalCharges']

    # Clean data
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df.dropna(inplace=True)

    X = df[features]
    y = df['Churn']

    X_train, _, y_train, _ = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # ✅ Pipeline (scaling + model)
    model = Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', LogisticRegression(max_iter=1000))
    ])

    model.fit(X_train, y_train)

    return model


def explain_churn():
    return "Users with low tenure and high monthly charges are more likely to churn"