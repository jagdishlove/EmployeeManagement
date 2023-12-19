import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  TEAM_MEMBER_LIST_FAIL,
  TEAM_MEMBER_LIST_REQUEST,
  TEAM_MEMBER_LIST_SUCCESS,
} from "./teamMemberActionType";

const teamMemberListRequest = () => {
  return {
    type: TEAM_MEMBER_LIST_REQUEST,
  };
};

const teamMemberListSuccess = (response) => {
  return {
    type: TEAM_MEMBER_LIST_SUCCESS,
    payload: response,
  };
};

const teamMemberListFail = () => {
  return {
    type: TEAM_MEMBER_LIST_FAIL,
  };
};

export const teamMemberListAction = (params) => {
  return async (dispatch) => {
    try {
      dispatch(teamMemberListRequest());
      const response = await makeRequest(
        "GET",
        "/api/approver/getTeamMembers",
        null,
        params
      );
      dispatch(teamMemberListSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      // indicating that the login credentials are invalid
      dispatch(teamMemberListFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
