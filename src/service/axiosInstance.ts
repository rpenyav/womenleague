import axios from "axios";
import Cookies from "js-cookie";

/**
 * The base URL for the API, loaded from environment variables.
 */
const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * Custom Axios instance configured with a base URL and parameters serialization.
 */
export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  /**
   * Custom parameter serializer function.
   * @param params - The object containing the parameters to be serialized.
   * @returns The serialized parameters as a string.
   */
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();

    for (const key of Object.keys(params)) {
      const param = params[key];

      if (Array.isArray(param)) {
        for (const value of param) {
          searchParams.append(key, value);
        }
      } else {
        searchParams.set(key, param);
      }
    }

    return searchParams.toString();
  },
});

/**
 * Interceptor to add the authentication token before each request.
 * If the token is present in cookies, it is added to the Authorization header.
 */
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Interceptor to handle the response and store the new access token if present.
 * If the response contains an access token, it is stored in cookies.
 */
axiosInstance.interceptors.response.use((response) => {
  if (response.data.access_token) {
    Cookies.set("access_token", response.data.access_token);
  }
  return response;
});
