import { useState, useEffect } from 'react';
import card from './ui/cards.jsx'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AlertTriangle, Cloud, Tool, Card } from 'lucide-react';

const AIDashboard = () => {
  const [aiInsights, setAiInsights] = useState({
    anomalies: [],
    maintenancePredictions: {},
    weatherPatterns: {},
    sensorAnalysis: {}
  });

  useEffect(() => {
    // Fetch AI insights
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/ai-insights');
        const data = await response.json();
        setAiInsights(data);
      } catch (error) {
        console.error('Error fetching AI insights:', error);
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Anomaly Detection */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Anomaly Detection</h3>
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
        </div>
        <div className="space-y-2">
          {aiInsights.anomalies.map((anomaly, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
              <span className="font-medium">{anomaly.type}:</span>
              <span>{anomaly.description}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Maintenance Predictions */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Maintenance Forecast</h3>
          <Tool className="h-6 w-6 text-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Next Maintenance</p>
            <p className="text-xl font-bold">5 Days</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">System Health</p>
            <p className="text-xl font-bold text-green-500">92%</p>
          </div>
        </div>
      </Card>

      {/* Weather Pattern Analysis */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weather Patterns</h3>
          <Cloud className="h-6 w-6 text-blue-500" />
        </div>
        <LineChart width={600} height={300} data={aiInsights.weatherPatterns.data || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pattern" stroke="#3b82f6" />
        </LineChart>
      </Card>
    </div>
  );
};

export default AIDashboard;