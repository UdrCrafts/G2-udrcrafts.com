# AI Recommendation Service

🤖 Production-grade recommendation engine for e-commerce using TF-IDF and cosine similarity.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Train the model
python train_model.py

# Start API server
python main.py

# Test (in another terminal)
python test_api.py
```

## API Usage

```bash
curl -X POST http://localhost:5000/recommend \
  -H "Content-Type: application/json" \
  -d '{"query": "iphone", "top_k": 5}'
```

## Documentation

See [DOCUMENTATION.md](DOCUMENTATION.md) for complete architecture, training process, and future improvements.

## Architecture

- **Data Layer**: CSV loader with preprocessing
- **Model Layer**: TF-IDF vectorizer + cosine similarity
- **Service Layer**: Singleton pattern for model management
- **API Layer**: Flask REST endpoints

## Features

✅ Fast inference (<100ms)  
✅ Model persistence (pickle)  
✅ Similarity scoring  
✅ Rating integration  
✅ Production-ready structure  

## Future Upgrades

- BERT/Sentence-Transformers for semantic search
- Collaborative filtering
- Hybrid ranking models
- Redis caching layer
