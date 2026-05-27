import axios from "axios";

const normalizeBaseUrl = (url) => url.replace(/\/$/, "");

const resolveBaseUrl = () => {
  const runtimeUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const buildUrl = process.env.BACKEND_URL;
  const herokuFallback = "https://internhub-backend-2026-08dbdbd13eb6.herokuapp.com";
  const localFallback = "http://localhost:5000";

  const envUrl = runtimeUrl || buildUrl;
  if (envUrl) {
    return normalizeBaseUrl(envUrl);
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return localFallback;
  }

  return herokuFallback;
};

const axiosInstance = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      const token = JSON.parse(user).token;
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return req;
});
export default axiosInstance;
