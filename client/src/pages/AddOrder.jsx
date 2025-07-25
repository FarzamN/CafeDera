import { useEffect, useRef, useState } from "react";
import { getItemAPI } from "../apis/itemAPI";
import EditModal from "../components/editModal";
import DeleteModal from "../components/deleteModal";
import { addOrderAPI } from "../apis/orderAPI";
import { useReactToPrint } from "react-to-print";

const AddOrder = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);

  const [editModal, setEditModal] = useState({ open: false, item: null });

  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });

  useEffect(() => {
    getItemAPI(setItemOptions);
  }, []);

  const handleAddItem = () => {
    if (!selectedItem || !quantity || quantity <= 0) return;

    const itemData = itemOptions.find((item) => item._id === selectedItem);

    const newItem = {
      _id: itemData._id,
      name: itemData.name,
      price: itemData.price,
      quantity: parseInt(quantity),
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedItem("");
    setQuantity("");
  };

  const handleEditSave = () => {
    const updatedItems = orderItems.map((item) =>
      item._id === editModal.targetId ? editModal.item : item
    );
    setOrderItems(updatedItems);
    setEditModal({ open: false, item: null, targetId: null });
  };

  const handleDelete = () => {
    const updatedItems = orderItems.filter(
      (item) => item._id !== deleteModal.item._id
    );
    setOrderItems(updatedItems);
    setDeleteModal({ open: false, item: null });
  };

    const contentRef = useRef(null);
const handlePrint = useReactToPrint({ contentRef });


// const handlePrint = useReactToPrint({
//   content: () => printRef.current,
//   documentTitle: 'Order Summary',
// });


  const handlePlaceOrder = () => {
    addOrderAPI(orderItems,setOrderItems);
  };

  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Order</h1>

      {/* Input Row */}
      <div className="flex items-center gap-4 mb-6">
        {/* Dropdown */}
        <select
          className="border border-gray-300 px-3 py-2 rounded"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">Select item</option>
          {itemOptions.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Quantity Input */}
        <input
          type="number"
          min="1"
          className="border px-3 py-2 rounded"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {/* Add Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>

      {/* Order Table */}
      {orderItems.length > 0 && (
        <div ref={contentRef}>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 px-4 py-2">Item</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rs. {item.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rs. {item.price * item.quantity}
                  </td>
                  <td className="border-r border-b border-gray-300 px-4 py-2 space-x-2 flex">
                    <button
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                      onClick={() =>
                        setEditModal({
                          open: true,
                          item: {
                            _id: item._id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                          },
                          targetId: item._id,
                        })
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => setDeleteModal({ open: true, item })}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-row justify-between">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Place Order
            </button>
            <button
        onClick={handlePrint}
        className="bg-gray-700 text-white px-6 py-2 rounded"
      >
        Print Order
      </button>
            <div className="text-lg font-semibold mb-4">
              Total: Rs. {totalPrice}
            </div>
          </div>
       </div>
      )}

      {/* Edit Modal */}
      <EditModal
        isOpen={editModal.open}
        title="Edit Item"
        fields={[
          {
            name: "_id",
            placeholder: "Select Item",
            options: itemOptions.map((item) => ({
              label: item.name,
              value: item._id,
            })),
          },
          {
            name: "quantity",
            placeholder: "Quantity",
            type: "number",
          },
        ]}
        values={editModal.item}
        onChange={(updatedItem) => {
          const selected = itemOptions.find((i) => i._id === updatedItem._id);
          setEditModal((prev) => ({
            ...prev,
            item: {
              ...prev.item,
              ...updatedItem,
              name: selected?.name || "",
              price: selected?.price || 0,
            },
          }));
        }}
        onClose={() =>
          setEditModal({ open: false, item: null, targetId: null })
        }
        onSave={handleEditSave}
      />

      <DeleteModal
        isOpen={deleteModal.open}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"?`}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AddOrder;
