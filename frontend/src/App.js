import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import './App.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeMonth, setActiveMonth] = useState(new Date().toLocaleString('default', { month: 'short' }));
  const [availableBalance, setAvailableBalance] = useState("");
  const [netWorth, setNetWorth] = useState("");
  const [notifications, setNotifications] = useState([
    // Example: '3 Bills are past Due, Pay soon to avoid late fees.'
  ]);
  const [notifInput, setNotifInput] = useState("");

  const addNotification = (e) => {
    e.preventDefault();
    if (notifInput.trim()) {
      setNotifications([...notifications, notifInput.trim()]);
      setNotifInput("");
    }
  };

  const removeNotification = (idx) => {
    setNotifications(notifications.filter((_, i) => i !== idx));
  };

  // Auto-update active month at the start of a new month
  useEffect(() => {
    const interval = setInterval(() => {
      const currentMonth = new Date().toLocaleString('default', { month: 'short' });
      setActiveMonth((prev) => (prev !== currentMonth ? currentMonth : prev));
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults([]);
    setError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(res.data.data);
    } catch (err) {
      let msg = 'Upload failed. Please check your backend and CSV format.';
      if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const lineChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#e2e4e9',
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#e2e4e9' },
        grid: { color: 'rgba(226, 228, 233, 0.1)' },
      },
      y: {
        ticks: { color: '#e2e4e9' },
        grid: { color: 'rgba(226, 228, 233, 0.1)' },
      },
    },
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#e2e4e9',
          font: { size: 14 },
        },
      },
    },
  };

  // Pie Chart Data: Expense breakdown by category
  const getPieData = () => {
    const categoryTotals = {};
    results.forEach((row) => {
      const cat = row.Category || 'Other';
      const amt = parseFloat(row.Amount) || 0;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
    });
    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#f85a8f', '#fbc02d', '#43a047', '#1976d2', '#8e24aa', '#00bcd4', '#757575',
          ],
        },
      ],
    };
  };

  // Line Chart Data: Spending trends over time
  const getLineData = () => {
    // Group by date, sum amounts
    const dateTotals = {};
    results.forEach((row) => {
      const date = row.Date;
      const amt = parseFloat(row.Amount) || 0;
      dateTotals[date] = (dateTotals[date] || 0) + amt;
    });
    const sortedDates = Object.keys(dateTotals).sort();
    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Total Spending',
          data: sortedDates.map((d) => dateTotals[d]),
          fill: false,
          borderColor: '#f85a8f',
          backgroundColor: '#f85a8f',
          tension: 0.2,
        },
      ],
    };
  };

  // Card values (mocked for now, can be calculated from results)
  const spendings = results.reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0);

  return (
    <div className="App">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-months">
          {months.map((m) => (
            <span key={m} className={m === activeMonth ? 'active' : ''}>{m}</span>
          ))}
        </div>
        <div style={{flex: 1}}></div>
        <div style={{fontSize: '2rem', color: '#fff', opacity: 0.2}}>🏠</div>
      </aside>
      {/* Main Dashboard */}
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Personal Finance Tracker</h1>
          <div className="user-info">
            <div>
              <div style={{fontWeight: 600}}>Nirup Allumolu</div>
              <div style={{fontSize: '0.95rem', color: '#b0b8d1'}}>Personal Finance Analytics</div>
            </div>
            <div className="user-avatar">NA</div>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="cards-grid">
          <div className="card">
            <div className="card-title">Available Balance</div>
            <input
              type="number"
              className="card-value-input accent3"
              value={availableBalance}
              onChange={e => setAvailableBalance(e.target.value)}
              min="0"
              placeholder="Enter Number"
            />
          </div>
          <div className="card">
            <div className="card-title">Total Net Worth</div>
            <input
              type="number"
              className="card-value-input accent1"
              value={netWorth}
              onChange={e => setNetWorth(e.target.value)}
              min="0"
              placeholder="Enter Number"
            />
          </div>
          <div className="card">
            <div className="card-title">Spendings</div>
            <div className="card-value accent4">${spendings.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
          </div>
          <div className="card upload-card">
            <div className="card-title">Upload CSV</div>
            <form onSubmit={handleUpload} style={{display: 'flex', flexDirection: 'column', gap: '0.7rem'}}>
              <input type="file" accept=".csv" onChange={handleFileChange} />
              <button type="submit" disabled={loading || !file}>
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
          <div className="card">
            <div className="card-title">Notification</div>
            <form onSubmit={addNotification} className="notification-form">
              <input
                type="text"
                value={notifInput}
                onChange={e => setNotifInput(e.target.value)}
                placeholder="Add a notification..."
              />
              <button type="submit">Add</button>
            </form>
            <ul style={{listStyle: 'disc', paddingLeft: '1.2rem', margin: 0}}>
              {notifications.map((notif, idx) => (
                <li key={idx} style={{marginBottom: '0.5rem', color: 'var(--accent2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>{notif}</span>
                  <button onClick={() => removeNotification(idx)} style={{marginLeft: '0.7rem', background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer'}} title="Remove">&times;</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Charts and Table */}
        <div className="cards-grid">
          <div className="card">
            <div className="card-title">Expense Breakdown by Category</div>
            <div className="card-chart">
              {results.length > 0 ? <Pie data={getPieData()} options={pieChartOptions} /> : <div className="chart-placeholder">Upload a CSV to see chart.</div>}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Spending Trend Over Time</div>
            <div className="card-chart">
              {results.length > 0 ? <Line data={getLineData()} options={lineChartOptions} /> : <div className="chart-placeholder">Upload a CSV to see chart.</div>}
            </div>
          </div>
          <div className="card" style={{gridColumn: 'span 2'}}>
            <div className="card-title">Categorized Transactions</div>
            {results.length === 0 ? (
              <div className="chart-placeholder">No data to display yet.</div>
            ) : (
              <table className="card-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr key={idx}>
                      <td>{String(row.Date)}</td>
                      <td>{String(row.Description)}</td>
                      <td>{String(row.Amount)}</td>
                      <td>{String(row.Category)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
