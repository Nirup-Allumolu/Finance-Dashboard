from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from categorize import categorize_csv
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_csv():
    print("Upload endpoint called")
    print(f"Request files: {request.files}")
    print(f"Request headers: {dict(request.headers)}")
    
    if 'file' not in request.files:
        print("No file part in request")
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    print(f"File received: {file.filename}")
    
    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        print(f"Saving uploaded file to: {filepath}")
        file.save(filepath)
        
        try:
            print("Starting categorization...")
            categorized_data = categorize_csv(filepath)
            print(f"Categorization successful, returned {len(categorized_data)} records")
            return jsonify({'data': categorized_data}), 200
        except Exception as e:
            print(f"Error during categorization: {e}")
            import traceback
            traceback.print_exc()
            return jsonify({'error': str(e)}), 500
    
    print("Unknown error occurred")
    return jsonify({'error': 'Unknown error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
