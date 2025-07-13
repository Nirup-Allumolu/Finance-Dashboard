# Stock Market Data Analyzer

A web application that provides real-time stock market analysis with technical indicators, interactive charts, and price alerts.

## Features

- Real-time stock data fetching using Yahoo Finance API
- Technical indicators calculation (Moving Averages, RSI)
- Interactive candlestick charts with Plotly
- Price alert system with email notifications
- Historical data storage using SQLite
- Automated daily analysis using APScheduler

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd stock_analyzer
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root with the following content:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```
Note: For Gmail, you'll need to use an App-Specific Password. You can generate one in your Google Account settings under Security > 2-Step Verification > App passwords.

5. Initialize the database:
```bash
python app.py
```

## Usage

1. Start the application:
```bash
python app.py
```

2. Open your browser and navigate to `http://localhost:5000`

3. Enter a stock symbol (e.g., AAPL, GOOGL) to analyze

4. Set up price alerts by entering:
   - Stock symbol
   - Target price
   - Your email address

## Technical Indicators

- **Moving Average (MA)**: 20-day moving average to identify trends
- **Relative Strength Index (RSI)**: 14-day RSI to identify overbought/oversold conditions
  - RSI > 70: Potentially overbought
  - RSI < 30: Potentially oversold

## Dependencies

- Flask: Web framework
- yfinance: Yahoo Finance API wrapper
- pandas: Data manipulation and analysis
- plotly: Interactive charts
- SQLAlchemy: Database ORM
- APScheduler: Task scheduling
- Flask-Mail: Email notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 