# Finance Dashboard

A comprehensive personal finance tracking application with CSV upload functionality, expense categorization, and interactive visualizations.

## Features

- **CSV Upload & Processing**: Upload bank transaction CSV files for automatic categorization
- **Expense Categorization**: Automatic categorization of transactions using rule-based system
- **Interactive Charts**: 
  - Pie chart showing expense breakdown by category
  - Line chart displaying spending trends over time
- **Real-time Analytics**: Track available balance, net worth, and total spendings
- **Notification System**: Add and manage personal finance notifications
- **Responsive Design**: Modern, dark-themed UI with responsive layout

## Project Structure

```
Finance-Dashboard/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── categorize.py       # CSV categorization logic
│   ├── requirements.txt    # Python dependencies
│   └── uploads/           # Uploaded CSV files
├── frontend/               # React application
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # React entry point
│   ├── package.json       # Node.js dependencies
│   └── public/            # Static assets
├── uploads/               # Sample CSV files
└── README.md             # This file
```

## Technology Stack

### Backend
- **Flask**: Python web framework
- **Pandas**: Data processing and CSV handling
- **Flask-CORS**: Cross-origin resource sharing

### Frontend
- **React**: JavaScript library for building user interfaces
- **Chart.js**: Charting library for data visualization
- **React-Chartjs-2**: React wrapper for Chart.js
- **Axios**: HTTP client for API calls

## Setup Instructions

### Prerequisites
- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **macOS/Linux**: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will be available at `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## CSV Format Requirements

Your CSV file should have the following columns:
- **Date**: Transaction date (YYYY-MM-DD format)
- **Description**: Transaction description
- **Amount**: Transaction amount (positive for expenses)

Example:
```csv
Date,Description,Amount
2024-05-01,Starbucks,5.25
2024-05-02,Uber,12.00
2024-05-03,Walmart,45.10
```

## Expense Categories

The application automatically categorizes transactions based on keywords:

- **Groceries**: walmart, grocery, supermarket, aldi, costco
- **Dining**: restaurant, cafe, starbucks, mcdonald, burger, pizza
- **Transport**: uber, lyft, taxi, bus, train, metro
- **Utilities**: electric, water, utility, internet, comcast, verizon
- **Entertainment**: netflix, spotify, movie, cinema, theater
- **Shopping**: amazon, target, mall, store, shop
- **Other**: Default category for unmatched transactions

## Usage

1. Start both backend and frontend servers
2. Open the application in your browser
3. Upload a CSV file with your transaction data
4. View categorized transactions and interactive charts
5. Add personal notifications and track your financial metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Nirup Allumolu**
- GitHub: [@Nirup-Allumolu](https://github.com/Nirup-Allumolu)
- Project: [Finance Dashboard](https://github.com/Nirup-Allumolu/Finance-Dashboard) 