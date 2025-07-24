import { useEffect, useState } from "react";
import {
  addItemAPI,
  deleteItemAPI,
  editItemAPI,
  getItemAPI,
} from "../apis/itemAPI";
import EditModal from "../components/editModal";
import DeleteModal from "../components/deleteModal";

const AddItems = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [items, setItems] = useState([]);

  const [editModal, setEditModal] = useState({ open: false, item: null });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    item: null,
  });

  const handleUpdateItem = () => {
    if (
      !editModal.item.name ||
      !editModal.item.price ||
      parseFloat(editModal.item.price) <= 0
    )
      return;
    const data = {
      name: editModal.item.name,
      price: editModal.item.price,
      id: editModal.item._id,
    };
    editItemAPI(data, setItems);
    setEditModal({ open: false });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModal || !deleteModal?.item._id) return;

    deleteItemAPI(deleteModal?.item._id, setItems);
    setDeleteModal({ open: false, item: null });
  };

  const handleSave = () => {
    if (!itemName || !itemPrice) return;

    const data = {
      name: itemName,
      price: itemPrice,
    };

    addItemAPI(data, setItemPrice, setItemName, setItems);
  };

  useEffect(() => {
    getItemAPI(setItems);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Items</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          className="border rounded px-3 py-2 mr-4"
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          value={itemPrice}
          placeholder="Item Price"
          className="border rounded px-3 py-2 mr-4"
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Item
        </button>
      </div>

      {items.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Saved Items</h1>

          <table className="w-2/3 border-collapse border border-gray-300 mt-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 w-2/4">Name</th>
                <th className="border border-gray-300 px-4 py-2 w-2/4">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 w-1/4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.price}
                  </td>
                  <td className=" border-b border-gray-300 px-4 py-2 space-x-2 flex">
                    <button
                      onClick={() => setEditModal({ open: true, item })}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal({ open: true, item })}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <EditModal
        isOpen={editModal.open}
        title="Edit Item"
        fields={[
          {
            name: "name",
            placeholder: "Item Name",
          },
          {
            name: "price",
            placeholder: "Item Price",
            type: "number",
          },
        ]}
        values={editModal.item}
        onChange={(item) => setEditModal((pre) => ({ ...pre, item }))}
        onClose={() => setEditModal({ open: false })}
        onSave={handleUpdateItem}
      />
      <DeleteModal
        isOpen={deleteModal.open}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteModal?.item?.name}"?`}
        onClose={() => setDeleteModal({ open: false })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AddItems;
