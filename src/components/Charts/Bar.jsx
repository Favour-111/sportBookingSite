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
        borderColor: "rgba(75, 192, 192, 1)", // Light mode border color
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // ❌ hides legend completely
      },
      tooltip: {
        enabled: true, // keeps hover tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // removes grid lines
        },
        ticks: {
          color: "#333", // Light mode tick color
        },
      },
      y: {
        display: false, // completely hides y-axis line, ticks, and labels
        grid: {
          display: false, // removes horizontal grid lines
        },
      },
    },
  };

  return (
    <div className="w-full sm:h-[200px] relative rounded-[10px] mt-[10px] dark:bg-gray-800 dark:text-white">
      <Bar
        data={data}
        options={{
          ...options,
          scales: {
            x: {
              ...options.scales.x,
              ticks: {
                ...options.scales.x.ticks,
                color: "#fff", // Dark mode tick color
              },
            },
            y: options.scales.y,
          },
        }}
      />
    </div>
  );
};

export default BarChart;
