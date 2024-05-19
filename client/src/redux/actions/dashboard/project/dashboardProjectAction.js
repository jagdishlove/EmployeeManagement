import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";

import {
  DASHBOARD_PROJECT_DETAILS_REQUEST,
  DASHBOARD_PROJECT_DETAILS_SUCCESS,
  DASHBOARD_PROJECT_DETAILS_FAIL,
  DASHBOARD_PROJECT_RESOURCES_REQUEST,
  DASHBOARD_PROJECT_RESOURCES_SUCCESS,
  DASHBOARD_PROJECT_RESOURCES_FAIL,
} from "./dashboardProjectActionType";

const dashboardProjectDetailsRequest = () => {
  return {
    type: DASHBOARD_PROJECT_DETAILS_REQUEST,
  };
};

const dashboardProjectDetailsSuccess = (data) => {
  return {
    type: DASHBOARD_PROJECT_DETAILS_SUCCESS,
    payload: data,
  };
};

const dashboardProjectDetailsFail = () => {
  return {
    type: DASHBOARD_PROJECT_DETAILS_FAIL,
  };
};

const dashboardProjectResourcesRequest = () => {
  return {
    type: DASHBOARD_PROJECT_RESOURCES_REQUEST,
  };
};

const dashboardProjectResourcesSuccess = (data) => {
  return {
    type: DASHBOARD_PROJECT_RESOURCES_SUCCESS,
    payload: data,
  };
};

const dashboardProjectResourcesFail = () => {
  return {
    type: DASHBOARD_PROJECT_RESOURCES_FAIL,
  };
};

export const dashboardProjectDetailsAction = (data) => {
  return async (dispatch) => {
    dispatch(dashboardProjectDetailsRequest());
    try {
      const response = await makeRequest(
        "GET",
        `api/projectProgress/progressDetails/${data}`
      );
      dispatch(dashboardProjectDetailsSuccess(response));
      return response;
    } catch (err) {
      dispatch(dashboardProjectDetailsFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const dashboardProjectResourcesAction = (data, params) => {
  return async (dispatch) => {
    dispatch(dashboardProjectResourcesRequest());
    try {
      const response = await makeRequest(
        "GET",
        `api/projectProgress/projectResources/${data}`,
        null,
        params
      );
      dispatch(dashboardProjectResourcesSuccess(response));
    } catch (err) {
      dispatch(dashboardProjectResourcesFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
