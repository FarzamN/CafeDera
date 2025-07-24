import React, { useState } from "react";

const POS = () => {
  const [date, setDate] = useState({ start: "", end: "" });

  return (
    <div style={{ width: "100vw" }} className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">POS</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={date.start}
            onChange={(e) =>
              setDate((pre) => ({ ...pre, start: e.target.value }))
            }
            className="border rounded px-3 py-2 text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={date.end}
            onChange={(e) =>
              setDate((pre) => ({ ...pre, end: e.target.value }))
            }
            className="border rounded px-3 py-2 text-gray-800"
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded mt-2 sm:mt-6 sm:ml-4"
          onClick={() => {
            // API call will be added here
            console.log("Fetch report between:", date.start, "to", date.end);
          }}
        >
          Get Report
        </button>
      </div>
    </div>
  );
};

export default POS;
