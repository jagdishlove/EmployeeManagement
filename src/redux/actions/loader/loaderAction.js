import { toast } from "react-toastify";
import makeRequest, { addRequest } from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import { LOADER_START, LOADER_STOP } from "./loaderActionType";

const loaderStartType = () => {
  return {
    type: LOADER_START,
  };
};

const loaderStopType = () => {
  return {
    type: LOADER_STOP,
  };
};

export const loaderStart = () => {
  return (dispatch) => {
    dispatch(loaderStartType());
  };
};

export const loaderStop = () => {
  return (dispatch) => {
    dispatch(loaderStopType());
  };
};
