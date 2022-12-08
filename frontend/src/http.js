import axios from axios;

export default axios.create({
  baseURL: "http:",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json" || "multipart/form-data",
    Accept: "application/json",
  },
});