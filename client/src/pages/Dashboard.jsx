import { Box, BookLock, ShoppingCart, BadgeDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { getItemAPI } from "../apis/itemAPI";
import { getInventoryAPI } from "../apis/inventoryAPI";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getOrderAPI } from "../apis/orderAPI";

// Register components required for Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [order, setOrder] = useState([]);

// 🔢 Counts
  const orderCount = order.length;
  const itemCount = items.length;
  const inventoryCount = inventory.length;

  // 💰 Full Sales Calculation
  const fullSales = order.reduce((total, item) => {
    return total + (item?.items?.price || 0) * (item?.quantity || 0);
  }, 0);


  const itemChartData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: "Item Prices",
        data: items.map((item) => item.price),
        backgroundColor: [
          "#3b82f6", // blue
          "#10b981", // green
          "#f59e0b", // yellow
          "#ef4444", // red
          "#8b5cf6", // purple
          "#ec4899", // pink
          "#14b8a6", // teal
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
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
        backgroundColor: [
          "#10b981", // green
          "#f59e0b", // yellow
          "#3b82f6", // blue
          "#ef4444", // red
          "#8b5cf6", // purple
          "#ec4899", // pink
          "#14b8a6", // teal
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Shared options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Item Price Distribution",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Inventory Price Distribution",
      },
    },
  };

  useEffect(() => {
    getItemAPI(setItems);
    getInventoryAPI(setInventory);
    getOrderAPI(setOrder);
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Metrics Grid */}

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          value={orderCount}
          bg="bg-green-100"
          title="Orders Count"
          icon={<ShoppingCart className="text-green-500 text-3xl" />}
        />
        <DashboardCard
          value={itemCount}
          bg="bg-blue-100"
          title="Items Count"
          icon={<Box className="text-blue-500 text-3xl" />}
        />
        <DashboardCard
          value={inventoryCount}
          bg="bg-yellow-100"
          title="Inventory Count"
          icon={<BadgeDollarSign className="text-yellow-500 text-3xl" />}
        />
        <DashboardCard
          value={`$${fullSales}`}
          bg="bg-pink-100"
          title="Full Sales Number"
          icon={<BookLock className="text-pink-500 text-3xl" />}
        />
      </div>


      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Items</h2>
      <div className="w-full max-w-3xl h-96">
        <Doughnut data={itemChartData} options={chartOptions} />
      </div>

      <h2 className="text-xl font-semibold mt-12 mb-4 text-gray-800">
        Your Inventory
      </h2>
      <div className="w-full max-w-3xl h-96">
        <Pie data={inventoryChartData} options={pieOptions} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, bg }) {
  return (
    <div className={`rounded-xl shadow-md p-5 flex items-center ${bg}`}>
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-sm text-gray-700 font-semibold">{title}</h3>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
