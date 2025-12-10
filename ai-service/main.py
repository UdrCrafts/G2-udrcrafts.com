from flask import Flask, request, jsonify
from services.recommendation_service import RecommendationService

app = Flask(__name__)
service = RecommendationService()

@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "service": "AI Recommendation Engine"})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    query = data.get("query", "")
    top_k = data.get("top_k", 5)
    
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    
    results = service.get_recommendations(query, top_k)
    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)