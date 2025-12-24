#!/usr/bin/env python3
"""
Test script for the recommendation API.
"""

import requests
import json

API_URL = "http://localhost:5000"

def test_health():
    print("\n" + "=" * 60)
    print("Testing Health Endpoint")
    print("=" * 60)
    response = requests.get(f"{API_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_recommend(query, top_k=5):
    print("\n" + "=" * 60)
    print(f"Testing Recommendation: '{query}'")
    print("=" * 60)
    response = requests.post(
        f"{API_URL}/recommend",
        json={"query": query, "top_k": top_k}
    )
    print(f"Status: {response.status_code}")
    result = response.json()
    
    if "results" in result:
        print(f"\nFound {result['count']} recommendations:\n")
        for i, item in enumerate(result['results'], 1):
            print(f"{i}. {item['name']}")
            print(f"   Rating: {item['rating']}")
            print(f"   Similarity: {item['similarity_score']}")
            print(f"   Review: {item['review_text'][:100]}...")
            print()
    else:
        print(f"Response: {json.dumps(result, indent=2)}")

if __name__ == "__main__":
    test_health()
    test_recommend("kindle paperwhite")
    test_recommend("iphone")
    test_recommend("laptop")
