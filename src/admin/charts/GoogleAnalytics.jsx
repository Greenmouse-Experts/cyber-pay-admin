import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

const Analytics = ({ data }) => {
  Chart.register(...registerables);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (data) {
      // Extracting data for chart
      const cities = data.getVisitors.rows.map(row => row.dimensionValues[0].value);
      const activeUsers = data.getVisitors.rows.map(row => parseInt(row.metricValues[0].value, 10));
      const bounceRates = data.getBounceRate.rows.map(row => parseFloat(row.metricValues[0].value));
      const pagePaths = data.getUserBehavior.rows.map(row => row.dimensionValues[0].value);
      const engagedSessions = data.getUserBehavior.rows.map(row => parseInt(row.metricValues[0].value, 10));
      const avgSessionDuration = data.getUserBehavior.rows.map(row => parseFloat(row.metricValues[1].value));

      setChartData({
        labels: cities, 
        datasets: [
          {
            label: 'Active Users',
            data: activeUsers,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
          {
            label: 'Bounce Rate',
            data: bounceRates,
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
            tension: 0.1,
          },
          {
            label: 'Engaged Sessions',
            data: engagedSessions,
            fill: false,
            borderColor: 'rgba(255,159,64,1)',
            tension: 0.1,
          },
          {
            label: 'Average Session Duration',
            data: avgSessionDuration,
            fill: false,
            borderColor: 'rgba(54,162,235,1)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [data]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      {data && <Line data={chartData} options={options} />}
    </>
  );
};

export default Analytics;
