from models.recommender import Recommender

class RecommendationService:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.recommender = Recommender(load_pretrained=True)
        return cls._instance
    
    def get_recommendations(self, query, top_k=5):
        return self.recommender.recommend(query, top_k)
