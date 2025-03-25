import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
);

function ChartDisplay({ data }) {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartData, setChartData] = useState(null);
  const [availableFields, setAvailableFields] = useState([]);
  
  const barColor = 'rgba(55, 162, 235, 0.6)';

  useEffect(() => {
    if (data && data.length > 0) {
      const fields = Object.keys(data[0]);
      setAvailableFields(fields);
      
      if (!xAxis && fields.length > 0) setXAxis(fields[0]);
      if (!yAxis && fields.length > 1) {
        const numericField = fields.find(field => typeof data[0][field] === 'number');
        setYAxis(numericField || fields[1]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data && xAxis && yAxis) {
      prepareChartData();
    }
  }, [data, xAxis, yAxis]);

  const prepareChartData = () => {
    const labels = data.map(item => item[xAxis]);
    
    const dataPoints = data.map(item => {
      const value = item[yAxis];
      return typeof value === 'number' ? value : parseFloat(value) || 0;
    });

    const chartDataConfig = {
      labels,
      datasets: [
        {
          label: `${yAxis} by ${xAxis}`,
          data: dataPoints,
          backgroundColor: barColor,
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartDataConfig);
  };

  const renderBarChart = () => {
    if (!chartData) return <p className="text-gray-500">Select axes to visualize</p>;

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${yAxis} by ${xAxis} (Bar Chart)`,
        },
      },
    };

    return <Bar data={chartData} options={options} />;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">X-Axis:</label>
          <select 
            value={xAxis} 
            onChange={(e) => setXAxis(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md min-w-[150px]"
          >
            {availableFields.map(field => (
              <option key={`x-${field}`} value={field}>{field}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Y-Axis:</label>
          <select 
            value={yAxis} 
            onChange={(e) => setYAxis(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md min-w-[150px]"
          >
            {availableFields.map(field => (
              <option key={`y-${field}`} value={field}>{field}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="relative flex-1 h-96 min-h-[400px] mb-8">
        {renderBarChart()}
      </div>
    </div>
  );
}

export default ChartDisplay;