import makeRequest from "../../../api/api";
import { decodeToken } from "../../../utils/tokenDecoder";
import { errorMessage } from "../errors/errorsAction";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_ACCESS_TOKEN,
} from "./loginActionTypes";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const updateAccessToken = (newAccessToken) => ({
  type: UPDATE_ACCESS_TOKEN,
  payload: newAccessToken,
});

export const login = (data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await makeRequest("POST", "/auth/authenticate", data);
      const decoder = decodeToken(response.jwtAccessToken);
      const auth = {
        jwtAccessToken: response.jwtAccessToken,
        role: decoder.role,
        userName: response.userName,
      };
      dispatch(loginSuccess(auth));
      navigate("/");
    } catch (err) {
      dispatch(loginFail(err?.response?.data.errorMessage));
      dispatch(errorMessage(err?.response?.data.errorMessage));
    }
  };
};

export const getRefreshToken = () => {
  return async (dispatch) => {
    try {
      //  code was commented out
    } catch (err) {
      dispatch(loginFail(err.response.data.errorMessage));
      dispatch(errorMessage("Unknown Error"));
    }
  };
};
