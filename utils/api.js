const API_URL = "http://45.251.115.161:8080/api";
//const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

window.feedbackService = {
  submitCustomerInfo: (data) => api.post("/feedback", data),
};