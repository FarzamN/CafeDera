import { apiRequest } from ".";



export const getItemWithDateAPI = (data, setItem) => {
  apiRequest({
    data,
    method: "post",
    endpoint: "getItemWithDate",
    onSuccess: ({data}) => {
      setItem(data);
    },
  });
};

export const getInventoryWithDateAPI = (data, setInventory) => {
  apiRequest({
    data,
    method: "post",
    endpoint: "getInventoryWithDate",
    onSuccess: ({data}) => {
      setInventory(data);
    },
  });
};