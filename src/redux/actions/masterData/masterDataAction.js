import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
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
  ADD_NEW_SKILL_REQUEST,
  ADD_NEW_SKILL_SUCCESS,
  ADD_NEW_SKILL_FAIL,
  ADD_NEW_DESIGNATION_REQUEST,
  ADD_NEW_DESIGNATION_SUCCESS,
  ADD_NEW_DESIGNATION_FAIL,
  ADD_NEW_BAND_REQUEST,
  ADD_NEW_BAND_SUCCESS,
  ADD_NEW_BAND_FAIL,
  ADD_NEW_OFFICELOCATION_REQUEST,
  ADD_NEW_OFFICELOCATION_SUCCESS,
  ADD_NEW_OFFICELOCATION_FAIL,
  ADD_NEW_JOBTYPE_REQUEST,
  ADD_NEW_JOBTYPE_SUCCESS,
  ADD_NEW_JOBTYPE_FAIL,
  ADD_NEW_HOLIDAY_REQUEST,
  ADD_NEW_HOLIDAY_SUCCESS,
  ADD_NEW_HOLIDAY_FAIL,
  ADD_NEW_DOMINE_REQUEST,
  ADD_NEW_DOMINE_SUCCESS,
  ADD_NEW_DOMINE_FAIL,
  ADD_NEW_CLIENT_DETAILS_REQUEST,
  ADD_NEW_CLIENT_DETAILS_SUCCESS,
  ADD_NEW_CLIENT_DETAILS_FAIL,
  ADD_NEW_ONSITE_OFFICE_LOCATION_REQUEST,
  ADD_NEW_ONSITE_OFFICE_LOCATION_SUCCESS,
  ADD_NEW_ONSITE_OFFICE_LOCATION_FAIL,
} from "./masterDataActionType";

// Action creators
const masterDataRequest = () => ({ type: MASTER_DATA_REQUEST });
const masterDataSuccess = (response) => ({
  type: MASTER_DATA_SUCCESS,
  payload: response,
});
const masterDataFail = () => ({ type: MASTER_DATA_FAIL });

const getAllSkillRequest = () => ({ type: GET_ALL_SKILL_REQUEST });
const getAllSkillSuccess = (response) => ({
  type: GET_ALL_SKILL_SUCCESS,
  payload: response,
});
const getAllSkillFail = () => ({ type: GET_ALL_SKILL_FAIL });

const getAllDesignationRequest = () => ({ type: GET_ALL_DESIGNATION_REQUEST });
const getAllDesignationSuccess = (response) => ({
  type: GET_ALL_DESIGNATION_SUCCESS,
  payload: response,
});
const getAllDesignationFail = () => ({ type: GET_ALL_DESIGNATION_FAIL });

const getAllBandRequest = () => ({ type: GET_ALL_BAND_REQUEST });
const getAllBandSuccess = (response) => ({
  type: GET_ALL_BAND_SUCCESS,
  payload: response,
});
const getAllBandFail = () => ({ type: GET_ALL_BAND_FAIL });

const getAllJobTypeRequest = () => ({ type: GET_ALL_JOBTYPE_REQUEST });
const getAllJobTypeSuccess = (response) => ({
  type: GET_ALL_JOBTYPE_SUCCESS,
  payload: response,
});
const getAllJobTypeFail = () => ({ type: GET_ALL_JOBTYPE_FAIL });

const getAllDomainRequest = () => ({ type: GET_ALL_DOMINE_REQUEST });
const getAllDomainSuccess = (response) => ({
  type: GET_ALL_DOMINE_SUCCESS,
  payload: response,
});
const getAllDomainFail = () => ({ type: GET_ALL_DOMINE_FAIL });

const getAllOfficeLocationRequest = () => ({
  type: GET_ALL_OFFICELOCAION_REQUEST,
});
const getAllOfficeLocationSuccess = (response) => ({
  type: GET_ALL_OFFICELOCAION_SUCCESS,
  payload: response,
});
const getAllOfficeLocationFail = () => ({ type: GET_ALL_OFFICELOCAION_FAIL });

const getAllHolidayRequest = () => ({ type: GET_ALL_HOLIDAYS_REQUEST });
const getAllHolidaySuccess = (response) => ({
  type: GET_ALL_HOLIDAYS_SUCCESS,
  payload: response,
});
const getAllHolidayFail = () => ({ type: GET_ALL_HOLIDAYS_FAIL });

const getAllClientDetailsRequest = () => ({
  type: GET_ALL_CLIENT_DETAILS_REQUEST,
});
const getAllClientDetailsSuccess = (response) => ({
  type: GET_ALL_CLIENT_DETAILS_SUCCESS,
  payload: response,
});
const getAllClientDetailsFail = () => ({ type: GET_ALL_CLIENT_DETAILS_FAIL });

const addNewSkillRequest = () => ({ type: ADD_NEW_SKILL_REQUEST });
const addNewSkillSuccess = (response) => ({
  type: ADD_NEW_SKILL_SUCCESS,
  payload: response,
});
const addNewSkillFail = () => ({ type: ADD_NEW_SKILL_FAIL });

const addNewDesignationRequest = () => ({ type: ADD_NEW_DESIGNATION_REQUEST });
const addNewDesignationSuccess = (response) => ({
  type: ADD_NEW_DESIGNATION_SUCCESS,
  payload: response,
});
const addNewDesignationFail = () => ({ type: ADD_NEW_DESIGNATION_FAIL });

const addNewBandRequest = () => ({ type: ADD_NEW_BAND_REQUEST });
const addNewBandSuccess = (response) => ({
  type: ADD_NEW_BAND_SUCCESS,
  payload: response,
});
const addNewBandFail = () => ({ type: ADD_NEW_BAND_FAIL });

const addNewJobTypeRequest = () => ({ type: ADD_NEW_JOBTYPE_REQUEST });
const addNewJobTypeSuccess = (response) => ({
  type: ADD_NEW_JOBTYPE_SUCCESS,
  payload: response,
});
const addNewJobTypeFail = () => ({ type: ADD_NEW_JOBTYPE_FAIL });

const addNewDomainRequest = () => ({ type: ADD_NEW_DOMINE_REQUEST });
const addNewDomainSuccess = (response) => ({
  type: ADD_NEW_DOMINE_SUCCESS,
  payload: response,
});
const addNewDomainFail = () => ({ type: ADD_NEW_DOMINE_FAIL });

const addNewHolidayRequest = () => ({ type: ADD_NEW_HOLIDAY_REQUEST });
const addNewHolidaySuccess = (response) => ({
  type: ADD_NEW_HOLIDAY_SUCCESS,
  payload: response,
});
const addNewHolidayFail = () => ({ type: ADD_NEW_HOLIDAY_FAIL });

const addNewOfficeLocationRequest = () => ({
  type: ADD_NEW_OFFICELOCATION_REQUEST,
});
const addNewOfficeLocationSuccess = (response) => ({
  type: ADD_NEW_OFFICELOCATION_SUCCESS,
  payload: response,
});
const addNewOfficeLocationFail = () => ({ type: ADD_NEW_OFFICELOCATION_FAIL });

const addNewClientDetailsRequest = () => ({
  type: ADD_NEW_CLIENT_DETAILS_REQUEST,
});
const addNewClientDetailsSuccess = (response) => ({
  type: ADD_NEW_CLIENT_DETAILS_SUCCESS,
  payload: response,
});
const addNewClientDetailsFail = () => ({ type: ADD_NEW_CLIENT_DETAILS_FAIL });

// Helpers
async function fetchMasterTable(table) {
  const res = await makeRequest("GET", `/api/masterData/${table}`);
  return res || [];
}

async function createMasterItem(table, data) {
  return await makeRequest("POST", `/api/masterData/${table}`, data);
}

async function deleteMasterItem(table, id) {
  return await makeRequest("DELETE", `/api/masterData/${table}/${id}`);
}

async function updateMasterItem(table, id, data) {
  return await makeRequest("PUT", `/api/masterData/${table}/${id}`, data);
}

async function getMasterItem(table, id) {
  return await makeRequest("GET", `/api/masterData/${table}/${id}`);
}

// Get all master data at once
export const masterDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(masterDataRequest());
      const [
        skills,
        bands,
        designations,
        jobTypes,
        domains,
        officeLocations,
        holidays,
        clients,
      ] = await Promise.all([
        fetchMasterTable("skills"),
        fetchMasterTable("bands"),
        fetchMasterTable("designations"),
        fetchMasterTable("job_types"),
        fetchMasterTable("domains"),
        fetchMasterTable("office_locations"),
        fetchMasterTable("holidays"),
        fetchMasterTable("clients"),
      ]);

      dispatch(
        masterDataSuccess({
          skill: skills,
          band: bands,
          designation: designations,
          jobType: jobTypes,
          domain: domains,
          officeLocation: officeLocations,
          holiday: holidays,
          client: clients,
        }),
      );
    } catch (err) {
      dispatch(masterDataFail());
      dispatch(errorMessage(err.message));
    }
  };
};

// Create Skill
export const CreateSkillData = (data, handleCloseDialog) => {
  return async (dispatch) => {
    dispatch(addNewSkillRequest());
    try {
      const skillData = {
        skill_name: data.skillName || data.skill_name,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("skills", skillData);
      if (data.status === "INACTIVE") {
        toast.success("Skill has been Disabled successfully");
      } else if (data.status === "ACTIVE") {
        toast.success("Skill has been Enabled successfully");
      } else {
        toast.success("Skill added successfully");
      }
      dispatch(addNewSkillSuccess(response));
      if (handleCloseDialog) handleCloseDialog();
      dispatch(GetAllSkillData());
    } catch (err) {
      dispatch(addNewSkillFail());
      toast.error(err.message);
    }
  };
};

// Create Band
export const CreateBandlData = (data) => {
  return async (dispatch) => {
    dispatch(addNewBandRequest());
    try {
      const bandData = {
        band_name: data.bandName || data.band_name,
        minimum_ctc: data.minimumCtc,
        maximum_ctc: data.maximumCtc,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("bands", bandData);
      if (data.status === "INACTIVE") {
        toast.success("Band has been Disabled successfully");
      } else if (data.status === "ACTIVE") {
        toast.success("Band has been Enabled successfully");
      } else {
        toast.success("Band added successfully");
      }
      dispatch(addNewBandSuccess(response));
      dispatch(GetAllBandData());
    } catch (err) {
      dispatch(addNewBandFail());
      toast.error(err.message);
    }
  };
};

// Create Designation
export const CreateDesignationData = (data, handleCloseDialog) => {
  return async (dispatch) => {
    dispatch(addNewDesignationRequest());
    try {
      const designationData = {
        designation_name: data.designationName || data.designation_name,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("designations", designationData);
      toast.success("Designation added successfully");
      dispatch(addNewDesignationSuccess(response));
    } catch (err) {
      dispatch(addNewDesignationFail());
      toast.error(err.message);
    }
  };
};

// Create Job Type
export const CreateJobTypeData = (data, handleCloseDialog) => {
  return async (dispatch) => {
    dispatch(addNewJobTypeRequest());
    try {
      const jobTypeData = {
        job_type_name: data.jobTypeName || data.jobType || data.job_type_name,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("job_types", jobTypeData);
      toast.success("Job Type added successfully");
      dispatch(addNewJobTypeSuccess(response));
      if (handleCloseDialog) handleCloseDialog();
      dispatch(GetAllJobTypeData());
    } catch (err) {
      dispatch(addNewJobTypeFail());
      toast.error(err.message);
    }
  };
};

// Create Domain
export const CreateDomainData = (data) => {
  return async (dispatch) => {
    dispatch(addNewDomainRequest());
    try {
      const domainData = {
        domain_name: data.domainName || data.domain_name,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("domains", domainData);
      toast.success("Domain added successfully");
      dispatch(addNewDomainSuccess(response));
    } catch (err) {
      dispatch(addNewDomainFail());
      toast.error(err.message);
    }
  };
};

// Create Holiday
export const CreateHolidayData = (data) => {
  return async (dispatch) => {
    dispatch(addNewHolidayRequest());
    try {
      const holidayData = {
        holiday_name: data.holidayName || data.holiday_name,
        holiday_date: data.holidayDate || data.holiday_date,
        is_optional: data.isOptional || data.is_optional || false,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("holidays", holidayData);
      toast.success("Holiday added successfully");
      dispatch(addNewHolidaySuccess(response));
    } catch (err) {
      dispatch(addNewHolidayFail());
      toast.error(err.message);
    }
  };
};

// Create Office Location
export const CreateOfficeLocationData = (data) => {
  return async (dispatch) => {
    dispatch(addNewOfficeLocationRequest());
    try {
      const locationData = {
        office_location_name:
          data.officeLocationName || data.office_location_name,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("office_locations", locationData);
      toast.success("Office Location added successfully");
      dispatch(addNewOfficeLocationSuccess(response));
    } catch (err) {
      dispatch(addNewOfficeLocationFail());
      toast.error(err.message);
    }
  };
};

// Create Client
export const CreateClientData = (data) => {
  return async (dispatch) => {
    dispatch(addNewClientDetailsRequest());
    try {
      const clientData = {
        client_name: data.clientName || data.client_name,
        client_code: data.clientCode || data.client_code,
        contact_person: data.contactPerson || data.contact_person,
        contact_email: data.contactEmail || data.contact_email,
        contact_phone: data.contactPhone || data.contact_phone,
        address: data.address,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("clients", clientData);
      toast.success("Client added successfully");
      dispatch(addNewClientDetailsSuccess(response));
    } catch (err) {
      dispatch(addNewClientDetailsFail());
      toast.error(err.message);
    }
  };
};

// Get all skills
export const GetAllSkillData = () => {
  return async (dispatch) => {
    dispatch(getAllSkillRequest());
    try {
      const data = await fetchMasterTable("skills");
      dispatch(getAllSkillSuccess(data));
    } catch (err) {
      dispatch(getAllSkillFail());
    }
  };
};

// Get all designations
export const GetAllDesignationData = () => {
  return async (dispatch) => {
    dispatch(getAllDesignationRequest());
    try {
      const data = await fetchMasterTable("designations");
      dispatch(getAllDesignationSuccess(data));
    } catch (err) {
      dispatch(getAllDesignationFail());
    }
  };
};

// Get all bands
export const GetAllBandData = () => {
  return async (dispatch) => {
    dispatch(getAllBandRequest());
    try {
      const data = await fetchMasterTable("bands");
      dispatch(getAllBandSuccess(data));
    } catch (err) {
      dispatch(getAllBandFail());
    }
  };
};

// Get all holidays
export const GetAllHolidayData = () => {
  return async (dispatch) => {
    dispatch(getAllHolidayRequest());
    try {
      const data = await fetchMasterTable("holidays");
      dispatch(getAllHolidaySuccess(data));
    } catch (err) {
      dispatch(getAllHolidayFail());
    }
  };
};

// Get all office locations
export const GetAllOfficeLocationData = () => {
  return async (dispatch) => {
    dispatch(getAllOfficeLocationRequest());
    try {
      const data = await fetchMasterTable("office_locations");
      dispatch(getAllOfficeLocationSuccess(data));
    } catch (err) {
      dispatch(getAllOfficeLocationFail());
    }
  };
};

// Get all clients
export const GetAllClientData = () => {
  return async (dispatch) => {
    dispatch(getAllClientDetailsRequest());
    try {
      const data = await fetchMasterTable("clients");
      dispatch(getAllClientDetailsSuccess(data));
    } catch (err) {
      dispatch(getAllClientDetailsFail());
    }
  };
};

// Delete helpers
const deleteWithToast = (table, id, successMsg) => async (dispatch) => {
  try {
    await deleteMasterItem(table, id);
    toast.success(successMsg);
  } catch (err) {
    toast.error(err.message);
  }
};

export const deleteSkill = (id) =>
  deleteWithToast("skills", id, "Skill deleted successfully");
export const deleteBand = (id) =>
  deleteWithToast("bands", id, "Band deleted successfully");
export const deleteDesignation = (id) =>
  deleteWithToast("designations", id, "Designation deleted successfully");
export const deleteHoliday = (id) =>
  deleteWithToast("holidays", id, "Holiday deleted successfully");
export const deleteClient = (id) =>
  deleteWithToast("clients", id, "Client deleted successfully");
export const deleteOfficeLocation = (id) =>
  deleteWithToast(
    "office_locations",
    id,
    "Office Location deleted successfully",
  );

// Get single items
export const GetBand = (id) => async () => {
  try {
    return await getMasterItem("bands", id);
  } catch {
    return null;
  }
};

export const GetHoliday = (id) => async () => {
  try {
    return await getMasterItem("holidays", id);
  } catch {
    return null;
  }
};

export const GetOfficeLocation = (id) => async () => {
  try {
    return await getMasterItem("office_locations", id);
  } catch {
    return null;
  }
};

// Get All Job Types
export const GetAllJobTypeData = () => {
  return async (dispatch) => {
    dispatch(getAllJobTypeRequest());
    try {
      const data = await fetchMasterTable("job_types");
      dispatch(getAllJobTypeSuccess(data));
    } catch (err) {
      dispatch(getAllJobTypeFail());
    }
  };
};

// Get All Holidays (alias)
export const GetAllHolidays = () => {
  return async (dispatch) => {
    dispatch(getAllHolidayRequest());
    try {
      const data = await fetchMasterTable("holidays");
      dispatch(getAllHolidaySuccess(data));
    } catch (err) {
      dispatch(getAllHolidayFail());
    }
  };
};

// Get All Domains
export const GetAllDomines = () => {
  return async (dispatch) => {
    dispatch(getAllDomainRequest());
    try {
      const data = await fetchMasterTable("domains");
      dispatch(getAllDomainSuccess(data));
    } catch (err) {
      dispatch(getAllDomainFail());
    }
  };
};

// Get All Onsite Office Location
export const GetAllOnsiteOfficeLocation = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_ONSITE_OFFICE_LOCATION_REQUEST });
    try {
      const data = await fetchMasterTable("client_onsite_locations");
      dispatch({ type: GET_ALL_ONSITE_OFFICE_LOCATION_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_ALL_ONSITE_OFFICE_LOCATION_FAIL });
    }
  };
};

// Create Holiday (alias)
export const CreateManageHoliday = (data) => {
  return async (dispatch) => {
    dispatch(addNewHolidayRequest());
    try {
      const holidayData = {
        holiday_name: data.holidayName || data.holiday_name,
        holiday_date: data.holidayDate || data.holiday_date,
        is_optional: data.isOptional || false,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("holidays", holidayData);
      toast.success("Holiday added successfully");
      dispatch(addNewHolidaySuccess(response));
      dispatch(GetAllHolidays());
    } catch (err) {
      dispatch(addNewHolidayFail());
      toast.error(err.message);
    }
  };
};

// Create Office Location (alias)
export const CreateOfficeLocationnData = (data) => {
  return async (dispatch) => {
    dispatch(addNewOfficeLocationRequest());
    try {
      const locationData = {
        office_location_name:
          data.officeLocationName || data.office_location_name,
        address: data.address?.addressLine1 || data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("office_locations", locationData);
      toast.success("Office Location added successfully");
      dispatch(addNewOfficeLocationSuccess(response));
      dispatch(GetAllOfficeLocationData());
    } catch (err) {
      dispatch(addNewOfficeLocationFail());
      toast.error(err.message);
    }
  };
};

// Create Domain (alias)
export const CreateDomine = (data) => {
  return async (dispatch) => {
    dispatch(addNewDomainRequest());
    try {
      const domainData = {
        domain_name: data.domainName || data.domain_name,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("domains", domainData);
      toast.success("Domain added successfully");
      dispatch(addNewDomainSuccess(response));
      dispatch(GetAllDomines());
    } catch (err) {
      dispatch(addNewDomainFail());
      toast.error(err.message);
    }
  };
};

// Create Client (alias)
export const CreateClinetDetails = (data) => {
  return async (dispatch) => {
    dispatch(addNewClientDetailsRequest());
    try {
      const clientData = {
        client_name: data.clientName,
        client_code: data.clientCode,
        contact_person: data.contactPerson,
        contact_email: data.contactEmail,
        contact_phone: data.phone,
        address: data.address,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem("clients", clientData);
      toast.success("Client added successfully");
      dispatch(addNewClientDetailsSuccess(response));
      dispatch(GetAllClientData());
    } catch (err) {
      dispatch(addNewClientDetailsFail());
      toast.error(err.message);
    }
  };
};

// Country, State, City functions
export const getAllCountry = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_COUNTRY_REQUEST });
    try {
      const data = await fetchMasterTable("countries");
      dispatch({ type: GET_ALL_COUNTRY_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_ALL_COUNTRY_FAIL });
    }
  };
};

export const getAllState = (country) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_STATE_REQUEST });
    try {
      const data = await makeRequest(
        "GET",
        `/api/masterData/states?country=${encodeURIComponent(country)}`,
      );
      dispatch({ type: GET_ALL_STATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_ALL_STATE_FAIL });
    }
  };
};

// Placeholder update functions (kept for import compatibility)
export const UpdateSkillData = () => async () => {};
export const UpdateBandlData = () => async () => {};
export const UpdateDesignationData = () => async () => {};
export const UpdateJobType = () => async () => {};
export const UpdateDomine = () => async () => {};
export const UpdateManageHoliday = () => async () => {};
export const UpdateOfficeLocationnData = () => async () => {};

// Create Onsite Office Location
export const CreateOnsiteOfficeLocation = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NEW_ONSITE_OFFICE_LOCATION_REQUEST });
    try {
      const locationData = {
        client_id: data.clientId,
        location_name: data.locationName || data.onsiteLocationName,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        status: data.status || "ACTIVE",
      };
      const response = await createMasterItem(
        "client_onsite_locations",
        locationData,
      );
      toast.success("Onsite Location added successfully");
      dispatch({
        type: ADD_NEW_ONSITE_OFFICE_LOCATION_SUCCESS,
        payload: response,
      });
      dispatch(GetAllOnsiteOfficeLocation());
    } catch (err) {
      dispatch({ type: ADD_NEW_ONSITE_OFFICE_LOCATION_FAIL });
      toast.error(err.message);
    }
  };
};

// Get All Client Details
export const GetAllClientDetails = () => {
  return async (dispatch) => {
    dispatch(getAllClientDetailsRequest());
    try {
      const data = await fetchMasterTable("clients");
      dispatch(getAllClientDetailsSuccess(data));
    } catch (err) {
      dispatch(getAllClientDetailsFail());
    }
  };
};

// Get Client Details
export const getClientDetails = (id) => {
  return async (dispatch) => {
    try {
      const data = await getMasterItem("clients", id);
      return data;
    } catch {
      return null;
    }
  };
};

// Get Locations (all office locations)
export const getLoocations = () => {
  return async (dispatch) => {
    dispatch(getAllOfficeLocationRequest());
    try {
      const data = await fetchMasterTable("office_locations");
      dispatch(getAllOfficeLocationSuccess(data));
    } catch (err) {
      dispatch(getAllOfficeLocationFail());
    }
  };
};

// Get Client Location (onsite locations for a client)
export const getClientLocation = (clientId) => {
  return async (dispatch) => {
    dispatch({ type: GET_ONSITE_OFFICE_LOCATION_REQUEST });
    try {
      const data = await makeRequest(
        "GET",
        `/api/masterData/client_onsite_locations?client_id=${clientId}`,
      );
      dispatch({ type: GET_ONSITE_OFFICE_LOCATION_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_ONSITE_OFFICE_LOCATION_FAIL });
    }
  };
};

// Update Client
export const UpdateClinetDetails = (data) => {
  return async (dispatch) => {
    dispatch(addNewClientDetailsRequest());
    try {
      const clientData = {
        client_name: data.clientName,
        client_code: data.clientCode,
        contact_person: data.contactPerson,
        contact_email: data.contactEmail,
        contact_phone: data.phone,
        address: data.address,
        status: data.status || "ACTIVE",
      };
      const response = await updateMasterItem("clients", data.id, clientData);
      toast.success("Client updated successfully");
      dispatch(addNewClientDetailsSuccess(response));
      dispatch(GetAllClientDetails());
    } catch (err) {
      dispatch(addNewClientDetailsFail());
      toast.error(err.message);
    }
  };
};

// Update Onsite Office Location
export const UpdateOnsiteOfficeLocation = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NEW_ONSITE_OFFICE_LOCATION_REQUEST });
    try {
      const locationData = {
        client_id: data.clientId,
        location_name: data.locationName,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        status: data.status || "ACTIVE",
      };
      const response = await updateMasterItem(
        "client_onsite_locations",
        data.id,
        locationData,
      );
      toast.success("Onsite Location updated successfully");
      dispatch({
        type: ADD_NEW_ONSITE_OFFICE_LOCATION_SUCCESS,
        payload: response,
      });
      dispatch(GetAllOnsiteOfficeLocation());
    } catch (err) {
      dispatch({ type: ADD_NEW_ONSITE_OFFICE_LOCATION_FAIL });
      toast.error(err.message);
    }
  };
};
