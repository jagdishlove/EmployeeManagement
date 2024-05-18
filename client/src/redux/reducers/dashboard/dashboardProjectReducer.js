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
  dashboardProjectResourcesLoading: false,
  dashboardProjectdetailsLoading: false,
};

const workspaceReducer = (state = initialData, action) => {
  switch (action.type) {
    case DASHBOARD_PROJECT_DETAILS_REQUEST:
      return {
        ...state,
        
        dashboardProjectdetailsLoading: true,
      };
    case DASHBOARD_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        dashboardProjectdetails: action.payload,
        dashboardProjectdetailsLoading: false,
      };
    case DASHBOARD_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        dashboardProjectdetails: [],
        dashboardProjectdetailsLoading: false,
      };
    case DASHBOARD_PROJECT_RESOURCES_REQUEST:
      return {
        ...state,
        dashboardProjectResourcesLoading: true,
      };
    case DASHBOARD_PROJECT_RESOURCES_SUCCESS:
      return {
        ...state,
        dashboardProjectResources: action.payload,
        dashboardProjectResourcesLoading: false,
      };
    case DASHBOARD_PROJECT_RESOURCES_FAIL:
      return {
        ...state,
        dashboardProjectResources: [],
        dashboardProjectResourcesLoading: false,
      };

    default:
      return state;
  }
};

export default workspaceReducer;
