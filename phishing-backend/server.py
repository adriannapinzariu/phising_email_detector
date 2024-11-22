from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

model = joblib.load("svm_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    email_content = data.get("email_content", "")
    if not email_content:
        return jsonify({"error": "Email content is required"}), 400

    email_tfidf = vectorizer.transform([email_content])
    prediction = model.predict(email_tfidf)[0]
    confidence = model.predict_proba(email_tfidf)[0][1] * 100
    return jsonify({
        "is_phishing": bool(prediction),
        "confidence": round(confidence, 2),
    })

if __name__ == "__main__":
    app.run(debug=True)
