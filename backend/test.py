from model import train_model, explain_churn, get_best_action

model, X_test = train_model()

prediction = model.predict(X_test[:1])[0]

reason = explain_churn()
action = get_best_action()

print("Churn Prediction:", prediction)
print("Reason:", reason)
print("Best Action:", action)