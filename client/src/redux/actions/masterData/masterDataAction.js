import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  MASTER_DATA_FAIL,
  MASTER_DATA_REQUEST,
  MASTER_DATA_SUCCESS,
  GET_ALL_SKILL_SUCCESS,
  GET_ALL_SKILL_REQUEST,
  GET_ALL_SKILL_FAIL,
  GET_ALL_DESIGNATION_REQUEST,
  GET_ALL_DESIGNATION_FAIL,
  GET_ALL_JOBTYPE_SUCCESS,
  GET_ALL_JOBTYPE_REQUEST,
  GET_ALL_JOBTYPE_FAIL,
  GET_ALL_DESIGNATION_SUCCESS,
  GET_ALL_BAND_FAIL,
  GET_ALL_BAND_REQUEST,
  GET_ALL_BAND_SUCCESS,
  GET_OFFICE_LOCATION_FAIL,
  GET_OFFICE_LOCATION_REQUEST,
  GET_ALL_OFFICELOCAION_SUCCESS,
  GET_ALL_OFFICELOCAION_FAIL,
  GET_ALL_OFFICELOCAION_REQUEST,
  GET_OFFICE_LOCATION_SUCCESS,
  GET_BAND_BY_ID_FAIL,
  GET_BAND_BY_ID_REQUEST,
  GET_BAND_BY_ID_SUCCESS,
  GET_ALL_HOLIDAYS_FAIL,
  GET_ALL_HOLIDAYS_REQUEST,
  GET_ALL_HOLIDAYS_SUCCESS,
  GET_HOLIDAY_BY_ID_FAIL,
  GET_HOLIDAY_BY_ID_REQUEST,
  GET_HOLIDAY_BY_ID_SUCCESS,
  GET_ALL_DOMINE_FAIL,
  GET_ALL_DOMINE_REQUEST,
  GET_ALL_DOMINE_SUCCESS,
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

const getAllSkilldataRequest = () => {
  return{
    type: GET_ALL_SKILL_REQUEST
  }
}

const GetAllSkillDataSuccess = (response) => {
  return {
    type: GET_ALL_SKILL_SUCCESS,
    payload: response,
  }
}

const getAllSkillDataFail = () => {
  return {
    type : GET_ALL_SKILL_FAIL
  }
}

const getAllDesignationRequest = () => {
  return {
    type : GET_ALL_DESIGNATION_REQUEST
  }
}

const getAllDesignationSuccess = (response) => {
  return {
    type : GET_ALL_DESIGNATION_SUCCESS,
    payload: response
  }
}

const getAllDesignationFail = () => {
  return{
    type : GET_ALL_DESIGNATION_FAIL
  }
}

const getAllBandRequest = () => {
  return {
    type : GET_ALL_BAND_REQUEST
  }
}

const getAllBandSuccess = (response) => {
  return{
    type : GET_ALL_BAND_SUCCESS,
    payload: response
  }
}

 const GetAllJobTypeSuccess = (response) => {
  return{
    type: GET_ALL_JOBTYPE_SUCCESS,
    payload: response
  }
 }
 const GetAllJobTypeRequest = (response) => {
  return{
    type: GET_ALL_JOBTYPE_REQUEST,
    payload: response
  }
 }
 const GetAllJobTypeFail = (response) => {
  return{
    type: GET_ALL_JOBTYPE_FAIL,
    payload: response
  }
 }

const getAllBandFail = () => {
  return {
    type : GET_ALL_BAND_FAIL
  }
}

const getBandRequest = () => {
  return {
    type : GET_BAND_BY_ID_REQUEST
  }
}

const getBandFail = () => {
  return {
    type : GET_BAND_BY_ID_FAIL
  }
}
const getBandSuccess = (response) => {
  return{
    type : GET_BAND_BY_ID_SUCCESS,
    payload: response
  }
}

const getAllOfficeLocationRequest = () => {
  return {
    type : GET_ALL_OFFICELOCAION_REQUEST
  }
}

const getAllOfficeLocationFail = () => {
  return {
    type : GET_ALL_OFFICELOCAION_FAIL
  }
}
const getAllOfficeLocationSuccess = (response) => {
  return{
    type : GET_ALL_OFFICELOCAION_SUCCESS,
    payload:response
  }
}

const getOfficeLocationRequest = () => {
  return {
    type : GET_OFFICE_LOCATION_REQUEST
  }
}

const getOfficeLocationFail = () => {
  return {
    type : GET_OFFICE_LOCATION_FAIL
  }
}

const getOfficeLocationSuccess = (response) => {
  return {
    type : GET_OFFICE_LOCATION_SUCCESS,
    payload : response
  }
}

const getHolidayRequest = () => {
  return {
    type : GET_ALL_HOLIDAYS_REQUEST
  }
}

const getHolidayFail = () => {
  return {
    type : GET_ALL_HOLIDAYS_FAIL
  }
}
const getHolidaySuucess = (response) => {
  return{
    type : GET_ALL_HOLIDAYS_SUCCESS,
    payload : response
  }
}


const getHolidayByIdRequest = () => {
  return {
    type : GET_HOLIDAY_BY_ID_REQUEST
  }
}

const getHolidayByIdFail = () => {
  return {
    type : GET_HOLIDAY_BY_ID_FAIL
  }
}
const getHolidayByIdSuccess = (response) => {
  return{
    type : GET_HOLIDAY_BY_ID_SUCCESS,
    payload : response
  }
}

const getAllDomineRequest  = () => {
  return {
    type : GET_ALL_DOMINE_REQUEST
  }
}

const getAllDomineFail = () => {
  return {
    type : GET_ALL_DOMINE_FAIL
  }
}

const getAlldomineSuccess = (response) => {
  return{
    type : GET_ALL_DOMINE_SUCCESS,
    payload : response
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
        if(data.status ==='INACTIVE'){
          toast.success("Skill has been Disabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else if(data.status ==='ACTIVE'){
          toast.success("Skill has been Enabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else{
          toast.success("Skill has been Created successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }

    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const UpdateSkillData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/skill/create",
          data
        );
          toast.success("Skill has been Updated successfully", {
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
    dispatch(getAllSkilldataRequest())
    try{
       const response = await  makeRequest(
          "GET",
          "api/skill/getAll",
        );
        dispatch(GetAllSkillDataSuccess(response))

    } catch (err){
      dispatch(getAllSkillDataFail())
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
        if(data.status ==='INACTIVE'){
          toast.success("Band has been Disabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else if(data.status ==='ACTIVE'){
          toast.success("Band has been Enabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else{
          toast.success("Band has been Created successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const UpdateBandlData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/band/create",
          data
        );
          toast.success("Band has been Updated successfully", {
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
    dispatch(getAllBandRequest());
    try{
       const response = await  makeRequest(
          "GET",
          "api/band/getAll",
        );
        dispatch(getAllBandSuccess(response))

    } catch (err){
      dispatch(getAllBandFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetBand = (data) => {
  return async (dispatch) => {
    dispatch(getBandRequest())
    try{
       const response = await  makeRequest(
          "GET",
          `api/band/get/${data}`,
        );
        dispatch(getBandSuccess(response))
    } catch (err){
      dispatch(getBandFail())
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
        if(data.status ==='INACTIVE'){
          toast.success("Designation has been Disabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else if(data.status ==='ACTIVE'){
          toast.success("Designation has been Enabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else{
          toast.success("Designation has been Created successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const UpdateDesignationData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/designation/create",
          data
        );
          toast.success("Designation has been updated successfully", {
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
    dispatch(getAllDesignationRequest())
    try{
       const response = await  makeRequest(
          "GET",
          "api/designation/getAll",
        );
        dispatch(getAllDesignationSuccess(response))

    } catch (err){
      dispatch(getAllDesignationFail())
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
        if(data.status ==='INACTIVE'){
          toast.success("OfficeLocation has been Disabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else if(data.status ==='ACTIVE'){
          toast.success("OfficeLocation has been Enabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else{
          toast.success("OfficeLocation has been Created successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}


export const UpdateOfficeLocationnData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/officeLocation/create",
          data
        );
          toast.success("OfficeLocation has been Updated successfully", {
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
    dispatch(getAllOfficeLocationRequest())
    try{
       const response = await  makeRequest(
          "GET",
          "api/officeLocation/getAll",
        );
        dispatch(getAllOfficeLocationSuccess(response))

    } catch (err){
      dispatch(getAllOfficeLocationFail())
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetOfficeLocation = (data) => {
  return async (dispatch) => {
    dispatch(getOfficeLocationRequest())
    try{
       const response = await  makeRequest(
          "GET",
          `api/officeLocation/get/${data}`,
        );
        dispatch(getOfficeLocationSuccess(response))

    } catch (err){
      dispatch(getOfficeLocationFail())
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const CreateManageHoliday = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/holiday/create",
          data
        );
        if(data.status ==='INACTIVE'){
          toast.success("Holiday has been Disabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else if(data.status ==='ACTIVE'){
          toast.success("Holiday has been Enabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else{
          toast.success("Holiday has been Created successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}


export const UpdateManageHoliday = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/holiday/create",
          data
        );
          toast.success("Holiday has been Updated successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetAllHolidays = () => {
  return async (dispatch) => {
    dispatch(getHolidayRequest())
    try{
       const response = await  makeRequest(
          "GET",
          "api/holiday/getAll",
        );
        dispatch(getHolidaySuucess(response))

    } catch (err){
      dispatch(getHolidayFail())
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetHoliday = (data) => {
  return async (dispatch) => {
    dispatch(getHolidayByIdRequest())
    try{
       const response = await  makeRequest(
          "GET",
          `api/holiday/get/${data}`,
        );
        dispatch(getHolidayByIdSuccess(response))
    } catch (err){
      dispatch(getHolidayByIdFail())
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const CreateDomine = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/domain/create",
          data
        );
        if(data.status ==='INACTIVE'){
          toast.success("Domain has been Disabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else if(data.status ==='ACTIVE'){
          toast.success("Domain has been Enabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else{
          toast.success("Domain has been added successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}


export const UpdateDomine = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/domain/create",
          data
        );
          toast.success("Domain has been Update successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetAllDomines = () => {
  return async (dispatch) => {
    dispatch(getAllDomineRequest())
    try{
       const response = await  makeRequest(
          "GET",
          "api/domain/getAllDomains",
        );
        dispatch(getAlldomineSuccess(response))

    } catch (err){
      dispatch(getAllDomineFail())
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const CreateJobTypeData = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/jobType/create",
          data
        );
        if(data.status ==='INACTIVE'){
          toast.success("JobType has been Disabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else if(data.status ==='ACTIVE'){
          toast.success("JobType has been Enabled successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
        else{
          toast.success("JobType has been Created successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const UpdateJobType = (data) => {
  return async () => {
    try{
        await  makeRequest(
          "POST",
          "api/jobType/create",
          data
        );
          toast.success("JobType has been Update successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
    } catch (err){
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }
}

export const GetAllJobTypeData = () => {
  return async (dispatch) => {
    dispatch(GetAllJobTypeRequest());
    try{
      
       const response = await  makeRequest(
          "GET",
          "api/jobType/getAll",
        );
        dispatch(GetAllJobTypeSuccess(response))

    } catch (err){
      // toast.error(err.response.data.errorMessage, {
      //   position: toast.POSITION.BOTTOM_CENTER,
        dispatch(GetAllJobTypeFail(err.response.data.errorMessage));
      }
    }
  }

