import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Orders",
        data: [1200, 1900, 1500, 2200, 3000, 2500, 3100],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light mode background color
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  const options3 = {
    responsive: true,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#aaa", font: { size: 12 } },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  return (
    <div className="w-full sm:h-[200px] relative rounded-[10px] mt-[10px] dark:bg-gray-800 dark:text-white">
      <Bar data={data} options={options3} />
    </div>
  );
};

export default BarChart;
