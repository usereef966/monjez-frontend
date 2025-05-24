// src/api.js
import axios from "axios";

// 1. نحدد الـ base URL للـ API
axios.defaults.baseURL = "https://monjez-online.onrender.com";

// 2. interceptor عشان يضيف الهيدر قبل كل طلب
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("Token not found");
    }
    return config;
  },
  error => Promise.reject(error)
);

// 3. نصدر النسخة المعدّلة من axios
export default axios;
