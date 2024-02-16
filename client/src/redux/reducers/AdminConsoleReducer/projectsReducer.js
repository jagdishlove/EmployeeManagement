import {
  FETCH_ALL_DOMAIN_FAILURE,
  FETCH_ALL_DOMAIN_REQUEST,
  FETCH_ALL_DOMAIN_SUCCESS,
  FETCH_ALL_PROJECTS_FAILURE,
  FETCH_ALL_PROJECTS_REQUEST,
  FETCH_ALL_PROJECTS_SUCCESS,
  FETCH_CLIENT_NAME_FAILURE,
  FETCH_CLIENT_NAME_REQUEST,
  FETCH_CLIENT_NAME_SUCCESS,
  FETCH_EMPLOYEE_SEARCH_FAILURE,
  FETCH_EMPLOYEE_SEARCH_REQUEST,
  FETCH_EMPLOYEE_SEARCH_SUCCESS,
  FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_FAILURE,
  FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_REQUEST,
  FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_SUCCESS,
} from "../../actions/AdminConsoleAction/projects/projectsActionTypes";

const initialState = {
  projectsData: [],
  projectsDataLoading: false,
  employeeSearchData: [],
  employeeSearchDataLoading: false,
  allDomainData: [],
  allDomainDataLoading: false,
  clientNameData: [],
  clientNameDataLoading: false,
  resourcesNameDesignationSearchData: [],
  resourcesNameDesignationSearchDataLoading: false,
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
        projectsData: [],
        projectsDataLoading: false,
      };
    case FETCH_EMPLOYEE_SEARCH_REQUEST:
      return {
        ...state,
        employeeSearchDataLoading: true,
      };
    case FETCH_EMPLOYEE_SEARCH_SUCCESS:
      return {
        ...state,
        employeeSearchData: action.payload,
        employeeSearchDataLoading: false,
      };
    case FETCH_EMPLOYEE_SEARCH_FAILURE:
      return {
        ...state,
        employeeSearchData: [],
        employeeSearchDataLoading: false,
      };
    case FETCH_ALL_DOMAIN_REQUEST:
      return {
        ...state,
        allDomainDataLoading: true,
      };
    case FETCH_ALL_DOMAIN_SUCCESS:
      return {
        ...state,
        allDomainData: action.payload,
        allDomainDataLoading: false,
      };
    case FETCH_ALL_DOMAIN_FAILURE:
      return {
        ...state,
        allDomainData: [],
        allDomainDataLoading: false,
      };
    case FETCH_CLIENT_NAME_REQUEST:
      return {
        ...state,
        clientNameDataLoading: true,
      };
    case FETCH_CLIENT_NAME_SUCCESS:
      return {
        ...state,
        clientNameData: action.payload,
        clientNameDataLoading: false,
      };
    case FETCH_CLIENT_NAME_FAILURE:
      return {
        ...state,
        clientNameData: [],
        clientNameDataLoading: false,
      };
    case FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_REQUEST:
      return {
        ...state,
        resourcesNameDesignationSearchDataLoading: true,
      };
    case FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_SUCCESS:
      return {
        ...state,
        resourcesNameDesignationSearchData: action.payload,
        resourcesNameDesignationSearchDataLoading: false,
      };
    case FETCH_RESOURCES_NAME_DESIGNATION_SEARCH_FAILURE:
      return {
        ...state,
        resourcesNameDesignationSearchData: [],
        resourcesNameDesignationSearchDataLoading: false,
      };
    default:
      return state;
  }
};

export default projectsReducer;
