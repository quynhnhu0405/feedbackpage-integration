const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

window.wifiService = {
  submitCustomerInfo: (data) => api.post("/feedback", data),
};