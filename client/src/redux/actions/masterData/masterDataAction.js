import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  MASTER_DATA_FAIL,
  MASTER_DATA_REQUEST,
  MASTER_DATA_SUCCESS,
} from "./masterDataActionType";

const masterDataRequest = () => {
  return {
    type: MASTER_DATA_REQUEST,
  };
};

const masterDataSuccess = (response) => {
  return {
    type: MASTER_DATA_SUCCESS,
    payload: response,
  };
};

const masterDataFail = () => {
  return {
    type: MASTER_DATA_FAIL,
  };
};
export const masterDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(masterDataRequest());
      const response = await makeRequest("GET", "api/masters");
      dispatch(masterDataSuccess(response));
    } catch (err) {
     
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      // indicating that the login credentials are invalid
      dispatch(masterDataFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};


export const CreateSkillData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/skill/create",
          data
        );
      toast.success("Skill Is been added  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const CreateBandlData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/band/create",
          data
        );
      toast.success("band Is been added  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}