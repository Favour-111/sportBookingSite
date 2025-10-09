import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

    datasets: [
      {
        label: "Daily Orders",
        data: [1200, 1900, 1500, 2200, 3000, 2500, 3100], // Totals on Y-axis
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#333" },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawTicks: false,
          drawOnChartArea: true,
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [4, 4], // dotted vertical lines
        },
      },
      y: {
        display: false, // Hides y-axis line, ticks, labels
        grid: {
          display: false, // Hides grid lines
        },
      },
    },
  };

  return (
    <div>
      <div style={{ width: "100%", height: "120px", position: "relative" }}>
        <Line data={data} options={options} style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default LineChart;
