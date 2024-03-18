import { toast } from "react-toastify";
import makeRequest, { addRequest } from "../../../api/api";
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
  GET_ALL_COUNTRY_REQUEST,
  GET_ALL_STATE_REQUEST,
  GET_ALL_COUNTRY_SUCCESS,
  GET_ALL_STATE_SUCCESS,
  GET_ALL_COUNTRY_FAIL,
  GET_ALL_STATE_FAIL,
  GET_ALL_CLIENT_DETAILS_FAIL,
  GET_ALL_CLIENT_DETAILS_REQUEST,
  GET_ALL_CLIENT_DETAILS_SUCCESS,
  GET_CLIENT_DETAILS_FAIL,
  GET_CLIENT_DETAILS_REQUEST,
  GET_CLIENT_DETAILS_SUCCESS,
  GET_LOCATION_MASTER_DATA_FAIL,
  GET_LOCATION_MASTER_DATA_REQUEST,
  GET_LOCATION_MASTER_DATA_SUCCESS,
  GET_ALL_ONSITE_OFFICE_LOCATION_FAIL,
  GET_ALL_ONSITE_OFFICE_LOCATION_REQUEST,
  GET_ALL_ONSITE_OFFICE_LOCATION_SUCCESS,
  GET_ONSITE_OFFICE_LOCATION_FAIL,
  GET_ONSITE_OFFICE_LOCATION_REQUEST,
  GET_ONSITE_OFFICE_LOCATION_SUCCESS,
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
  return {
    type: GET_ALL_SKILL_REQUEST,
  };
};

const GetAllSkillDataSuccess = (response) => {
  return {
    type: GET_ALL_SKILL_SUCCESS,
    payload: response,
  };
};

const getAllSkillDataFail = () => {
  return {
    type: GET_ALL_SKILL_FAIL,
  };
};

const getAllDesignationRequest = () => {
  return {
    type: GET_ALL_DESIGNATION_REQUEST,
  };
};

const getAllDesignationSuccess = (response) => {
  return {
    type: GET_ALL_DESIGNATION_SUCCESS,
    payload: response,
  };
};

const getAllDesignationFail = () => {
  return {
    type: GET_ALL_DESIGNATION_FAIL,
  };
};

const getAllBandRequest = () => {
  return {
    type: GET_ALL_BAND_REQUEST,
  };
};

const getAllBandSuccess = (response) => {
  return {
    type: GET_ALL_BAND_SUCCESS,
    payload: response,
  };
};

const GetAllJobTypeSuccess = (response) => {
  return {
    type: GET_ALL_JOBTYPE_SUCCESS,
    payload: response,
  };
};
const GetAllJobTypeRequest = (response) => {
  return {
    type: GET_ALL_JOBTYPE_REQUEST,
    payload: response,
  };
};
const GetAllJobTypeFail = (response) => {
  return {
    type: GET_ALL_JOBTYPE_FAIL,
    payload: response,
  };
};

const getAllBandFail = () => {
  return {
    type: GET_ALL_BAND_FAIL,
  };
};

const getBandRequest = () => {
  return {
    type: GET_BAND_BY_ID_REQUEST,
  };
};

const getBandFail = () => {
  return {
    type: GET_BAND_BY_ID_FAIL,
  };
};
const getBandSuccess = (response) => {
  return {
    type: GET_BAND_BY_ID_SUCCESS,
    payload: response,
  };
};

const getAllOfficeLocationRequest = () => {
  return {
    type: GET_ALL_OFFICELOCAION_REQUEST,
  };
};

const getAllOfficeLocationFail = () => {
  return {
    type: GET_ALL_OFFICELOCAION_FAIL,
  };
};
const getAllOfficeLocationSuccess = (response) => {
  return {
    type: GET_ALL_OFFICELOCAION_SUCCESS,
    payload: response,
  };
};

const getOfficeLocationRequest = () => {
  return {
    type: GET_OFFICE_LOCATION_REQUEST,
  };
};

const getOfficeLocationFail = () => {
  return {
    type: GET_OFFICE_LOCATION_FAIL,
  };
};

const getOfficeLocationSuccess = (response) => {
  return {
    type: GET_OFFICE_LOCATION_SUCCESS,
    payload: response,
  };
};

const getHolidayRequest = () => {
  return {
    type: GET_ALL_HOLIDAYS_REQUEST,
  };
};

const getHolidayFail = () => {
  return {
    type: GET_ALL_HOLIDAYS_FAIL,
  };
};
const getHolidaySuucess = (response) => {
  return {
    type: GET_ALL_HOLIDAYS_SUCCESS,
    payload: response,
  };
};

const getHolidayByIdRequest = () => {
  return {
    type: GET_HOLIDAY_BY_ID_REQUEST,
  };
};

const getHolidayByIdFail = () => {
  return {
    type: GET_HOLIDAY_BY_ID_FAIL,
  };
};
const getHolidayByIdSuccess = (response) => {
  return {
    type: GET_HOLIDAY_BY_ID_SUCCESS,
    payload: response,
  };
};

const getAllDomineRequest = () => {
  return {
    type: GET_ALL_DOMINE_REQUEST,
  };
};

const getAllDomineFail = () => {
  return {
    type: GET_ALL_DOMINE_FAIL,
  };
};

const getAlldomineSuccess = (response) => {
  return {
    type: GET_ALL_DOMINE_SUCCESS,
    payload: response,
  };
};

const getAllcountryRequest = () => {
  return {
    type: GET_ALL_COUNTRY_REQUEST,
  };
};

const getAllCountrySuccess = (response) => {
  return {
    type: GET_ALL_COUNTRY_SUCCESS,
    payload: response,
  };
};

const getAllCountryFail = () => {
  return {
    type: GET_ALL_COUNTRY_FAIL,
  };
};

const getAllStateRequest = () => {
  return {
    type: GET_ALL_STATE_REQUEST,
  };
};

const getAllStateSuccess = (response) => {
  return {
    type: GET_ALL_STATE_SUCCESS,
    payload: response,
  };
};

const getAllStateFail = () => {
  return {
    type: GET_ALL_STATE_FAIL,
  };
};

const getAllClinetDetailsRequest = () => {
  return {
    type: GET_ALL_CLIENT_DETAILS_REQUEST,
  };
};

const getAllClinetDetailsSuccess = (response) => {
  return {
    type: GET_ALL_CLIENT_DETAILS_SUCCESS,
    payload: response,
  };
};

const getAllClinetDetailsFail = () => {
  return {
    type: GET_ALL_CLIENT_DETAILS_FAIL,
  };
};

const getClientDetailsRequest = () => {
  return {
    type: GET_CLIENT_DETAILS_REQUEST,
  };
};

const getClientDetailsSuccess = (data) => {
  return {
    type: GET_CLIENT_DETAILS_SUCCESS,
    payload: data,
  };
};

const getClientDetailsFail = () => {
  return {
    type: GET_CLIENT_DETAILS_FAIL,
  };
};

const getLocationMasterDataRequest = () => {
  return {
    type: GET_LOCATION_MASTER_DATA_REQUEST,
  };
};

const getLocationMasterDataSuccess = (data) => {
  return {
    type: GET_LOCATION_MASTER_DATA_SUCCESS,
    payload: data,
  };
};

const getLocationMasterDataFail = () => {
  return {
    type: GET_LOCATION_MASTER_DATA_FAIL,
  };
};

const getOnsiteLocationRequest = () => {
  return {
    type: GET_ALL_ONSITE_OFFICE_LOCATION_REQUEST,
  };
};

const getOnsiteLocationSuccess = (response) => {
  return {
    type: GET_ALL_ONSITE_OFFICE_LOCATION_SUCCESS,
    payload: response,
  };
};

const getOnsiteLocationFail = () => {
  return {
    type: GET_ALL_ONSITE_OFFICE_LOCATION_FAIL,
  };
};

const getclientLocationRequest = () => {
  return {
    type: GET_ONSITE_OFFICE_LOCATION_REQUEST,
  };
};

const getClientLocationSuccess = (data) => {
  return {
    type: GET_ONSITE_OFFICE_LOCATION_SUCCESS,
    payload: data,
  };
};

const getClientLocationFail = () => {
  return {
    type: GET_ONSITE_OFFICE_LOCATION_FAIL,
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
    try {
      await makeRequest("POST", "api/skill/create", data);
      if (data.status === "INACTIVE") {
        toast.success("Skill has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("Skill has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("Skill added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateSkillData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/skill/create", data);
      toast.success("Skill has been Updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllSkillData = () => {
  return async (dispatch) => {
    dispatch(getAllSkilldataRequest());
    try {
      const response = await makeRequest("GET", "api/skill/getAll");
      dispatch(GetAllSkillDataSuccess(response));
    } catch (err) {
      dispatch(getAllSkillDataFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const DeleteSkillData = (data) => {
  return async () => {
    try {
      await makeRequest("DELETE", `api/skill/delete/${data}`);
      toast.success("Skill Is been Disabled  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateBandlData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/band/create", data);
      if (data.status === "INACTIVE") {
        toast.success("Band has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("Band has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("Band added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateBandlData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/band/create", data);
      toast.success("Band has been Updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllBandData = () => {
  return async (dispatch) => {
    dispatch(getAllBandRequest());
    try {
      const response = await makeRequest("GET", "api/band/getAll");
      dispatch(getAllBandSuccess(response));
    } catch (err) {
      dispatch(getAllBandFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetBand = (data) => {
  return async (dispatch) => {
    dispatch(getBandRequest());
    try {
      const response = await makeRequest("GET", `api/band/get/${data}`);
      dispatch(getBandSuccess(response));
    } catch (err) {
      dispatch(getBandFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const DeleteBandData = (data) => {
  return async () => {
    try {
      await makeRequest("DELETE", `api/band/delete/${data}`);
      toast.success("band Is been Disabled  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateDesignationData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/designation/create", data);
      if (data.status === "INACTIVE") {
        toast.success("Designation has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("Designation has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("Designation added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateDesignationData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/designation/create", data);
      toast.success("Designation has been updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllDesignationData = () => {
  return async (dispatch) => {
    dispatch(getAllDesignationRequest());
    try {
      const response = await makeRequest("GET", "api/designation/getAll");
      dispatch(getAllDesignationSuccess(response));
    } catch (err) {
      dispatch(getAllDesignationFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const DeleteDesignationData = (data) => {
  return async () => {
    try {
      await makeRequest("DELETE", `api/designation/delete/${data}`);
      toast.success("designation Is been Disabled  ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateOfficeLocationnData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/officeLocation/create", data);
      if (data.status === "INACTIVE") {
        toast.success("OfficeLocation has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("OfficeLocation has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("OfficeLocation added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateOfficeLocationnData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/officeLocation/create", data);
      toast.success("OfficeLocation has been Updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllOfficeLocationData = () => {
  return async (dispatch) => {
    dispatch(getAllOfficeLocationRequest());
    try {
      const response = await makeRequest("GET", "api/officeLocation/getAll");
      dispatch(getAllOfficeLocationSuccess(response));
    } catch (err) {
      dispatch(getAllOfficeLocationFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetOfficeLocation = (data) => {
  return async (dispatch) => {
    dispatch(getOfficeLocationRequest());
    try {
      const response = await makeRequest(
        "GET",
        `api/officeLocation/get/${data}`
      );
      dispatch(getOfficeLocationSuccess(response));
    } catch (err) {
      dispatch(getOfficeLocationFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateManageHoliday = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/holiday/create", data);
      if (data.status === "INACTIVE") {
        toast.success("Holiday has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("Holiday has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("Holiday added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateManageHoliday = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/holiday/create", data);
      toast.success("Holiday has been Updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllHolidays = () => {
  return async (dispatch) => {
    dispatch(getHolidayRequest());
    try {
      const response = await makeRequest("GET", "api/holiday/getAll");
      dispatch(getHolidaySuucess(response));
    } catch (err) {
      dispatch(getHolidayFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetHoliday = (data) => {
  return async (dispatch) => {
    dispatch(getHolidayByIdRequest());
    try {
      const response = await makeRequest("GET", `api/holiday/get/${data}`);
      dispatch(getHolidayByIdSuccess(response));
    } catch (err) {
      dispatch(getHolidayByIdFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateDomine = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/domain/create", data);
      if (data.status === "INACTIVE") {
        toast.success("Domain has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("Domain has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("Domain added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateDomine = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/domain/create", data);
      toast.success("Domain has been Update successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllDomines = () => {
  return async (dispatch) => {
    dispatch(getAllDomineRequest());
    try {
      const response = await makeRequest("GET", "api/domain/getAllDomains");
      dispatch(getAlldomineSuccess(response));
    } catch (err) {
      dispatch(getAllDomineFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateJobTypeData = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/jobType/create", data);
      if (data.status === "INACTIVE") {
        toast.success("JobType has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("JobType has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("JobType added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateJobType = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/jobType/create", data);
      toast.success("JobType has been Update successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllJobTypeData = () => {
  return async (dispatch) => {
    dispatch(GetAllJobTypeRequest());
    try {
      const response = await makeRequest("GET", "api/jobType/getAll");
      dispatch(GetAllJobTypeSuccess(response));
    } catch (err) {
      dispatch(GetAllJobTypeFail(err.response.data.errorMessage));
    }
  };
};

export const getAllCountry = (data) => {
  return async (dispatch) => {
    dispatch(getAllcountryRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/api/masterData/getAll",
        null,
        data
      );
      dispatch(getAllCountrySuccess(response));
    } catch (err) {
      dispatch(getAllCountryFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getAllState = (data) => {
  return async (dispatch) => {
    dispatch(getAllStateRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/api/masterData/getAll",
        null,
        data
      );

      dispatch(getAllStateSuccess(response));
    } catch (err) {
      dispatch(getAllStateFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateClinetDetails = (data) => {
  return async () => {
    const formData = new FormData();
    formData.append("file", data.file);
    for (const key in data) {
      if (key !== "file") {
        formData.append(key, data[key]);
      }
    }

    try {
      await addRequest("POST", "api/client/create", formData);
      if (data.status === "INACTIVE") {
        toast.success("client has been Disabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "ACTIVE") {
        toast.success("client has been Enabled successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success("client added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateClinetDetails = (data) => {
  return async () => {
    const formData = new FormData();
    formData.append("file", data.file);
    for (const key in data) {
      if (key !== "file") {
        formData.append(key, data[key]);
      }
    }
    try {
      await addRequest("POST", "api/client/create", formData);
      toast.success("client has been Update successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GatAllClinetDetails = () => {
  return async (dispatch) => {
    dispatch(getAllClinetDetailsRequest());
    try {
      const response = await makeRequest("GET", "api/client/getAll");
      dispatch(getAllClinetDetailsSuccess(response));
    } catch (err) {
      dispatch(getAllClinetDetailsFail());

      dispatch(GetAllJobTypeFail(err.response.data.errorMessage));
    }
  };
};

export const getClientDetails = (data) => {
  return async (dispatch) => {
    dispatch(getClientDetailsRequest());
    try {
      const response = await makeRequest("GET", `api/client/get/${data}`);
      dispatch(getClientDetailsSuccess(response));
    } catch (err) {
      dispatch(getClientDetailsFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getLoocations = () => {
  return async (dispatch) => {
    dispatch(getLocationMasterDataRequest());
    try {
      const response = await makeRequest("GET", "/api/masterData/getAll");
      dispatch(getLocationMasterDataSuccess(response));
    } catch (err) {
      dispatch(getLocationMasterDataFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const GetAllOnsiteOfficeLocation = () => {
  return async (dispatch) => {
    dispatch(getOnsiteLocationRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/clientOnsiteOfficeLocation/getAll"
      );
      dispatch(getOnsiteLocationSuccess(response));
    } catch (err) {
      dispatch(getOnsiteLocationFail());

      dispatch(GetAllJobTypeFail(err.response.data.errorMessage));
    }
  };
};

export const CreateOnsiteOfficeLocation = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/clientOnsiteOfficeLocation/create", data);
      if (data.status === "INACTIVE") {
        toast.success(
          "clientOnsiteOfficeLocation has been Disabled successfully",
          {
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
      } else if (data.status === "ACTIVE") {
        toast.success(
          "clientOnsiteOfficeLocation has been Enabled successfully",
          {
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
      } else {
        toast.success("clientOnsiteOfficeLocation added successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getClientLocation = (data) => {
  return async (dispatch) => {
    dispatch(getclientLocationRequest());
    try {
      const response = await makeRequest(
        "GET",
        `api/clientOnsiteOfficeLocation/get/${data}`
      );
      dispatch(getClientLocationSuccess(response));
    } catch (err) {
      dispatch(getClientLocationFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const UpdateOnsiteOfficeLocation = (data) => {
  return async () => {
    try {
      await makeRequest("POST", "api/clientOnsiteOfficeLocation/create", data);
      toast.success(
        "clientOnsiteOfficeLocation has been Updated successfully",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
