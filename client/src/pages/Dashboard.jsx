import { BarChart2, Bell, PieChart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <DashboardCard
          title="Total Pickups Completed"
          value="1,284"
          icon={<BarChart2 className="text-green-500 text-3xl" />}
          bg="bg-green-100"
        />
        <DashboardCard
          title="Active Pickups"
          value="74"
          icon={<Bell className="text-blue-500 text-3xl" />}
          bg="bg-blue-100"
        />
        <DashboardCard
          title="Pending Payments"
          value="$2,190"
          icon={<PieChart className="text-yellow-500 text-3xl" />}
          bg="bg-yellow-100"
        />
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
