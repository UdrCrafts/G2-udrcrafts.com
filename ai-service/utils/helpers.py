import pickle
from pathlib import Path

def save_model(obj, filename):
    model_dir = Path(__file__).resolve().parent.parent / "models"
    filepath = model_dir / filename
    with open(filepath, 'wb') as f:
        pickle.dump(obj, f)
    print(f"✓ Model saved: {filepath}")

def load_model(filename):
    model_dir = Path(__file__).resolve().parent.parent / "models"
    filepath = model_dir / filename
    with open(filepath, 'rb') as f:
        return pickle.load(f)
