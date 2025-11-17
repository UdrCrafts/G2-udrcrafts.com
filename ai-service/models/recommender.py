class Recommender:
    def __init__(self):
        # sample product data (dummy for now)
        self.sample_products = {
            "laptop": ["mouse", "keyboard", "cooling pad"],
            "shirt": ["jeans", "hoodie", "cap"],
            "shoes": ["socks", "shoe cleaner", "bag"],
            "phone": ["phone case", "screen protector", "earbuds"],
        }

    def recommend(self, product_name):
        if not product_name:
            return ["No product name provided"]

        key = product_name.lower()

        if key in self.sample_products:
            return self.sample_products[key]

        return ["No similar products found"]