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
      const months = data.map(item => item.month);
      const pageViews = data.map(item => item.pageViews);
      const sessions = data.map(item => item.sessions);
      const users = data.map(item => item.users);

      setChartData({
        labels: months,
        datasets: [
          {
            label: 'Page Views',
            data: pageViews,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
          {
            label: 'Sessions',
            data: sessions,
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
            tension: 0.1,
          },
          {
            label: 'Users',
            data: users,
            fill: false,
            borderColor: 'rgba(255,159,64,1)',
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
