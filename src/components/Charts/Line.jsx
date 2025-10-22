import React, { useContext, useMemo } from "react";
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
import { ShopContext } from "../shopContext";

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
  const { allUser } = useContext(ShopContext);
  const weeklyTotals = useMemo(() => {
    const totals = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    allUser?.forEach((user) => {
      user?.betHistory?.forEach((bet) => {
        if (bet?.gameDate) {
          const date = new Date(bet.gameDate);
          const day = date.toLocaleDateString("en-US", { weekday: "short" });
          if (totals[day] !== undefined) {
            totals[day] += bet.tipPrice || 0; // sum total money bet
          }
        }
      });
    });

    return Object.values(totals); // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  }, [allUser]);
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Orders",
        data: weeklyTotals,
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
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}`, // format with Naira symbol
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawOnChartArea: true,
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [4, 4],
        },
        ticks: { color: "#333" },
      },
      y: {
        display: true,
        ticks: {
          color: "#333",
          callback: (value) => `$${value}`,
        },
        grid: { display: true },
      },
    },
  };
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: { display: false },
  //     tooltip: {
  //       callbacks: {
  //         label: (context) => `₦${context.parsed.y}`, // format with Naira symbol
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         display: true,
  //         drawTicks: true,
  //         drawOnChartArea: true,
  //         color: "rgba(0, 0, 0, 0.1)", // Default light mode grid color
  //         borderDash: [4, 4],
  //       },
  //       ticks: {
  //         color: "#333", // Default light mode ticks color
  //       },
  //     },
  //     y: {
  //       display: false,
  //       grid: {
  //         display: true,
  //       },
  //     },
  //   },
  // };

  return (
    <div className="w-[100%] sm:h-[200px] h-[150px] relative rounded-[10px] mt-[10px] dark:bg-gray-800 dark:text-white">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
