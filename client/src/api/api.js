import axios from "axios";
import { persistor, store } from "../redux/store/store";

const baseURL =
  window.location.host === "167.71.233.53" ||
  process.env.REACT_APP_ENV === "development"
    ? "http://167.71.233.53:8080/projectx"
    : window.location.origin + "/projectx";

const mainApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


const addApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

mainApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log("error", error);
    if (error.response?.status === 403 || error.code === "ERR_NETWORK") {
      localStorage.removeItem("selectedItem");
      persistor.purge(["login"]);
      window.location.href = "/";
      localStorage.setItem("refreshLogout", true);
    }

    return Promise.reject(error);
  }
);

const makeRequest = async (method, url, data, queryParams) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = store.getState().persistData.data.jwtAccessToken;
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

export const addRequest = async (method, url, data, queryParams) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = store.getState().persistData.data.jwtAccessToken;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await addApi.request({
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
    const token = store.getState().persistData.data.jwtAccessToken;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await mainApi.request({
      method,
      url: queryParams ? `${url}?${new URLSearchParams(queryParams)}` : url,
      data,
      headers,
      responseType:'blob'
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

