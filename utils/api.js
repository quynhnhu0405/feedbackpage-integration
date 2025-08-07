const API_URL = "https://45.251.115.161:8080/api";
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

window.zaloService = {
  sendMessage: async (message) => {
    try {
      // Send message through your backend API instead of directly to Zalo
      const response = await api.post("/zalo/send-message", {
        user_id: "8777666660453431134",
        message: message,
        expires_in: "90000"
      });
      
      console.log('Zalo message sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending Zalo message:', error);
      throw error;
    }
  }
};