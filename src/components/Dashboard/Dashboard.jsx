import { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Modal from 'react-modal';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, AreaChart, Area, CartesianGrid } from 'recharts';
import { AlertTriangle, Bell, AlertCircle, ThermometerSun, Droplets, Eye, Timer, Settings, Download } from 'lucide-react';
import './Dashboard.css';

Modal.setAppElement('#root');

const Dashboard = () => {
  const dashboardRef = useRef();
  const [showSettings, setShowSettings] = useState(false);
  const [showWaterUsage, setShowWaterUsage] = useState(true);
  const [showQualityMetrics, setShowQualityMetrics] = useState(true);
  const [showSourceDistribution, setShowSourceDistribution] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  const exportToPDF = async () => {
    const element = dashboardRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 190;
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('dashboard.pdf');
  };

  // State for sensor readings and alerts
  const [sensorData, setSensorData] = useState({
    pH: 7.2,
    turbidity: 2.5,
    temperature: 23.5,
    dissolvedOxygen: 6.8
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'pH levels approaching upper threshold in Zone A',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'critical',
      message: 'Scheduled maintenance due in 2 days',
      timestamp: new Date().toISOString()
    }
  ]);

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

  // Historical data for trends
  const historicalData = [
    { time: '00:00', pH: 7.0, turbidity: 2.2, dissolvedOxygen: 6.5, temperature: 22 },
    { time: '04:00', pH: 7.1, turbidity: 2.3, dissolvedOxygen: 6.7, temperature: 22.5 },
    { time: '08:00', pH: 7.2, turbidity: 2.4, dissolvedOxygen: 6.8, temperature: 23 },
    { time: '12:00', pH: 7.3, turbidity: 2.6, dissolvedOxygen: 6.6, temperature: 23.5 },
    { time: '16:00', pH: 7.2, turbidity: 2.5, dissolvedOxygen: 6.9, temperature: 23.3 },
    { time: '20:00', pH: 7.1, turbidity: 2.4, dissolvedOxygen: 7.0, temperature: 23 }
  ];

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleModalClose = () => {
    setShowSettings(false);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        pH: +(prev.pH + (Math.random() - 0.5) * 0.1).toFixed(2),
        turbidity: +(prev.turbidity + (Math.random() - 0.5) * 0.2).toFixed(2),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.3).toFixed(2),
        dissolvedOxygen: +(prev.dissolvedOxygen + (Math.random() - 0.5) * 0.2).toFixed(2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Check thresholds and create alerts
  useEffect(() => {
    if (sensorData.pH > 7.5) {
      setAlerts(prev => [{
        id: Date.now(),
        type: 'critical',
        message: 'High pH level detected!',
        timestamp: new Date().toISOString()
      }, ...prev]);
    }
  }, [sensorData]);

  useEffect(() => {
    const currentTimeInterval = setInterval(() => {
      const date = new Date();
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

      setCurrentTime(`${date.getDate()} ${day} ${month} ${year} - ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`);
    }, 1000);

    return () => clearInterval(currentTimeInterval);
  }, []);

  return (
    <div className="dashboard" ref={dashboardRef}>
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Grey Water Management Dashboard</h1>
        <div className="header-actions">
          <span>{currentTime}</span>
          <button className="action-button" onClick={exportToPDF}>
            <Download size={20} />
            Export the Data
          </button>
          <button onClick={handleSettingsClick}>
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onRequestClose={handleModalClose}
        contentLabel="Settings Modal"
        className="modal"
        overlayClassName="overlay"
        style={{
          overlay: {
            position: 'absolute',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            width: '400px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <h2>Settings</h2>
        <div className="settings-option">
          <label>
            <input
              type="checkbox"
              checked={showWaterUsage}
              onChange={() => setShowWaterUsage(!showWaterUsage)}
            />
            Show Water Usage
          </label>
        </div>
        <div className="settings-option">
          <label>
            <input
              type="checkbox"
              checked={showQualityMetrics}
              onChange={() => setShowQualityMetrics(!showQualityMetrics)}
            />
            Show Water Quality Metrics
          </label>
        </div>
        <div className="settings-option">
          <label>
            <input
              type="checkbox"
              checked={showSourceDistribution}
              onChange={() => setShowSourceDistribution(!showSourceDistribution)}
            />
            Show Source Distribution
          </label>
        </div>
        <button onClick={handleModalClose}>Close</button>
      </Modal>

      {/* Real-Time Monitoring Section */}
      <div className="monitoring-grid">
        {showWaterUsage && (
          <div className="sensor-card">
            <div className="sensor-header">
              <Droplets size={24} />
              <h3>pH Level</h3>
            </div>
            <div className="sensor-value">
              <span className={`value ${sensorData.pH > 7.5 ? 'warning' : ''}`}>
                {sensorData.pH}
              </span>
              <span className="unit">pH</span>
            </div>
            <div className="threshold-indicator">
              Threshold: 7.5 pH
            </div>
          </div>
        )}

        {showQualityMetrics && (
          <div className="sensor-card">
            <div className="sensor-header">
              <Eye size={24} />
              <h3>Turbidity</h3>
            </div>
            <div className="sensor-value">
              <span className="value">{sensorData.turbidity}</span>
              <span className="unit">NTU</span>
            </div>
            <div className="threshold-indicator">
              Threshold: 5.0 NTU
            </div>
          </div>
        )}

        {showQualityMetrics && (
          <div className="sensor-card">
            <div className="sensor-header">
              <ThermometerSun size={24} />
              <h3>Temperature</h3>
            </div>
            <div className="sensor-value">
              <span className="value">{sensorData.temperature}</span>
              <span className="unit">°C</span>
            </div>
            <div className="threshold-indicator">
              Threshold: 30°C
            </div>
          </div>
        )}

        {showQualityMetrics && (
          <div className="sensor-card">
            <div className="sensor-header">
              <Timer size={24} />
              <h3>Dissolved Oxygen</h3>
            </div>
            <div className="sensor-value">
              <span className="value">{sensorData.dissolvedOxygen}</span>
              <span className="unit">mg/L</span>
            </div>
            <div className="threshold-indicator">
              Threshold: 5.0 mg/L
            </div>
          </div>
        )}
      </div>

      {/* Trends and Analytics Section */}
      <div className="dashboard-grid">
        <div className="dashboard-card full-width">
          <h2>Real-Time Parameter Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="pH" stroke="#3B82F6" fill="#93C5FD" />
              <Area type="monotone" dataKey="turbidity" stroke="#10B981" fill="#6EE7B7" />
              <Area type="monotone" dataKey="dissolvedOxygen" stroke="#F59E0B" fill="#FCD34D" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {showWaterUsage && (
          <div className="dashboard-card">
            <h2>Water Usage Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waterUsageData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="laundry" stroke="#3B82F6" />
                <Line type="monotone" dataKey="shower" stroke="#10B981" />
                <Line type="monotone" dataKey="sink" stroke="# F59E0B" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {showSourceDistribution && (
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
        )}

        {/* Alerts and Notifications Panel */}
        <div className="dashboard-card">
          <div className="alerts-header">
            <h2>Active Alerts</h2>
            <Bell size={20} />
          </div>
          <div className="alerts-container">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.type}`}>
                {alert.type === 'critical' ? 
                  <AlertCircle size={20} /> : 
                  <AlertTriangle size={20} />
                }
                <div className="alert-content">
                  <p>{alert.message}</p>
                  <span className="alert-timestamp">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="dashboard-card">
          <h2>Maintenance Schedule</h2>
          <div className="maintenance-list">
            <div className="maintenance-item">
              <Timer size={20} />
              <div className="maintenance-details">
                <p>Filter Replacement</p>
                <span>Due in 2 days</span>
              </div>
            </div>
            <div className="maintenance-item">
              <Timer size={20} />
              <div className="maintenance-details">
                <p>Sensor Calibration</p>
                <span>Due in 5 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;