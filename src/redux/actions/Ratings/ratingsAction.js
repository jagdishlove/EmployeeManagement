import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
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
} from "./ratingsActionTypes";

const getAllUnderManagerRequest = () => {
    return {
      type: GET_ALL_UNDER_MANAGER_REQUEST,
    };
  };
  const getAllUnderManagerSuccess = (data) => {
    return {
      type: GET_ALL_UNDER_MANAGER_SUCCESS,
      payload: data,
    };
  };

  const getAllUnderManagerFail = () => {
    return {
      type: GET_ALL_UNDER_MANAGER_FAIL,
    };
  };
  const sendAllRatingsRequest = () => {
    return {
      type: SEND_ALL_RATINGS_REQUEST,
    };
  };
  const sendAllRatingsSuccess = (data) => {
    return {
      type: SEND_ALL_RATINGS_SUCCESS,
      payload: data,
    };
  };

  const sendAllRatingsFail = () => {
    return {
      type: SEND_ALL_RATINGS_FAIL,
    };
  };

  const getAllDataRequest = () => {
    return {
      type: GET_ALL_DATA_REQUEST,
    };
  };
  const getAllDataSuccess = (data) => {
    return {
      type: GET_ALL_DATA_SUCCESS,
      payload: data,
    };
  };

  const getAllDataFail = () => {
    return {
      type: GET_ALL_DATA_FAIL,
    };
  };


  export const getAllUnderManagerAction = (data) => {
    return async (dispatch) => {
      dispatch(getAllUnderManagerRequest());
      try {
        const response = await makeRequest(
          "GET",
          "api/rating/under-manager",
          null,
          data
        );
        dispatch(getAllUnderManagerSuccess(response));
      } catch (err) {
        dispatch(getAllUnderManagerFail());
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
  };
  
  export const getAllRatingsAction = (params) => {
    return async (dispatch) => {
      dispatch(sendAllRatingsRequest());
      try {
        const response = await makeRequest(
          "POST",
          "/api/rating/save",

             params ,
          
          null
         
        );
        dispatch(sendAllRatingsSuccess(response)); 
      } catch (err) {
        dispatch(sendAllRatingsFail());
        toast.error(err.response?.data?.errorMessage || 'An error occurred', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } 
    };
  };

  export const getAllDataAction = (data) => {
    return async (dispatch) => {
      dispatch(getAllDataRequest());
      try {
        const response = await makeRequest(
          "GET",
          "api/rating/by-manager",
          null,
          data
        );
        dispatch(getAllDataSuccess(response));
      } catch (err) {
        dispatch(getAllDataFail());
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
  };

  
  
  
  