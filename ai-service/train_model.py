#!/usr/bin/env python3
"""
Training script for the recommendation model.
Run this to train and save the model before starting the API.
"""

from models.recommender import Recommender

if __name__ == "__main__":
    print("=" * 60)
    print("TRAINING RECOMMENDATION MODEL")
    print("=" * 60)
    
    recommender = Recommender(load_pretrained=False)
    
    print("\n" + "=" * 60)
    print("TRAINING COMPLETE")
    print("=" * 60)
    print("\nModel artifacts saved:")
    print("  - models/dataframe.pkl")
    print("  - models/preprocessor.pkl")
    print("  - models/tfidf_matrix.pkl")
    print("\nYou can now start the API with: python main.py")
