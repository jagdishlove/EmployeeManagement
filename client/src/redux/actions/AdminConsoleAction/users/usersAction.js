import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";
import {
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
} from "./usersActionTypes";

const getAllUsersRequest = () => {
  return {
    type: FETCH_ALL_USERS_REQUEST,
  };
};

const getAllUsersSuccess = (data) => {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    payload: data,
  };
};

const getAllUsersFailure = () => {
  return {
    type: FETCH_ALL_USERS_FAILURE,
  };
};

const getUserByIdRequest = () => {
  return {
    type: GET_USER_BY_ID_REQUEST,
  };
};

const getUserByIdSuccess = (data) => {
  return {
    type: GET_USER_BY_ID_SUCCESS,
    payload: data,
  };
};

const getUserByIdFailure = () => {
  return {
    type: GET_USER_BY_ID_FAILURE,
  };
};

export const getAllUsers = (data) => {
  return async (dispatch) => {
    dispatch(getAllUsersRequest());
    try {
      const response = await makeRequest("GET", "/employee/getAll", null, data);
      dispatch(getAllUsersSuccess(response));
    } catch (err) {
      dispatch(getAllUsersFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getUserById = (data) => {
  return async (dispatch) => {
    dispatch(getUserByIdRequest());
    try {
      const response = await makeRequest("GET", `/employee/getById/${data}`);
      dispatch(getUserByIdSuccess(response));
    } catch (err) {
      dispatch(getUserByIdFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
