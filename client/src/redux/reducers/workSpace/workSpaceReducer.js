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

} from "../../actions/workSpace/workSpaceActioType";

const initialData = {
  projectList: [],
  workSpaceData: [],
  projectperformance:[],
  myspaceActivity:[],
  ratingData:[],
  reports: [],
  teamMembers: [],
  projectProgressGraphData:[]
};

const workspaceReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTLIST_REQUEST:
      return {
        ...state,
        projectList: [],
      };
    case GET_ALL_PROJECTLIST_SUCCESS:
      return {
        ...state,
        projectList: action.payload,
      };
    case GET_ALL_PROJECTLIST_FAIL: {
      return {
        ...state,
        projectList: [],
      };
    }
    case GET_WORKSPACE_DATA_REQUEST:
      return {
        ...state,
        workSpaceData: [],
      };
    case GET_WORKSPACE_DATA_SUCCESS:
      return {
        ...state,
        workSpaceData: action.payload,
      };
    case GET_WORKSPACE_DATA_FAIL:
      return {
        ...state,
        projectList: [],
      };
      case GET_PROJECT_PERFORMANCE_REQUEST:
        return {
          ...state,
          projectperformance: [],
        };
      case GET_PROJECT_PERFORMANCE_SUCCESS:
        return {
          ...state,
          projectperformance: action.payload,
        };
      case GET_PROJECT_PERFORMANCE_FAIL: {
        return {
          ...state,
          projectperformance: [],
        };
      }
      case RATING_DATA_REQUEST:
        return {
          ...state,
          ratingData: [],
        };
      case RATING_DATA_SUCCESS:
        return {
          ...state,
          ratingData: action.payload,
        };
      case RATING_DATA_FAIL: {
        return {
          ...state,
          ratingData: [],
        };
      }
      case MYSPACE_ACTIVITY_REQUEST:
        return {
          ...state,
          myspaceActivity: [],
        };
      case MYSPACE_ACTIVITY_SUCCESS:
        return {
          ...state,
          myspaceActivity: action.payload,
        };
      case MYSPACE_ACTIVITY_FAIL: {
        return {
          ...state,
          myspaceActivity: [],
        };
      }
      case TODAY_ACTIVITY_REQUEST:
        return {
          ...state,
          todayActivity: [],
        };
      case TODAY_ACTIVITY_SUCCESS:
        return {
          ...state,
          todayActivity: action.payload,
        };
      case TODAY_ACTIVITY_FAIL: {
        return {
          ...state,
          todayActivity: [],
        };
      }

    case GET_ALL_REPORTES_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_REPORTES_SUCCESS:
      return {
        ...state,
        reports: action.payload,
      };
    case GET_ALL_REPORTES_FAIL:
      return {
        ...state,
        reports: [],
      };
    case GET_ALL_TEAMEMBERS_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_TEAMEMBERS_SUCCESS:
      return {
        ...state,
        teamMembers: action.payload,
      };
    case GET_ALL_TEAMEMBERS_FAIL:
      return {
        ...state,
        teamMembers: [],
      };

      case GET_PROJECT_PROGRESS_GRAPH_DATA_REQUEST:
        return {
          ...state,
         projectProgressGraphData: [],
        };
      case GET_PROJECT_PROGRESS_GRAPH_DATA_SUCCESS:
        return {
          ...state,
          projectProgressGraphData: action.payload,
        };
      case GET_PROJECT_PROGRESS_GRAPH_DATA_FAIL:
        return {
          ...state,
          projectProgressGraphData: [],
        };
  
    default:
      return state;
  }
};

export default workspaceReducer;
