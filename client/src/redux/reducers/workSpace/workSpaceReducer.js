import {
  GET_ALL_PROJECTLIST_REQUEST,
  GET_ALL_PROJECTLIST_SUCCESS,
  GET_ALL_PROJECTLIST_FAIL,
} from "../../actions/workSpace/workSpaceActioType";

const initialData = {
  projectList: [],
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

    default:
      return state;
  }
};

export default workspaceReducer;
