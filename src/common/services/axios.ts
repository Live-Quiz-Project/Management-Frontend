import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "",
});

const privateHttp = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { http, privateHttp };
