import re
from sklearn.feature_extraction.text import TfidfVectorizer

class TextPreprocessor:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            ngram_range=(1, 2),
            min_df=2,
            max_df=0.8
        )
    
    @staticmethod
    def clean_text(text):
        text = text.lower()
        text = re.sub(r'[^a-z0-9\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def fit_transform(self, texts):
        cleaned = [self.clean_text(t) for t in texts]
        return self.vectorizer.fit_transform(cleaned)
    
    def transform(self, texts):
        cleaned = [self.clean_text(t) for t in texts]
        return self.vectorizer.transform(cleaned)
