import axios from "axios";

const url = "http://localhost:5000/";

const instance = axios.create({
  baseURL: `${url}api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async ({
  method = "get",
  endpoint,
  data = {},
  onSuccess,
  onFailure,
  onFinally,
}) => {
  try {
    onFinally?.(true);

    const response =
      method === "get"
        ? await instance.get(endpoint)
        : await instance.post(endpoint, data);
    const { status, message } = response.data;
    if (status === "success") {
      onSuccess?.(response.data);
    } else {
      showNotification("error", message, `Status Code ${status + endpoint}`);
      onFailure?.(response.data);
      console.log("error", message, `Status Code ${status + endpoint}`);
    }
  } catch (err) {
    const msg = err?.response?.data?.message || err.message;
    onFailure?.(err);
    console.log("error", msg, `Status Code ${endpoint}`);
  } finally {
    onFinally?.(false);
  }
};
