import { toast } from "react-toastify";
import makeRequest from "../../../../api/api.js";
import {
  FETCH_ALL_PROJECTS_FAILURE,
  FETCH_ALL_PROJECTS_REQUEST,
  FETCH_ALL_PROJECTS_SUCCESS,
  FETCH_EMPLOYEE_SEARCH_FAILURE,
  FETCH_EMPLOYEE_SEARCH_REQUEST,
  FETCH_EMPLOYEE_SEARCH_SUCCESS,
  FETCH_ALL_DOMAIN_REQUEST,
  FETCH_ALL_DOMAIN_SUCCESS,
  FETCH_ALL_DOMAIN_FAILURE,
} from "./projectsActionTypes.js";

const getAllProjectsRequest = () => {
  return {
    type: FETCH_ALL_PROJECTS_REQUEST,
  };
};

const getAllProjectsSuccess = (data) => {
  return {
    type: FETCH_ALL_PROJECTS_SUCCESS,
    payload: data,
  };
};

const getAllProjectsFailure = () => {
  return {
    type: FETCH_ALL_PROJECTS_FAILURE,
  };
};

const getEmployeeSearchRequest = () => {
  return {
    type: FETCH_EMPLOYEE_SEARCH_REQUEST,
  };
};

const getEmployeeSearchSuccess = (data) => {
  return {
    type: FETCH_EMPLOYEE_SEARCH_SUCCESS,
    payload: data,
  };
};

const getEmployeeSearchFailure = () => {
  return {
    type: FETCH_EMPLOYEE_SEARCH_FAILURE,
  };
};

const getAllDomainRequest = () => {
  return {
    type: FETCH_ALL_DOMAIN_REQUEST,
  };
};

const getAllDomainSuccess = (data) => {
  return {
    type: FETCH_ALL_DOMAIN_SUCCESS,
    payload: data,
  };
};

const getAllDomainFailure = () => {
  return {
    type: FETCH_ALL_DOMAIN_FAILURE,
  };
};

export const getAllProjects = (data) => {
  return async (dispatch) => {
    dispatch(getAllProjectsRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/api/projects/getAllProjects",
        null,
        data
      );
      dispatch(getAllProjectsSuccess(response));
    } catch (err) {
      dispatch(getAllProjectsFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getEmployeeSearchAction = (data) => {
  return async (dispatch) => {
    dispatch(getEmployeeSearchRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/api/projects/employees/search",
        null,
        {
          empSearch: data || "",
        }
      );
      dispatch(getEmployeeSearchSuccess(response));
      console.log("getEmployeeSearchSuccess", getEmployeeSearchSuccess);
    } catch (err) {
      dispatch(getEmployeeSearchFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getAllDomainAction = (data) => {
  return async (dispatch) => {
    dispatch(getAllDomainRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/api/domain/getAllDomains",
        null,
        data
      );
      dispatch(getAllDomainSuccess(response));
    } catch (err) {
      dispatch(getAllDomainFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
