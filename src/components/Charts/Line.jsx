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
        data: [1200, 1900, 1500, 2200, 3000, 2500, 3100],
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
    maintainAspectRatio: false, // 👈 Important: makes it fill the container height
    plugins: {
      legend: {
        display: false, // ❌ hides legend completely
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawTicks: false,
          drawOnChartArea: true,
          color: "rgba(0, 0, 0, 0.1)", // Default light mode grid color
          borderDash: [4, 4],
        },
        ticks: {
          color: "#333", // Default light mode ticks color
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-[100%] sm:h-[200px] h-[150px] relative rounded-[10px] mt-[10px] dark:bg-gray-800 dark:text-white">
      <Line
        data={data}
        options={{
          ...options,
          scales: {
            x: {
              ...options.scales.x,
              grid: {
                ...options.scales.x.grid,
                color: "rgba(255, 255, 255, 0.2)", // Dark mode grid color
              },
              ticks: {
                ...options.scales.x.ticks,
                color: "#fff", // Dark mode ticks color
              },
            },
            y: options.scales.y,
          },
        }}
      />
    </div>
  );
};

export default LineChart;
