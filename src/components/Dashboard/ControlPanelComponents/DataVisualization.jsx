//import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Example chart library
import './DataVisualization.css';

const sampleData = [
  { time: '10:00', temperature: 25, phLevel: 7.2 },
  { time: '11:00', temperature: 28, phLevel: 7.1 },
  { time: '12:00', temperature: 26, phLevel: 7.0 },
  { time: '13:00', temperature: 29, phLevel: 7.3 },
  { time: '14:00', temperature: 31, phLevel: 7.2 },
];

const DataVisualization = () => {
  return (
    <section className="data-visualization-section">
      <div className="chart-container">
        <h2>Water Quality Over Time</h2>
        <LineChart width={800} height={400} data={sampleData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
          <Line type="monotone" dataKey="phLevel" stroke="#82ca9d" name="pH Level" />
        </LineChart>
      </div>
      <div className="chart-controls">
        {/* Add controls like date range pickers, data filters, etc. */}
      </div>
    </section>
  );
};

export default DataVisualization;