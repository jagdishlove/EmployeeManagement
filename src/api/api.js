import axios from "axios";
import { persistor, store } from "../redux/store/store";
import { loaderStart, loaderStop } from "../redux/actions/loader/loaderAction";

const baseURL = process.env.REACT_APP_API_BASE_URL;
console.log("baseURL", baseURL);

const mainApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

mainApi.interceptors.request.use(
  (config) => {
    store.dispatch(loaderStart());
    return config;
  },
  (error) => {
    store.dispatch(loaderStop());
    return Promise.reject(error);
  },
);

mainApi.interceptors.response.use(
  async (response) => {
    store.dispatch(loaderStop());
    return response;
  },
  async (error) => {
    store.dispatch(loaderStop());
    if (error.response?.status === 403 || error.code === "ERR_NETWORK") {
      localStorage.removeItem("selectedItem");
      persistor.purge(["login"]);
      window.location.href = "/";
      localStorage.setItem("refreshLogout", true);
    }
    return Promise.reject(error);
  },
);

const makeRequest = async (method, url, data, queryParams) => {
  const token = store.getState().persistData?.loginDetails?.data.jwtAccessToken;
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await mainApi.request({
    method,
    url: queryParams ? `${url}?${new URLSearchParams(queryParams)}` : url,
    data,
    headers,
  });

  return response.data;
};

export const addRequest = async (method, url, data, queryParams) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token =
      store.getState().persistData?.loginDetails?.data.jwtAccessToken;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await mainApi.request({
      method,
      url: queryParams ? `${url}?${new URLSearchParams(queryParams)}` : url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export default makeRequest;

export const downloadApi = async (method, url, data, queryParams) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token =
      store.getState().persistData?.loginDetails?.data.jwtAccessToken;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await mainApi.request({
      method,
      url: queryParams ? `${url}?${new URLSearchParams(queryParams)}` : url,
      data,
      headers,
      responseType: "blob",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
