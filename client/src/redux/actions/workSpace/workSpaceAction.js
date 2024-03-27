import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import {
  GET_ALL_PROJECTLIST_REQUEST,
  GET_ALL_PROJECTLIST_SUCCESS,
  GET_ALL_PROJECTLIST_FAIL,
} from "./workSpaceActioType";

const getAllProjectListRequest = () => {
  return {
    type: GET_ALL_PROJECTLIST_REQUEST,
  };
};

const getAllProjectListSuccess = (data) => {
  return {
    type: GET_ALL_PROJECTLIST_SUCCESS,
    payload: data,
  };
};

const getAllProjectListFail = () => {
  return {
    type: GET_ALL_PROJECTLIST_FAIL,
  };
};

export const getAllProjectListAction = () => {
  return async (dispatch) => {
    dispatch(getAllProjectListRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/projectProgress/getProjectsDropDownList",
        null,
        null
      );
      dispatch(getAllProjectListSuccess(response));
    } catch (err) {
      dispatch(getAllProjectListFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
