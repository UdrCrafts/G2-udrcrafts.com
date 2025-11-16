from flask import Flask, jsonify, request
from models.recommender import Recommender

app = Flask(__name__)
recommender = Recommender()

@app.route("/")
def home():
    return jsonify({"message": "AI service running"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    product = data.get("product")

    recommendations = recommender.recommend(product)

    return jsonify({
        "product": product,
        "recommendations": recommendations
    })

if __name__ == "__main__":
    app.run(debug=True)