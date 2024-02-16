import {
  FETCH_ALL_PROJECTS_FAILURE,
  FETCH_ALL_PROJECTS_REQUEST,
  FETCH_ALL_PROJECTS_SUCCESS,
} from "../actions/projects/projectsActionTypes";

const initialState = {
  projectsData: [],
  projectsDataLoading: false,
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PROJECTS_REQUEST:
      return {
        ...state,
        projectsDataLoading: true,
      };
    case FETCH_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsData: action.payload,
        projectsDataLoading: false,
      };
    case FETCH_ALL_PROJECTS_FAILURE:
      return {
        ...state,
        projectssData: [],
        projectsDataLoading: false,
      };
    default:
      return state;
  }
};

export default projectsReducer;
