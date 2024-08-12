import StorageManager from "@utils/common/storage";
import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const accessToken = StorageManager.getItem("accessToken");
    if (accessToken) {
      config.headers!["Authorization"] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = StorageManager.getItem("refreshToken");

      try {
        const response = await axios.post(
          "http://localhost:8080/member/refresh-token",
          {
            refreshToken,
          }
        );

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        StorageManager.setItem("accessToken", newAccessToken);
        StorageManager.setItem("refreshToken", newRefreshToken);

        originalRequest.headers["Authorization"] = `${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        StorageManager.clearAllUnsticky();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
