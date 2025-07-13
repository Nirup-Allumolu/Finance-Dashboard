import pandas as pd

def categorize_csv(filepath):
    df = pd.read_csv(filepath)
    # Check for required columns
    required_columns = {'Date', 'Description', 'Amount'}
    missing = required_columns - set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {', '.join(missing)}")
    # Simple rule-based categorization
    rules = {
        'Groceries': ['walmart', 'grocery', 'supermarket', 'aldi', 'costco'],
        'Dining': ['restaurant', 'cafe', 'starbucks', 'mcdonald', 'burger', 'pizza'],
        'Transport': ['uber', 'lyft', 'taxi', 'bus', 'train', 'metro'],
        'Utilities': ['electric', 'water', 'utility', 'internet', 'comcast', 'verizon'],
        'Entertainment': ['netflix', 'spotify', 'movie', 'cinema', 'theater'],
        'Shopping': ['amazon', 'target', 'mall', 'store', 'shop'],
        'Other': []
    }
    def categorize(desc):
        desc = str(desc).lower()
        for category, keywords in rules.items():
            for kw in keywords:
                if kw in desc:
                    return category
        return 'Other'
    df['Category'] = df['Description'].apply(categorize)
    # Return as list of dicts
    return df.to_dict(orient='records')