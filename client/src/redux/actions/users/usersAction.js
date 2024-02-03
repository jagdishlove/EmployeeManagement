import { toast } from 'react-toastify';
import makeRequest from '../../../api/api';
import {
    FETCH_ALL_USERS_FAILURE,
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS
} from './usersActionTypes'


const getAllUsersRequest = () => {
    return{
        type: FETCH_ALL_USERS_REQUEST
    }
};

const getAllUsersSuccess = (data) => {
    return {
      type: FETCH_ALL_USERS_SUCCESS,
      payload: data,
    };
};

const getAllUsersFailure = () => {
    return {
      type: FETCH_ALL_USERS_FAILURE
    };
};
  

export const getAllUsers = (data) => {
    return async (dispatch) => {
        dispatch(getAllUsersRequest())
      try {
        const response = await makeRequest(
            "GET",
            "/employee/getAll",
            null,
            data
          );
        dispatch(getAllUsersSuccess(response));
        console.log('getallusersapi',response)
      } catch (err) {
        dispatch(getAllUsersFailure()); 
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
  }; 