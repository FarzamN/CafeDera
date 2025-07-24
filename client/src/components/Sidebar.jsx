import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Box,
  BookLock,
  ShoppingCart,
  BadgeDollarSign,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Add Item", icon: ShoppingCart, path: "/addItems" },
    { name: "Add Order", icon: BadgeDollarSign, path: "/addOrder" },
    { name: "Add Invetory", icon: Box, path: "/addInventory" },
    { name: "POS", icon: BookLock, path: "/POS" },
  ];

  return (
    <div className="h-screen w-60 bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 mb-10">CafeDera</div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;

          return (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <IconComponent
                size={20}
                color={isActive ? "#FFFFFF" : "#2C7FFF"}
              />
              <span className={`${isActive ? "text-white" : "text-blue-600"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
