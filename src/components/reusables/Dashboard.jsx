// Dashboard.jsx
import { useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { AlertTriangle, Download, Settings, Info, Droplets } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data - replace with real data in production
  const waterUsageData = [
    { date: '2024-01', laundry: 400, shower: 300, sink: 200 },
    { date: '2024-02', laundry: 300, shower: 350, sink: 250 },
    { date: '2024-03', laundry: 450, shower: 280, sink: 220 },
    { date: '2024-04', laundry: 380, shower: 320, sink: 240 },
  ];

  const sourceDistribution = [
    { name: 'Laundry', value: 45, color: '#3B82F6' },
    { name: 'Shower', value: 35, color: '#10B981' },
    { name: 'Sink', value: 20, color: '#F59E0B' },
  ];

  const qualityMetrics = {
    pH: 7.2,
    turbidity: 2.5,
    conductivity: 750,
  };

  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Grey Water Management Dashboard</h1>
        <div className="header-actions">
          <button className="action-button">
            <Settings size={20} />
            Settings
          </button>
          <button className="action-button">
            <Download size={20} />
            Export Data
          </button>
        </div>
      </div>

      {/* Alert Section */}
      {showAlert && (
        <div className="alert-section">
          <AlertTriangle size={20} />
          <p>Water quality parameters approaching threshold limits in Sector A</p>
          <button onClick={() => setShowAlert(false)}>×</button>
        </div>
      )}

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Water Usage Card */}
        <div className="dashboard-card">
          <h2>Real-Time Water Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={waterUsageData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="laundry" stroke="#3B82F6" />
              <Line type="monotone" dataKey="shower" stroke="#10B981" />
              <Line type="monotone" dataKey="sink" stroke="#F59E0B" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Source Distribution Card */}
        <div className="dashboard-card">
          <h2>Source Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {sourceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Metrics Card */}
        <div className="dashboard-card">
          <h2>Water Quality Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-item">
              <Droplets size={24} />
              <div className="metric-details">
                <span className="metric-label">pH Level</span>
                <span className="metric-value">{qualityMetrics.pH}</span>
              </div>
            </div>
            <div className="metric-item">
              <Droplets size={24} />
              <div className="metric-details">
                <span className="metric-label">Turbidity (NTU)</span>
                <span className="metric-value">{qualityMetrics.turbidity}</span>
              </div>
            </div>
            <div className="metric-item">
              <Droplets size={24} />
              <div className="metric-details">
                <span className="metric-label">Conductivity (µS/cm)</span>
                <span className="metric-value">{qualityMetrics.conductivity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Card */}
        <div className="dashboard-card">
          <h2>Educational Resources</h2>
          <div className="resources-list">
            <a href="#" className="resource-link">
              <Info size={20} />
              Best Practices for Grey Water Management
            </a>
            <a href="#" className="resource-link">
              <Info size={20} />
              Water Quality Guidelines
            </a>
            <a href="#" className="resource-link">
              <Info size={20} />
              Sustainability Tips
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;