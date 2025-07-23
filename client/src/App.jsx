import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddItems from "./pages/AddItems";
import AddInventory from "./pages/AddInventory";
import POS from "./pages/POS";

function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addItems" element={<AddItems />} />

            <Route path="/addInventory" element={<AddInventory />} />
            <Route path="/POS" element={<POS />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
