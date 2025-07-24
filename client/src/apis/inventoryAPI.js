import { apiRequest } from ".";

export const addInventoryAPI = (
  data,
  setItemPrice,
  setItemName,
  setItems,
  setItemQuantity
) => {
  apiRequest({
    data,
    method: "post",
    endpoint: "addInventory",
    onSuccess: () => {
      setItemPrice("");
      setItemName("");
      setItemQuantity("");
      getInventoryAPI(setItems);
    },
  });
};

export const getInventoryAPI = (setItems) => {
  apiRequest({
    endpoint: "getInventory",
    onSuccess: ({ data }) => {
      setItems(data);
    },
  });
};

export const editInventoryAPI = (data, setItems) => {
  apiRequest({
    data,
    method: "post",
    endpoint: `editInventory/${data.id}`,
    onSuccess: () => {
      getInventoryAPI(setItems);
    },
  });
};
export const deleteInventoryAPI = (id, setItems) => {
  apiRequest({
    method: "post",
    endpoint: `deleteInventory/${id}`,
    onSuccess: () => {
      getInventoryAPI(setItems);
    },
  });
};
