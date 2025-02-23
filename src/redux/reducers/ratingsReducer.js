import {
    GET_ALL_UNDER_MANAGER_FAIL,
    GET_ALL_UNDER_MANAGER_REQUEST,
    GET_ALL_UNDER_MANAGER_SUCCESS,
    SEND_ALL_RATINGS_FAIL,
    SEND_ALL_RATINGS_REQUEST,
    SEND_ALL_RATINGS_SUCCESS,
    GET_ALL_DATA_FAIL,
    GET_ALL_DATA_REQUEST,
    GET_ALL_DATA_SUCCESS,
  } from "../../redux/actions/Ratings/ratingsActionTypes";

  const initialData = {
    underMembers: [],
    rating:[],
    data:[],
  };

  const ratingsReducer = (state = initialData, action) => {
    switch (action.type) {

        case GET_ALL_UNDER_MANAGER_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_UNDER_MANAGER_SUCCESS:
      return {
        ...state,
        underMembers: action.payload,
      };
    case GET_ALL_UNDER_MANAGER_FAIL:
      return {
        ...state,
        underMembers: [],
      };
      case SEND_ALL_RATINGS_REQUEST:
      return {
        ...state,
      };
    case SEND_ALL_RATINGS_SUCCESS:
      return {
        ...state,
        rating: action.payload,
      };
    case SEND_ALL_RATINGS_FAIL:
      return {
        ...state,
        rating: [],
      };
      case GET_ALL_DATA_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case GET_ALL_DATA_FAIL:
      return {
        ...state,
        data: [],
      };
        default:
      return state;
  }
};

export default ratingsReducer;