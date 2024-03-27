import {
  DASHBOARD_PROJECT_DETAILS_REQUEST,
  DASHBOARD_PROJECT_DETAILS_SUCCESS,
  DASHBOARD_PROJECT_DETAILS_FAIL,
  DASHBOARD_PROJECT_RESOURCES_REQUEST,
  DASHBOARD_PROJECT_RESOURCES_SUCCESS,
  DASHBOARD_PROJECT_RESOURCES_FAIL,
} from "../../actions/dashboard/project/dashboardProjectActionType";

const initialData = {
  dashboardProjectdetails: [],
  dashboardProjectResources: [],
};

const workspaceReducer = (state = initialData, action) => {
  switch (action.type) {
    case DASHBOARD_PROJECT_DETAILS_REQUEST:
      return {
        ...state,
        dashboardProjectdetails: [],
      };
    case DASHBOARD_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        dashboardProjectdetails: action.payload,
      };
    case DASHBOARD_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        dashboardProjectdetails: [],
      };
    case DASHBOARD_PROJECT_RESOURCES_REQUEST:
      return {
        ...state,
        dashboardProjectResources: [],
      };
    case DASHBOARD_PROJECT_RESOURCES_SUCCESS:
      return {
        ...state,
        dashboardProjectResources: action.payload,
      };
    case DASHBOARD_PROJECT_RESOURCES_FAIL:
      return {
        ...state,
        dashboardProjectResources: [],
      };

    default:
      return state;
  }
};

export default workspaceReducer;
