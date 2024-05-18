import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import {
  GET_ALL_PROJECTLIST_REQUEST,
  GET_ALL_PROJECTLIST_SUCCESS,
  GET_ALL_PROJECTLIST_FAIL,
  GET_WORKSPACE_DATA_FAIL,
  GET_WORKSPACE_DATA_REQUEST,
  GET_WORKSPACE_DATA_SUCCESS,
  GET_PROJECT_PERFORMANCE_REQUEST,
  GET_PROJECT_PERFORMANCE_SUCCESS,
  GET_PROJECT_PERFORMANCE_FAIL,
  RATING_DATA_REQUEST,
  RATING_DATA_SUCCESS,
  RATING_DATA_FAIL,
  MYSPACE_ACTIVITY_REQUEST,
  MYSPACE_ACTIVITY_SUCCESS,
  MYSPACE_ACTIVITY_FAIL,
  TODAY_ACTIVITY_REQUEST,
  TODAY_ACTIVITY_SUCCESS,
  TODAY_ACTIVITY_FAIL,
  GET_ALL_REPORTES_FAIL,
  GET_ALL_REPORTES_REQUEST,
  GET_ALL_REPORTES_SUCCESS,
  GET_ALL_TEAMEMBERS_FAIL,
  GET_ALL_TEAMEMBERS_REQUEST,
  GET_ALL_TEAMEMBERS_SUCCESS,
  GET_PROJECT_PROGRESS_GRAPH_DATA_REQUEST,
  GET_PROJECT_PROGRESS_GRAPH_DATA_SUCCESS,
  GET_PROJECT_PROGRESS_GRAPH_DATA_FAIL,
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

const getWorkspaceDataRequest = () => {
  return {
    type: GET_WORKSPACE_DATA_REQUEST,
  };
};

const getWorkSpaceDataSuccess = (data) => {
  return {
    type: GET_WORKSPACE_DATA_SUCCESS,
    payload: data,
  };
};

const getWorkSpaceDataFail = () => {
  return {
    type: GET_WORKSPACE_DATA_FAIL,
  };
};

const getProjectPerformanceRequest = () => {
  return {
    type: GET_PROJECT_PERFORMANCE_REQUEST,
  };
};

const getProjectPerformanceSuccess = (data) => {
  return {
    type: GET_PROJECT_PERFORMANCE_SUCCESS,
    payload:data,
  }}
const getAllReportessRequest = () => {
  return {
    type: GET_ALL_REPORTES_REQUEST,
  };
};

const getAllReportessSuccess = (data) => {
  return {
    type: GET_ALL_REPORTES_SUCCESS,
    payload: data,
  };
};

const getProjectPerformanceFail = () => {
  return {
    type: GET_PROJECT_PERFORMANCE_FAIL,
  };
};

const getRatingDataRequest = () => {
  return {
    type: RATING_DATA_REQUEST,
  };
};

const getRatingDataSuccess = (data) => {
  return {
    type: RATING_DATA_SUCCESS,
    payload:data,
  };
};

const getAllReportessFail = () => {
  return {
    type: GET_ALL_REPORTES_FAIL,
  };
};

const getAllTeamMembersRequest = () => {
  return {
    type: GET_ALL_TEAMEMBERS_REQUEST,
  };
};
const getAllTeamMembersSuccess = (data) => {
  return {
    type: GET_ALL_TEAMEMBERS_SUCCESS,
    payload: data,
  };
};

const getRatingDataFail = () => {
  return {
    type: RATING_DATA_FAIL,
  };
};
const getActivityRequest = () => {
  return {
    type: MYSPACE_ACTIVITY_REQUEST,
  };
};

const getActivitySuccess = (data) => {
  return {
    type: MYSPACE_ACTIVITY_SUCCESS,
    payload: data,
  };
};
const getAllTeamMembersFail = () => {
  return {
    type: GET_ALL_TEAMEMBERS_FAIL,
  };
};

const getProjectProgressGraphRequest = () => {
  return {
    type: GET_PROJECT_PROGRESS_GRAPH_DATA_REQUEST,
  };
};

const getProjectProgressGraphSuccess = (data) => {
  return {
    type: GET_PROJECT_PROGRESS_GRAPH_DATA_SUCCESS,
    payload: data,
  };
};

const getActivityFail = () => {
  return {
    type: MYSPACE_ACTIVITY_FAIL,
  };
};

const getTodayActivityRequest = () => {
  return {
    type: TODAY_ACTIVITY_REQUEST,
  };
};

const getTodayActivitySuccess = (data) => {
  return {
    type: TODAY_ACTIVITY_SUCCESS,
    payload: data,
  };
};

const getTodayActivityFail = () => {
  return {
    type: TODAY_ACTIVITY_FAIL,
  };
};


const getProjectProgressGraphFail = () => {
  return {
    type: GET_PROJECT_PROGRESS_GRAPH_DATA_FAIL,
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

export const getWorkSpaceDataAction = (params) => {
  return async (dispatch) => {
    dispatch(getWorkspaceDataRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/projectProgress/performance",
        null,
        params
      );
      dispatch(getWorkSpaceDataSuccess(response));
    } catch (err) {
      dispatch(getWorkSpaceDataFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};


export const getProjectPerformanceAction = (params) => {
  return async (dispatch) => {
    dispatch(getProjectPerformanceRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/workspace/projectPerformance",
        null,
        params
      );
      dispatch(getProjectPerformanceSuccess(response));
    } catch (err) {
      dispatch(getProjectPerformanceFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
export const getAllReportessAction = (data, payload) => {
  return async (dispatch) => {
    dispatch(getAllReportessRequest());
    try {
      const response = await makeRequest(
        "POST",
        "api/workspace/getAllTeamMembers",
        {
          result: payload ? [payload] : [],
        },
        data
      );
      dispatch(getAllReportessSuccess(response));
    } catch (err) {
      dispatch(getAllReportessFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
export const getAllTeamMembersAction = (data) => {
  return async (dispatch) => {
    dispatch(getAllTeamMembersRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/projectProgress/getTeamMembersDropDownList",
        null,
        data
      );
      dispatch(getAllTeamMembersSuccess(response));
    } catch (err) {
      dispatch(getAllTeamMembersFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const RatingDataAction = (params) => {
  return async (dispatch) => {
    try {
      dispatch(getRatingDataRequest());
      const response = await makeRequest(
        "get",
        `/api/history/2/22`,
        null,
        params
      );
      dispatch(getRatingDataSuccess(response));
    } catch (error) {
      dispatch(getRatingDataFail(error));
     
    }
  };
};

export const getMySpaceActivityAction = (params) => {
  return async (dispatch) => {
    dispatch(getActivityRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/workspace/activity",
        null,
        params
      );
      dispatch(getActivitySuccess(response));
    } catch (err) {
      dispatch(getActivityFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
export const getProjectProgressGraphAction = (projectId,params) => {
  return async (dispatch) => {
    dispatch(getProjectProgressGraphRequest());
    try {
      const response = await makeRequest(
        "GET",
        `api/projectProgress/timeCostPercentage/${projectId}`,
        null,
        params
      );
      dispatch(getProjectProgressGraphSuccess(response));
    } catch (err) {
      dispatch(getProjectProgressGraphFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getTodayActivityAction = (params) => {
  return async (dispatch) => {
    dispatch(getTodayActivityRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/workspace/todayActivity",
        null,
        params
      );
      dispatch(getTodayActivitySuccess(response));
    } catch (err) {
      dispatch(getTodayActivityFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
