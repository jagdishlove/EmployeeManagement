import {
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  SEARCH_EMPLOYEE_REQUEST,
  SEARCH_EMPLOYEE_SUCCESS,
  SEARCH_EMPLOYEE_FAIL,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_STATES_FAILURE,
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_LOCATION_DATA_SUCCESS,
  SET_SELECTED_COUNTRY_ID,
  GET_ALL_CITYS,
  SEARCH_EMPLOYEEANDPROJECT_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
} from "../../actions/AdminConsoleAction/users/usersActionTypes";

const initialState = {
  usersData: [],
  usersDataLoading: false,
  userDataError: false,
  userByIdData: {},
  employees: [],
  countries: [],
  states: [],
  cities: [],
  locationData: [],
  selectedCountryId: null,
  searchData: [],
  userId: {},
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS_REQUEST:
      return {
        ...state,
        usersDataLoading: true,
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersData: action.payload,
        usersDataLoading: false,
      };
    case FETCH_ALL_USERS_FAILURE:
      return {
        ...state,
        usersData: [],
        usersDataLoading: false,
      };
    case GET_USER_BY_ID_REQUEST:
      return {
        ...state,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        userByIdData: action.payload,
      };
    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
      };

    case SEARCH_EMPLOYEE_REQUEST:
      return {
        ...state,
      };
    case SEARCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.payload,
      };
    case SEARCH_EMPLOYEE_FAIL:
      return {
        ...state,
      };
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
      };

    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        countries: [],
      };
    case FETCH_STATES_REQUEST:
      return {
        ...state,
      };
    case FETCH_STATES_SUCCESS:
      return {
        ...state,
        states: action.payload,
      };

    case FETCH_STATES_FAILURE:
      return {
        ...state,
        states: [],
      };
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload,
      };

    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        cities: [],
      };
    case FETCH_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        locationData: action.payload,
      };

    case SET_SELECTED_COUNTRY_ID:
      return {
        ...state,
        selectedCountryId: action.payload,
      };

    case GET_ALL_CITYS:
      return {
        ...state,
        cities: action.payload,
      };
    case SEARCH_EMPLOYEEANDPROJECT_SUCCESS:
      return {
        ...state,
        searchData: action.payload,
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        usersDataLoading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        userId: action.payload.id,
        usersDataLoading: false,
        userDataError: null,
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        usersDataLoading: false,
        userDataError: true,
      };
    default:
      return state;
  }
};

export default usersReducer;
