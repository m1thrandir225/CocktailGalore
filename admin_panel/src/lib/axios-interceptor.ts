import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://galore-cocktails-more-production.up.railway.app/",
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("_auth");
    if (token !== null) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        const authState = JSON.parse(
          localStorage.getItem("_auth_state") || "{}",
        );
        const user = authState.user;

        if (refreshToken !== null && user.id !== null) {
          try {
            const response = await axiosInstance.post("/refresh_token", {
              refreshToken: refreshToken,
              id: user.id,
            });
            localStorage.setItem("_auth", response.data.accessToken);
            return axiosInstance(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
