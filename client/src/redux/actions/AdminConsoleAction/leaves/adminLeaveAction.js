import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";
import {
  GET_ALL_LEAVES_FOR_ADMIN_FAILURE,
  GET_ALL_LEAVES_FOR_ADMIN_REQUEST,
  GET_ALL_LEAVES_FOR_ADMIN_SUCCESS,
} from "./adminLeaveActionType";

const getAllLeavesForAdminRequest = () => {
  return {
    type: GET_ALL_LEAVES_FOR_ADMIN_REQUEST,
  };
};
const getAllLeavesForAdminSuccess = (data) => {
  return {
    type: GET_ALL_LEAVES_FOR_ADMIN_SUCCESS,
    payload: data,
  };
};
const getAllLeavesForAdminFailure = () => {
  return {
    type: GET_ALL_LEAVES_FOR_ADMIN_FAILURE,
  };
};

export const getAllLeavesForAdminAction = (payload, getPayload) => {
  return async (dispatch) => {
    dispatch(getAllLeavesForAdminRequest());
    try {
      const response = await makeRequest(
        "POST",
        "api/leave/leaveRequestApprovalsForAdmin",
        {
          result: payload ? [payload] : [],
        },
        getPayload
      );
      dispatch(getAllLeavesForAdminSuccess(response));
    } catch (err) {
      dispatch(getAllLeavesForAdminFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
