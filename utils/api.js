//const API_URL = "https://45.251.115.161:8080/api";
const API_URL = "http://localhost:8080/api";

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
        access_token: "jaX1VDjjX3QqJK5uq6s3Cxf9GtdVTy5xv5vUDSeNuppLOKufoGdmEE5KLHNG9fGhjKOJFDmZWcdqNIPynWVbO-XuP5oC3w1xfse2KxC-fXsfSJ0fhXUm9fLY0H269RC3hs4ZJPSKXnYiQGeaXJoy19zY4nAg1eewe4mlTCyqxtlgKqrAnJhpODjYNqlV0PrqxsG6OjaVXqdkDajevX3yLUv8Vnda8CabxNvDPDifxNBHLsWukdNk19OK8X6_IOHHrIW4JRXoitQ413vhYsQDI-40BtkFIEbCk0qlUvPnaNhp1G0nboEP8OLv6XMHMjuYhovC4xfl_2gkIZ4TiGkZ7wihBXAGRQyuWnOoSOzfh7k36ZqkgJYS58SUF2wnNheycHigBlLzj0FgG3OKvnZwMVLEN63a4k5VNH3rUDzsXJq",
        refresh_token: "5OmvUqOsf4ONYJb_JJQZGncDEtv2BAGrJU1AKsmBY2X0nNr2S32F0dZkQKf10AOBQzngLM4SbnyqrdX2EnQoBoAgRM8uJgm_2RKqGoi8uIq9mZrc72-cE1l2I74g3iWC3iWAHmWTq0ivgp5C6qVB6o63FdC6DS0MAF0yN0udzcCgmZOB7GNhR3lvSXDg5BPGVSD1D7WBfNz2u4K9Ooo7N6tMNG8xRu1TDz8L2m4ItcOqoIaE4n7BKnltDHyXIk5T4lSkDm0_t588tpKJN0N_K7h68MTU7jqy3zexSYa2vp0hsYvfV3pw2aM45KPeMCz-CvO603XQmpivWpH72dpK60sMBIShUx9m8R5zHtPVw0n6bNr4SogdU2cHU3edIU1t1hSB2p1Gwqq2yZDo5nVgK2R851XZZwqFGYsbJG",
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