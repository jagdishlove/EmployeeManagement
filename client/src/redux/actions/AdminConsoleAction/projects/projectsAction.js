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
  FETCH_ALLOCATION_SEARCH_REQUEST,
  FETCH_ALLOCATION_SEARCH_SUCCESS,
  FETCH_ALLOCATION_SEARCH_FAILURE,
  FETCH_SEARCH_CLIENT_NAME_PROJECT_NAME_REQUEST,
  FETCH_SEARCH_CLIENT_NAME_PROJECT_NAME_SUCCESS,
  FETCH_SEARCH_CLIENT_NAME_PROJECT_NAME_FAIL,
  FETCH_CLIENT_NAME_REQUEST,
  FETCH_CLIENT_NAME_SUCCESS,
  FETCH_CLIENT_NAME_FAILURE,
  FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_REQUEST,
  FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_SUCCESS,
  FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_FAILURE,
  FETCH_CLIENT_DETAILS_REQUEST,
  FETCH_CLIENT_DETAILS_SUCCESS,
  FETCH_CLIENT_DETAILS_FAILURE,
  GET_ALL_COUNTRY_CITY_STATE_REQUEST,
  GET_ALL_COUNTRY_CITY_STATE_SUCCESS,
  GET_ALL_COUNTRY_CITY_STATE_FAILURE,
  SAVE_CREATE_PROJECT_REQUEST,
  SAVE_CREATE_PROJECT_SUCCESS,
  SAVE_CREATE_PROJECT_FAIL,
  SAVE_CREATE_COST_INCURRED_REQUEST,
  SAVE_CREATE_COST_INCURRED_SUCCESS,
  SAVE_CREATE_COST_INCURRED_FAIL,
  FETCH_PROJECT_DETAILS_REQUEST,
  FETCH_PROJECT_DETAILS_SUCCESS,
  FETCH_PROJECT_DETAILS_FAILURE,
  FETCH_ALL_COST_INCURRED_REQUEST,
  FETCH_ALL_COST_INCURRED_SUCCESS,
  FETCH_ALL_COST_INCURRED_FAILURE,
  FETCH_RESOURCE_DETAILS_POPUP_REQUEST,
  FETCH_RESOURCE_DETAILS_POPUP_SUCCESS,
  FETCH_RESOURCE_DETAILS_POPUP_FAILURE,
  SAVE_CREATE_RESOURCES_SUCCESS,
  SAVE_CREATE_RESOURCES_REQUEST,
  SAVE_CREATE_RESOURCES_FAIL,
  FETCH_ALL_RESOURCE_REQUEST,
  FETCH_ALL_RESOURCE__SUCCESS,
  FETCH_ALL_RESOURCE__FAILURE,
} from "./projectsActionTypes.js";
import { getRefreshToken } from "../../login/loginAction.js";
import { errorMessage } from "../../errors/errorsAction.js";

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

const getAllocationSearchRqst = () => {
  return {
    type: FETCH_ALLOCATION_SEARCH_REQUEST,
  };
};
const getAllocationSearchSuccess = (data) => {
  return {
    type: FETCH_ALLOCATION_SEARCH_SUCCESS,
    payload: data,
  };
};
const getAllocationSearchFailure = () => {
  return {
    type: FETCH_ALLOCATION_SEARCH_FAILURE,
  };
};

const getClientNameRequest = () => {
  return {
    type: FETCH_CLIENT_NAME_REQUEST,
  };
};

const getClientNameSuccess = (data) => {
  return {
    type: FETCH_CLIENT_NAME_SUCCESS,
    payload: data,
  };
};

const getClientNameFailure = () => {
  return {
    type: FETCH_CLIENT_NAME_FAILURE,
  };
};

const getResourcesNameDesignationSearchRequest = () => {
  return {
    type: FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_REQUEST,
  };
};

const getResourcesNameDesignationSearchSuccess = (data) => {
  return {
    type: FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_SUCCESS,
    payload: data,
  };
};

const getResourcesNameDesignationSearchFailure = () => {
  return {
    type: FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_FAILURE,
  };
};

const getClientDetailsRequest = () => {
  return {
    type: FETCH_CLIENT_DETAILS_REQUEST,
  };
};

const getClientDetailsSuccess = (data) => {
  return {
    type: FETCH_CLIENT_DETAILS_SUCCESS,
    payload: data,
  };
};

const getClientDetailsFailure = () => {
  return {
    type: FETCH_CLIENT_DETAILS_FAILURE,
  };
};

const getAllCountryCityStateRequest = () => {
  return {
    type: GET_ALL_COUNTRY_CITY_STATE_REQUEST,
  };
};

const getAllCountryCityStateSuccess = (data) => {
  return {
    type: GET_ALL_COUNTRY_CITY_STATE_SUCCESS,
    payload: data,
  };
};

const getAllCountryCityStateFailure = () => {
  return {
    type: GET_ALL_COUNTRY_CITY_STATE_FAILURE,
  };
};

const saveCreateProjectRequest = () => {
  return {
    type: SAVE_CREATE_PROJECT_REQUEST,
  };
};
const saveCreateProjectSuccess = (data) => {
  return {
    type: SAVE_CREATE_PROJECT_SUCCESS,
    payload: data,
  };
};
const saveCreateProjectFail = () => {
  return {
    type: SAVE_CREATE_PROJECT_FAIL,
  };
};

const getClientProjectNameSearchRequest = () => {
  return {
    type: FETCH_SEARCH_CLIENT_NAME_PROJECT_NAME_REQUEST,
  };
};

const getClientProjectNameSearchSuccess = (data) => {
  return {
    type: FETCH_SEARCH_CLIENT_NAME_PROJECT_NAME_SUCCESS,
    payload: data,
  };
};

const getClientProjectNameSearchFailure = () => {
  return {
    type: FETCH_SEARCH_CLIENT_NAME_PROJECT_NAME_FAIL,
  };
};

const saveCreateCostIncurredRequest = () => {
  return {
    type: SAVE_CREATE_COST_INCURRED_REQUEST,
  };
};
const saveCreateCostIncurredSuccess = () => {
  return {
    type: SAVE_CREATE_COST_INCURRED_SUCCESS,
  };
};
const saveCreateCostIncurredFail = () => {
  return {
    type: SAVE_CREATE_COST_INCURRED_FAIL,
  };
};

const getProjectDetailsRequest = () => {
  return {
    type: FETCH_PROJECT_DETAILS_REQUEST,
  };
};

const getProjectDetailsSuccess = (data) => {
  return {
    type: FETCH_PROJECT_DETAILS_SUCCESS,
    payload: data,
  };
};

const getProjectDetailsFailure = () => {
  return {
    type: FETCH_PROJECT_DETAILS_FAILURE,
  };
};

const getAllCostIncurredRequest = () => {
  return {
    type: FETCH_ALL_COST_INCURRED_REQUEST,
  };
};

const getAllCostIncurredSuccess = (data) => {
  return {
    type: FETCH_ALL_COST_INCURRED_SUCCESS,
    payload: data,
  };
};

const getAllCostIncurredFailure = () => {
  return {
    type: FETCH_ALL_COST_INCURRED_FAILURE,
  };
};

const getResourceDetailsPopupRequest = () => {
  return {
    type: FETCH_RESOURCE_DETAILS_POPUP_REQUEST,
  };
};

const getResourceDetailsPopupSuccess = (data) => {
  return {
    type: FETCH_RESOURCE_DETAILS_POPUP_SUCCESS,
    payload: data,
  };
};
const getResourceDetailsPopupFailure = () => {
  return {
    type: FETCH_RESOURCE_DETAILS_POPUP_FAILURE,
  };
};

const getAllResourcesRequest = () => {
  return {
    type: FETCH_ALL_RESOURCE_REQUEST,
  };
};

const getAllResourcesSuccess = (data) => {
  return {
    type: FETCH_ALL_RESOURCE__SUCCESS,
    payload: data,
  };
};
const getAllResourcesFailure = () => {
  return {
    type: FETCH_ALL_RESOURCE__FAILURE,
  };
};

const saveCreateResourcesRequest = () => {
  return {
    type: SAVE_CREATE_RESOURCES_REQUEST,
  };
};
const saveCreateResourcesSuccess = (data) => {
  return {
    type: SAVE_CREATE_RESOURCES_SUCCESS,
    payload: data,
  };
};
const saveCreateResourcesFail = () => {
  return {
    type: SAVE_CREATE_RESOURCES_FAIL,
  };
};

const deleteCostIncurredRequest = () => {
  return {
    type: SAVE_CREATE_COST_INCURRED_REQUEST,
  };
};
const deleteCostIncurredSuccess = () => {
  return {
    type: SAVE_CREATE_COST_INCURRED_SUCCESS,
  };
};
const deleteCostIncurredFail = () => {
  return {
    type: SAVE_CREATE_COST_INCURRED_FAIL,
  };
};

const deleteResourcesRequest = () => {
  return {
    type: SAVE_CREATE_RESOURCES_REQUEST,
  };
};
const deleteResourcesSuccess = () => {
  return {
    type: SAVE_CREATE_RESOURCES_SUCCESS,
  };
};
const deleteResourcesFail = () => {
  return {
    type: SAVE_CREATE_RESOURCES_FAIL,
  };
};

export const getAllProjects = (payload, getProjectpayload) => {
  return async (dispatch) => {
    dispatch(getAllProjectsRequest());
    try {
      const response = await makeRequest(
        "POST",
        "/api/projects/getProjects",
        payload,
        getProjectpayload
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

export const getProjectDetailsAction = (data) => {
  return async (dispatch) => {
    dispatch(getProjectDetailsRequest());
    try {
      const response = await makeRequest(
        "GET",
        `/api/projects/getProject/${data}`
      );
      dispatch(getProjectDetailsSuccess(response));
    } catch (err) {
      dispatch(getProjectDetailsFailure());
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
    } catch (err) {
      dispatch(getEmployeeSearchFailure());
      // toast.error(err.response.data.errorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      // });
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

export const getAllocationSearch = (data) => {
  return async (dispatch) => {
    dispatch(getAllocationSearchRqst());
    try {
      const response = await makeRequest(
        "GET",
        "/api/resources/searchResource",
        null,
        data
      );
      dispatch(getAllocationSearchSuccess(response));
    } catch (err) {
      dispatch(getAllocationSearchFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getClientProjectNameSearchAction = (data) => {
  return async (dispatch) => {
    dispatch(getClientProjectNameSearchRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/projects/searchByProjectOrClientName",
        null,
        {
          searchTerm: data || "",
        }
      );
      dispatch(getClientProjectNameSearchSuccess(response));
    } catch (err) {
      dispatch(getClientProjectNameSearchFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getClientNameAction = (data) => {
  return async (dispatch) => {
    dispatch(getClientNameRequest());
    try {
      const response = await makeRequest("GET", "/api/clients/search", null, {
        clientSearch: data || "",
      });
      dispatch(getClientNameSuccess(response));
    } catch (err) {
      dispatch(getClientNameFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getResourcesNameDesignationSearchAction = (data) => {
  return async (dispatch) => {
    dispatch(getResourcesNameDesignationSearchRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/api/resources/searchResource",
        null,
        {
          query: data || "",
          skillIds: data || "",
        }
      );
      dispatch(getResourcesNameDesignationSearchSuccess(response));
    } catch (err) {
      dispatch(getResourcesNameDesignationSearchFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getClientDetailsAction = (clientId) => {
  return async (dispatch) => {
    dispatch(getClientDetailsRequest());
    try {
      const response = await makeRequest("GET", `/api/client/get/${clientId}`);
      dispatch(getClientDetailsSuccess(response));
    } catch (err) {
      dispatch(getClientDetailsFailure());
      // toast.error(err.response.data.errorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      // });
    }
  };
};

export const GetAllCountryCityStateAction = () => {
  return async (dispatch) => {
    dispatch(getAllCountryCityStateRequest());
    try {
      const response = await makeRequest("GET", "api/masterData/getAll");
      dispatch(getAllCountryCityStateSuccess(response));
    } catch (err) {
      dispatch(getAllCountryCityStateFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const saveCreateProjectAction = (payload, saveProjectStagePayload) => {
  return async (dispatch) => {
    try {
      dispatch(saveCreateProjectRequest());
      const response = await makeRequest(
        "POST",
        "/api/projects/createProject",
        payload,
        saveProjectStagePayload
      );
      dispatch(saveCreateProjectSuccess(response));
      toast.success("Project Created Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return response;
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      } else if (err.response.data.errorCode === 500) {
        dispatch(saveCreateProjectFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const saveCreateCostIncurredAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(saveCreateCostIncurredRequest());
      const response = await makeRequest(
        "POST",
        "/api/costIncurred/create",
        payload
      );
      dispatch(saveCreateCostIncurredSuccess());
      toast.success("Cost Incurred Details added sucessfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return response;
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      } else if (err.response.data.errorCode === 500) {
        dispatch(saveCreateCostIncurredFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const getAllCostIncurredAction = (data) => {
  return async (dispatch) => {
    dispatch(getAllCostIncurredRequest());
    try {
      const response = await makeRequest(
        "GET",
        `/api/costIncurred/getAllCostIncurred/${data}`
      );
      dispatch(getAllCostIncurredSuccess(response));
    } catch (err) {
      dispatch(getAllCostIncurredFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getResourceDetailsPopupAction = (data) => {
  return async (dispatch) => {
    dispatch(getResourceDetailsPopupRequest());
    try {
      const response = await makeRequest(
        "GET",
        `/api/resources/resourceDetails/${data}`
      );
      dispatch(getResourceDetailsPopupSuccess(response));
    } catch (err) {
      dispatch(getResourceDetailsPopupFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const saveCreateResourcesAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(saveCreateResourcesRequest());
      const response = await makeRequest(
        "POST",
        "/api/resources/create",
        payload
      );
      dispatch(saveCreateResourcesSuccess(response));
      toast.success("Resources Created Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return response;
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      } else if (err.response.data.errorCode === 500) {
        dispatch(saveCreateResourcesFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const deleteCostIncurredAction = (id, projectId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteCostIncurredRequest());
      const response = await makeRequest(
        "DELETE",
        `/api/costIncurred/delete/${id}`
      );
      dispatch(deleteCostIncurredSuccess(response?.token));
      dispatch(getAllCostIncurredAction(projectId));
      toast.success("Cost Incurred Deleted Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(deleteCostIncurredFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const getAllResourcesAction = (data) => {
  return async (dispatch) => {
    dispatch(getAllResourcesRequest());
    try {
      const response = await makeRequest(
        "GET",
        `/api/resources/getAllResources/${data}`
      );
      dispatch(getAllResourcesSuccess(response));
    } catch (err) {
      dispatch(getAllResourcesFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const deleteResourcesAction = (id, projectId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteResourcesRequest());
      const response = await makeRequest(
        "DELETE",
        `/api/resources/delete/${id}`
      );
      dispatch(deleteResourcesSuccess(response?.token));
      dispatch(getAllResourcesAction(projectId));
      toast.success("Resources Deleted Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(deleteResourcesFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
