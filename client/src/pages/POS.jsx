import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getInventoryWithDateAPI, getItemWithDateAPI } from "../apis/posAPI";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const POS = () => {
  const [date, setDate] = useState({ start: "", end: "" });
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  const handleGetReport = () => {
    if (!date.start || !date.end) {
      alert("Please select both start and end dates.");
      return;
    }

    if (date.start > today) {
      alert("Start date cannot be in the future.");
      return;
    }

    if (date.start > date.end) {
      alert("Start date cannot be after end date.");
      return;
    }

    // You can fetch data and update chart here
     getItemWithDateAPI(date,setItems);
    getInventoryWithDateAPI(date,setInventory);
  };

  const itemChartData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        data: items.map((item) => item.price),
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Tailwind blue-500
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Inventory chart data
  const inventoryChartData = {
    labels: inventory.map((inv) => inv.name),
    datasets: [
      {
        label: "Inventory Prices",
        data: inventory.map((inv) => inv.price),
        backgroundColor: "rgba(16, 185, 129, 0.5)", 
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Shared options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    getItemWithDateAPI(date,setItems);
    getInventoryWithDateAPI(date,setInventory);
  }, []);

  return (
    <div style={{ width: "100vw" }} className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">POS</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            max={today}
            value={date.start}
            onChange={(e) =>
              setDate((prev) => ({ ...prev, start: e.target.value }))
            }
            className="border rounded px-3 py-2 text-gray-800"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={date.end}
            min={date.start}
            onChange={(e) =>
              setDate((prev) => ({ ...prev, end: e.target.value }))
            }
            className="border rounded px-3 py-2 text-gray-800"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleGetReport}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded mt-2 sm:mt-6 sm:ml-4"
        >
          Get Report
        </button>
      </div>

      {/* Items Chart */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Items</h2>
      <div className="w-full max-w-3xl h-80">
        <Bar data={itemChartData} options={chartOptions} />
      </div>

      {/* Inventory Chart */}
      <h2 className="text-xl font-semibold mt-12 mb-4 text-gray-800">Your Inventory</h2>
      <div className="w-full max-w-3xl h-80">
        <Bar data={inventoryChartData} options={chartOptions} />
      </div>

    </div>
  );
};

export default POS;
