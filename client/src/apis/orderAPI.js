import { apiRequest } from ".";

export const getOrderAPI = (setItems) => {
  apiRequest({
    endpoint: "getOrder",
    onSuccess: ({ data }) => {
      setItems(data);
    },
  });
};

export const addOrderAPI = (data,setOrderItems) => {
  data.map((item) => {
    apiRequest({
      data: {
        items: item._id,
        quantity: item.quantity,
      },
      method: "post",
      endpoint: "addOrder",
      onSuccess: () => {
        setOrderItems([])
      },
    });
  });
};
