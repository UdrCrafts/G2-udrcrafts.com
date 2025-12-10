import pandas as pd
from pathlib import Path

class DataLoader:
    def __init__(self, csv_path=None):
        if csv_path is None:
            csv_path = Path(__file__).resolve().parent.parent / "data" / "reviews.csv"
        self.csv_path = csv_path
    
    def load_data(self):
        df = pd.read_csv(self.csv_path)
        df = df[['name', 'reviews.title', 'reviews.text', 'reviews.rating']].copy()
        df.fillna("", inplace=True)
        df['combined_text'] = df['name'] + " " + df['reviews.title'] + " " + df['reviews.text']
        return df
