document.addEventListener('DOMContentLoaded', function() {
    const stockForm = document.getElementById('stockForm');
    const alertForm = document.getElementById('alertForm');
    const stockInfo = document.getElementById('stockInfo');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const stockSymbolElement = document.getElementById('stockSymbol');
    const currentPriceElement = document.getElementById('currentPrice');
    const priceChangeElement = document.getElementById('priceChange');
    const rsiValueElement = document.getElementById('rsiValue');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        stockInfo.style.display = 'none';
    }

    function hideError() {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }

    stockForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const symbol = document.getElementById('symbol').value.trim().toUpperCase();
        
        if (!symbol) {
            showError('Please enter a stock symbol');
            return;
        }

        // Reset display
        hideError();
        loadingIndicator.style.display = 'block';
        stockInfo.style.display = 'none';

        try {
            const formData = new FormData();
            formData.append('symbol', symbol);

            const response = await fetch('/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log("API response:", data); // Debug print

            if (data.error) {
                showError(data.error);
                return;
            }

            // Update stock information
            stockSymbolElement.textContent = `${data.symbol} Stock Analysis`;
            currentPriceElement.textContent = `$${data.current_price.toFixed(2)}`;
            
            const changePercent = data.change_percent;
            const changeColor = changePercent >= 0 ? 'text-success' : 'text-danger';
            const changeSymbol = changePercent >= 0 ? '▲' : '▼';
            priceChangeElement.className = `display-6 ${changeColor}`;
            priceChangeElement.textContent = `${changeSymbol} ${Math.abs(changePercent).toFixed(2)}%`;

            const rsi = data.rsi;
            let rsiClass = 'text-primary';
            if (rsi > 70) rsiClass = 'text-danger';
            else if (rsi < 30) rsiClass = 'text-success';
            rsiValueElement.className = `card-text ${rsiClass}`;
            rsiValueElement.textContent = rsi.toFixed(2);

            // Plot candlestick chart
            const chartData = JSON.parse(data.chart);
            Plotly.newPlot('candlestickChart', chartData.data, {
                ...chartData.layout,
                template: 'plotly_white',
                height: 500,
                margin: { t: 20, b: 40, l: 40, r: 20 }
            });

            // Force show stock info and hide error
            hideError();
            stockInfo.style.display = 'block';
        } catch (error) {
            showError('Error analyzing stock data. Please try again.');
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });

    alertForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = {
            symbol: document.getElementById('alertSymbol').value.toUpperCase(),
            target_price: document.getElementById('targetPrice').value,
            email: document.getElementById('email').value
        };

        try {
            const response = await fetch('/set_alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            alert(data.message);
            alertForm.reset();
        } catch (error) {
            alert('Error setting price alert. Please try again.');
            console.error('Error:', error);
        }
    });
}); 