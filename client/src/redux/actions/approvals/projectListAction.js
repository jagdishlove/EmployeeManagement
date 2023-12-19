import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
} from "./projectListsActionType";

const projectListRequest = () => {
  return {
    type: PROJECT_LIST_REQUEST,
  };
};

const projectListSuccess = (response) => {
  return {
    type: PROJECT_LIST_SUCCESS,
    payload: response,
  };
};

const projectListFail = () => {
  return {
    type: PROJECT_LIST_FAIL,
  };
};

export const projectListAction = () => {
  return async (dispatch) => {
    try {
      dispatch(projectListRequest());
      const response = await makeRequest("GET", "api/approver/getProjectsList");
      dispatch(projectListSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      // indicating that the login credentials are invalid
      dispatch(projectListFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
