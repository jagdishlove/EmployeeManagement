import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  MASTER_DATA_FAIL,
  MASTER_DATA_REQUEST,
  MASTER_DATA_SUCCESS,
  GET_ALL_SKILL_SUCCESS,
  GET_ALL_DESIGNATION_SUCCESS,
  GET_ALL_BAND_SUCCESS,
  GET_ALL_OFFICELOCAION_SUCCESS,
  GET_OFFICE_LOCATION_SUCCESS,
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

const GetAllSkillDataSuccess = (response) => {
  return {
    type: GET_ALL_SKILL_SUCCESS,
    payload: response,
  }
}

const getAllDesignationSuccess = (response) => {
  return {
    type : GET_ALL_DESIGNATION_SUCCESS,
    payload: response
  }
}

const getAllBandSuccess = (response) => {
  return{
    type : GET_ALL_BAND_SUCCESS,
    payload: response
  }
}

const getAllOfficeLocations = (response) => {
  return{
    type : GET_ALL_OFFICELOCAION_SUCCESS,
    payload:response
  }
}

const getOfficeLocation = (respose) => {
  return {
    type : GET_OFFICE_LOCATION_SUCCESS,
    payload : respose
  }
}
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

export const GetAllSkillData = () => {
  return async (dispatch) => {
    try{
       const response = await  makeRequest(
          "GET",
          "api/skill/getAll",
        );
        dispatch(GetAllSkillDataSuccess(response))

    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const DeleteSkillData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "DELETE",
          `api/skill/delete/${data}`,
        );
      toast.success("Skill Is been Disabled  ", {
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

export const GetAllBandData = () => {
  return async (dispatch) => {
    try{
       const response = await  makeRequest(
          "GET",
          "api/band/getAll",
        );
        dispatch(getAllBandSuccess(response))

    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}



export const DeleteBandData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "DELETE",
          `api/band/delete/${data}`,
        );
      toast.success("band Is been Disabled  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const CreateDesignationData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/designation/create",
          data
        );
      toast.success("designation Is been added  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetAllDesignationData = () => {
  return async (dispatch) => {
    try{
       const response = await  makeRequest(
          "GET",
          "api/designation/getAll",
        );
        dispatch(getAllDesignationSuccess(response))

    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const DeleteDesignationData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "DELETE",
          `api/designation/delete/${data}`,
        );
      toast.success("designation Is been Disabled  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const CreateOfficeLocationnData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/officeLocation/create",
          data
        );
      toast.success("officeLocation Is been added  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetAllOfficeLocationData = () => {
  return async (dispatch) => {
    try{
       const response = await  makeRequest(
          "GET",
          "api/officeLocation/getAll",
        );
        dispatch(getAllOfficeLocations(response))

    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetOfficeLocation = (data) => {
  return async (dispatch) => {
    try{
       const response = await  makeRequest(
          "GET",
          `api/officeLocation/get/${data}`,
        );
        dispatch(getOfficeLocation(response))

    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}