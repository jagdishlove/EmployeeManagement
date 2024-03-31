import {
  GET_ALL_PROJECTLIST_REQUEST,
  GET_ALL_PROJECTLIST_SUCCESS,
  GET_ALL_PROJECTLIST_FAIL,
  GET_WORKSPACE_DATA_FAIL,
  GET_WORKSPACE_DATA_REQUEST,
  GET_WORKSPACE_DATA_SUCCESS,
} from "../../actions/workSpace/workSpaceActioType";

const initialData = {
  projectList: [],
  workSpaceData: [],
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

    default:
      return state;
  }
};

export default workspaceReducer;
