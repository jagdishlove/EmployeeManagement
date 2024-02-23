import { toast } from "react-toastify";
import makeRequest, { addRequest } from "../../../../api/api";
import {
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_ALL_CITYS,
  SEARCH_EMPLOYEEANDPROJECT_FAILURE,
  SEARCH_EMPLOYEEANDPROJECT_REQUEST,
  SEARCH_EMPLOYEEANDPROJECT_SUCCESS,
} from "./usersActionTypes";
import { getRefreshToken } from "../../login/loginAction";

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

const createUserRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};
const createUserSuccess = (data) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: data,
  };
};
export const createUserFail = (error) => {
  return {
    type: CREATE_USER_FAIL,
    payload: error,
  };
};

const getAllCitys = (data) => {
  return {
    type: GET_ALL_CITYS,
    payload: data,
  };
};
const searchEmployeeAndProjectRequest = () => {
  return {
    type: SEARCH_EMPLOYEEANDPROJECT_REQUEST,
  };
};

const searchEmployeeAndProjectSuccess = (data) => {
  return {
    type: SEARCH_EMPLOYEEANDPROJECT_SUCCESS,
    payload: data,
  };
};

const searchEmployeeAndProjectFail = () => {
  return {
    type: SEARCH_EMPLOYEEANDPROJECT_FAILURE,
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
      const response = await makeRequest("GET", `/employee/${data}`);
      dispatch(getUserByIdSuccess(response));
    } catch (err) {
      dispatch(getUserByIdFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateUserForm = (data) => {
  return async (dispatch) => {
    let formData = new FormData();
    formData.append("file", data.file);

    for (const key in data) {
      if (key !== "file") {
        formData.append(key, data[key]);
      }
    }

    try {
      dispatch(createUserRequest());
      const response = await addRequest("POST", "/employee/create", formData);
      dispatch(createUserSuccess(response));
      return response;
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 403
      ) {
        dispatch(getRefreshToken());
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 500
      ) {
        dispatch(createUserFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const GetAllCitys = (data) => {
  return async (dispatch) => {
    try {
      const response = await makeRequest(
        "GET",
        "/api/masterData/getAll",
        null,
        data
      );
      dispatch(getAllCitys(response));
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const SearchEmployeeAndProject = (data) => {
  return async (dispatch) => {
    dispatch(searchEmployeeAndProjectRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/employee/searchByemployeeAndProjectName",
        null,
        data
      );
      dispatch(searchEmployeeAndProjectSuccess(response));
    } catch (err) {
      dispatch(searchEmployeeAndProjectFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
