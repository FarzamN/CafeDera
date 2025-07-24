import React from "react";

function Empty() {
  return (
    <div className=" mt-10">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" // Replace with your own image if needed
        alt="No items"
        style={{ width: "120px", height: "120px" }}
      />
      <p className="text-gray-500 mt-4 text-lg font-medium">No item found</p>
    </div>
  );
}

export default Empty;
