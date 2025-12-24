from sklearn.metrics.pairwise import cosine_similarity
from .data_loader import DataLoader
from .text_preprocessor import TextPreprocessor
from utils.helpers import save_model, load_model
from pathlib import Path

class Recommender:
    def __init__(self, load_pretrained=True):
        self.df = None
        self.preprocessor = None
        self.matrix = None
        
        if load_pretrained:
            self._load_pretrained()
        else:
            self._train_new()
    
    def _load_pretrained(self):
        try:
            self.df = load_model('dataframe.pkl')
            self.preprocessor = load_model('preprocessor.pkl')
            self.matrix = load_model('tfidf_matrix.pkl')
            print("✓ Loaded pretrained model")
        except FileNotFoundError:
            print("⚠ No pretrained model found. Training new model...")
            self._train_new()
    
    def _train_new(self):
        loader = DataLoader()
        self.df = loader.load_data()
        self.preprocessor = TextPreprocessor()
        self.matrix = self.preprocessor.fit_transform(self.df['combined_text'])
        self._save_model()
    
    def _save_model(self):
        save_model(self.df, 'dataframe.pkl')
        save_model(self.preprocessor, 'preprocessor.pkl')
        save_model(self.matrix, 'tfidf_matrix.pkl')
    
    def recommend(self, query, top_k=5):
        if not query:
            return {"error": "No query provided"}
        
        query_vec = self.preprocessor.transform([query])
        similarity = cosine_similarity(query_vec, self.matrix).flatten()
        top_indices = similarity.argsort()[-top_k:][::-1]
        
        results = []
        for idx in top_indices:
            row = self.df.iloc[idx]
            results.append({
                "name": row["name"],
                "review_title": row["reviews.title"],
                "review_text": row["reviews.text"][:200] + "..." if len(row["reviews.text"]) > 200 else row["reviews.text"],
                "rating": float(row["reviews.rating"]) if row["reviews.rating"] else None,
                "similarity_score": round(float(similarity[idx]), 4)
            })
        
        return {"query": query, "results": results, "count": len(results)}