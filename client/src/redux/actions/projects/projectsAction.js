import { toast } from 'react-toastify';
import makeRequest from '../../../api/api';
import {
    FETCH_ALL_PROJECTS_FAILURE,
    FETCH_ALL_PROJECTS_REQUEST,
    FETCH_ALL_PROJECTS_SUCCESS
} from './projectsActionTypes.js';


const getAllProjectsRequest = () => {
    return{
        type: FETCH_ALL_PROJECTS_REQUEST
    }
};

const getAllProjectsSuccess = (data) => {
    return {
      type: FETCH_ALL_PROJECTS_SUCCESS,
      payload: data,
    };
};

const getAllProjectsFailure = () => {
    return {
      type: FETCH_ALL_PROJECTS_FAILURE
    };
};
  

export const getAllProjects = (data) => {
    return async (dispatch) => {
        dispatch(getAllProjectsRequest())
      try {
        const response = await makeRequest(
            "GET",
            "/api/projects/getAllProjects",
            null,
            data
          );
        dispatch(getAllProjectsSuccess(response));
        console.log('getallprojectsapi',response)
      } catch (err) {
        dispatch(getAllProjectsFailure()); 
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
  }; 