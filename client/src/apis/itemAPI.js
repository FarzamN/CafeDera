import { apiRequest } from ".";

export const addItemAPI = (data, setItemPrice, setItemName, setItems) => {
  apiRequest({
    data,
    method: "post",
    endpoint: "addItems",
    onSuccess: () => {
      setItemPrice("");
      setItemName("");
      getItemAPI(setItems);
    },
  });
};
export const editItemAPI = (data, setItems) => {
  apiRequest({
    data,
    method: "post",
    endpoint: `editItem/${data.id}`,
    onSuccess: () => {
      getItemAPI(setItems);
    },
  });
};
export const deleteItemAPI = (id, setItems) => {
  apiRequest({
    method: "post",
    endpoint: `deleteItem/${id}`,
    onSuccess: () => {
      getItemAPI(setItems);
    },
  });
};

export const getItemAPI = (setItems) => {
  apiRequest({
    endpoint: "getItems",
    onSuccess: ({ data }) => {
      setItems(data);
    },
  });
};
