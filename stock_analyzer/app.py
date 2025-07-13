from flask import Flask, render_template, request, jsonify
import yfinance as yf

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_stock():
    symbol = request.form.get('symbol', '').strip().upper()
    print(f"Received symbol: {symbol}")

    if not symbol:
        return jsonify({'error': 'Please enter a stock symbol.'})

    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1mo")
        print(f"Fetched data:\n{data.tail()}")

        closes = [float(x) for x in data['Close'] if x > 0]
        if len(closes) < 2:
            print("Not enough valid data!")
            return jsonify({'error': 'No valid data found for this symbol. Please check the symbol and try again.'})

        current_price = closes[-1]
        prev_price = closes[-2]
        change_percent = ((current_price - prev_price) / prev_price) * 100

        return jsonify({
            'symbol': symbol,
            'current_price': current_price,
            'change_percent': change_percent,
            'success': True
        })

    except Exception as e:
        print(f"Error analyzing {symbol}: {e}")
        return jsonify({'error': 'Error analyzing stock data. Please try again.'})

if __name__ == '__main__':
    app.run(debug=True, port=5050) 
