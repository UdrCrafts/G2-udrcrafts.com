# AI Recommendation System - Documentation

## 🏗️ Architecture Overview

### System Components

```
ai-service/
├── data/
│   └── reviews.csv              # Product reviews dataset
├── models/
│   ├── data_loader.py           # CSV loading & data preparation
│   ├── text_preprocessor.py     # Text cleaning & TF-IDF vectorization
│   ├── recommender.py           # Core recommendation engine
│   ├── dataframe.pkl            # Cached dataset (generated)
│   ├── preprocessor.pkl         # Trained vectorizer (generated)
│   └── tfidf_matrix.pkl         # Precomputed embeddings (generated)
├── services/
│   └── recommendation_service.py # Business logic layer (Singleton)
├── utils/
│   └── helpers.py               # Model persistence utilities
├── main.py                      # Flask API server
├── train_model.py               # Model training script
├── test_api.py                  # API testing script
└── requirements.txt             # Python dependencies
```

---

## 🧠 Machine Learning Pipeline

### 1. Data Loading
- **Module**: `data_loader.py`
- **Process**: Loads CSV → Selects columns (name, reviews.title, reviews.text, reviews.rating) → Fills NaN → Creates combined text field

### 2. Text Preprocessing
- **Module**: `text_preprocessor.py`
- **Steps**:
  - Lowercase conversion
  - Remove special characters
  - Remove extra whitespace
  - TF-IDF vectorization (max 5000 features, bigrams, stop words removal)

### 3. Model Training
- **Algorithm**: TF-IDF + Cosine Similarity
- **Features**: 
  - Unigrams + Bigrams (1-2 word phrases)
  - Max 5000 features
  - Min document frequency: 2
  - Max document frequency: 80%
- **Output**: Sparse matrix of document embeddings

### 4. Recommendation
- **Input**: User query (text)
- **Process**: 
  1. Preprocess query
  2. Transform to TF-IDF vector
  3. Compute cosine similarity with all products
  4. Return top-K most similar items
- **Output**: Product name, review, rating, similarity score

---

## 🚀 Setup & Installation

### Prerequisites
- Python 3.8+
- pip

### Installation Steps

```bash
# 1. Navigate to ai-service directory
cd ai-service

# 2. Install dependencies
pip install -r requirements.txt

# 3. Train the model (REQUIRED - first time only)
python train_model.py

# 4. Start the API server
python main.py
```

---

## 📡 API Usage

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "status": "healthy",
  "service": "AI Recommendation Engine"
}
```

#### 2. Get Recommendations
```http
POST /recommend
Content-Type: application/json

{
  "query": "iphone",
  "top_k": 5
}
```

**Parameters:**
- `query` (string, required): Search query
- `top_k` (integer, optional): Number of results (default: 5)

**Response:**
```json
{
  "query": "iphone",
  "count": 5,
  "results": [
    {
      "name": "iPhone 13 Pro",
      "review_title": "Amazing phone!",
      "review_text": "Best phone I've ever owned...",
      "rating": 5.0,
      "similarity_score": 0.8542
    }
  ]
}
```

---

## 🧪 Testing

### Run Test Suite
```bash
# Make sure API is running first (python main.py)
# Then in another terminal:
python test_api.py
```

### Manual Testing with cURL
```bash
# Health check
curl http://localhost:5000/

# Get recommendations
curl -X POST http://localhost:5000/recommend \
  -H "Content-Type: application/json" \
  -d '{"query": "kindle paperwhite", "top_k": 3}'
```

---

## 🔄 Training Process

### Initial Training
```bash
python train_model.py
```

**What happens:**
1. Loads reviews.csv dataset
2. Preprocesses text (cleaning, tokenization)
3. Trains TF-IDF vectorizer
4. Generates document embeddings
5. Saves 3 pickle files:
   - `dataframe.pkl` - Processed dataset
   - `preprocessor.pkl` - Trained vectorizer
   - `tfidf_matrix.pkl` - Precomputed embeddings

**Training Time:** ~10-30 seconds (depends on dataset size)

### Retraining
Delete the `.pkl` files and run `train_model.py` again, or modify the dataset and retrain.

---

## 🎯 Model Performance

### Current Baseline (TF-IDF + Cosine Similarity)

**Strengths:**
- ✅ Fast inference (<100ms)
- ✅ No GPU required
- ✅ Works well for keyword matching
- ✅ Lightweight (small model size)

**Limitations:**
- ❌ No semantic understanding
- ❌ Struggles with synonyms
- ❌ Cannot handle typos well

---

## 🚀 Future Improvements

### Phase 1: Enhanced TF-IDF
- [ ] Add product categories as features
- [ ] Implement weighted scoring (rating × similarity)
- [ ] Add brand filtering
- [ ] Implement caching layer (Redis)

### Phase 2: Semantic Search (BERT/Sentence-Transformers)
```python
# Proposed upgrade path
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(texts)
```

**Benefits:**
- ✅ Semantic understanding
- ✅ Better synonym handling
- ✅ Multilingual support

**Trade-offs:**
- ⚠️ Slower inference (200-500ms)
- ⚠️ Larger model size (~80MB)
- ⚠️ May require GPU for large datasets

### Phase 3: Hybrid Approach
- Combine TF-IDF (fast) + BERT (accurate)
- Use TF-IDF for initial filtering
- Use BERT for re-ranking top results

### Phase 4: Collaborative Filtering
- User-based recommendations
- Item-based recommendations
- Matrix factorization (SVD)

### Phase 5: Deep Learning
- Neural collaborative filtering
- Two-tower models
- Transformer-based ranking

---

## 🔧 Configuration

### Tuning TF-IDF Parameters
Edit `models/text_preprocessor.py`:

```python
self.vectorizer = TfidfVectorizer(
    max_features=5000,      # Increase for more features
    stop_words='english',   # Add custom stop words
    ngram_range=(1, 2),     # (1,3) for trigrams
    min_df=2,               # Min document frequency
    max_df=0.8              # Max document frequency
)
```

### Adjusting Response Size
Edit `models/recommender.py`:

```python
# Truncate review text
review_text = row["reviews.text"][:200]  # Change 200 to desired length
```

---

## 📊 Dataset Information

**Source:** Kaggle Product Reviews Dataset  
**Format:** CSV  
**Columns Used:**
- `name` - Product name
- `reviews.title` - Review title
- `reviews.text` - Review content
- `reviews.rating` - Rating (1-5)

**Preprocessing:**
- Missing values filled with empty strings
- Text combined: name + title + review
- Ratings preserved for display

---

## 🐛 Troubleshooting

### Issue: "No pretrained model found"
**Solution:** Run `python train_model.py` first

### Issue: "Module not found"
**Solution:** Install dependencies: `pip install -r requirements.txt`

### Issue: API returns empty results
**Solution:** Check if query matches dataset content. Try broader terms.

### Issue: Slow performance
**Solution:** 
- Reduce `max_features` in TF-IDF
- Implement caching
- Use smaller dataset for testing

---

## 📈 Integration with E-Commerce Platform

### Backend Integration (Node.js/Express)
```javascript
const axios = require('axios');

async function getRecommendations(query) {
  const response = await axios.post('http://localhost:5000/recommend', {
    query: query,
    top_k: 5
  });
  return response.data;
}
```

### Frontend Integration (React)
```javascript
const fetchRecommendations = async (searchQuery) => {
  const response = await fetch('http://localhost:5000/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: searchQuery, top_k: 5 })
  });
  return await response.json();
};
```

---

## 📝 Best Practices

1. **Always train before deployment**
2. **Use environment variables for configuration**
3. **Implement rate limiting in production**
4. **Add authentication for API endpoints**
5. **Monitor API performance metrics**
6. **Version your models (model_v1.pkl, model_v2.pkl)**
7. **Implement A/B testing for model improvements**

---

## 📞 Support & Maintenance

### Logs
- Flask logs: Console output
- Add logging module for production

### Monitoring
- Track API response times
- Monitor recommendation quality
- Log user queries for analysis

### Updates
- Retrain model monthly with new reviews
- Update dependencies quarterly
- Monitor for security vulnerabilities

---

## 🎓 Learning Resources

### TF-IDF & Information Retrieval
- [Scikit-learn TF-IDF Documentation](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)

### Semantic Search
- [Sentence-Transformers](https://www.sbert.net/)
- [BERT for Search](https://huggingface.co/blog/bert-101)

### Recommendation Systems
- [Collaborative Filtering](https://developers.google.com/machine-learning/recommendation)
- [Deep Learning for RecSys](https://arxiv.org/abs/1707.07435)

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Author:** AI/ML Engineering Team
