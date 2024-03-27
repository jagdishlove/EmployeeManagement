import { toast } from "react-toastify";
import makeRequest, { addRequest } from "../../../../api/api";
import { errorMessage } from "../../errors/errorsAction";
import {
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  SEARCH_EMPLOYEE_REQUEST,
  SEARCH_EMPLOYEE_SUCCESS,
  SEARCH_EMPLOYEE_FAIL,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
  FETCH_LOCATION_DATA_SUCCESS,
  SET_SELECTED_COUNTRY_ID,
  GET_ALL_CITYS,
  SEARCH_EMPLOYEEANDPROJECT_FAILURE,
  SEARCH_EMPLOYEEANDPROJECT_REQUEST,
  SEARCH_EMPLOYEEANDPROJECT_SUCCESS,
  SAVE_SKILLS_REQUEST,
  SAVE_SKILLS_FAILURE,
  SAVE_SKILLS_SUCCESS,
} from "./usersActionTypes";
import { getRefreshToken } from "../../login/loginAction";

//Save Skills
const saveSkillsSuccess = (data) => ({
  type: SAVE_SKILLS_SUCCESS,
  payload: data,
});
const saveSkillsRequest = () => ({
  type: SAVE_SKILLS_REQUEST,
});
const saveSkillsFailure = () => ({
  type: SAVE_SKILLS_FAILURE,
});

//country state city
export const fetchCountriesRequest = () => ({
  type: FETCH_COUNTRIES_REQUEST,
});

export const fetchCountriesSuccess = (countries) => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

export const fetchCountriesFailure = () => ({
  type: FETCH_COUNTRIES_FAILURE,
});

export const fetchStatesRequest = () => ({
  type: FETCH_STATES_REQUEST,
});

export const fetchStatesSuccess = (states) => ({
  type: FETCH_STATES_SUCCESS,
  payload: states,
});

export const fetchStatesFailure = () => ({
  type: FETCH_STATES_FAILURE,
});

export const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST,
});

export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities,
});

export const fetchCitiesFailure = () => ({
  type: FETCH_CITIES_FAILURE,
});
//location id

export const fetchLocationDataSuccess = (locationData) => ({
  type: FETCH_LOCATION_DATA_SUCCESS,
  payload: locationData,
});

export const setSelectedCountryId = (countryId) => ({
  type: SET_SELECTED_COUNTRY_ID,
  payload: countryId,
});

const SearchEmployeeRequest = () => {
  return {
    type: SEARCH_EMPLOYEE_REQUEST,
  };
};

const SearchEmployeeSuccess = (response) => {
  return {
    type: SEARCH_EMPLOYEE_SUCCESS,
    payload: response,
  };
};

const SearchEmployeeFail = () => {
  return {
    type: SEARCH_EMPLOYEE_FAIL,
  };
};

const getAllUsersRequest = () => {
  return {
    type: FETCH_ALL_USERS_REQUEST,
  };
};

const getAllUsersSuccess = (data) => {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    payload: data,
  };
};

const getAllUsersFailure = () => {
  return {
    type: FETCH_ALL_USERS_FAILURE,
  };
};

const getUserByIdRequest = () => {
  return {
    type: GET_USER_BY_ID_REQUEST,
  };
};

const getUserByIdSuccess = (data) => {
  return {
    type: GET_USER_BY_ID_SUCCESS,
    payload: data,
  };
};

const getUserByIdFailure = () => {
  return {
    type: GET_USER_BY_ID_FAILURE,
  };
};

const createUserRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};
const createUserSuccess = (data) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: data,
  };
};
export const createUserFail = (error) => {
  return {
    type: CREATE_USER_FAIL,
    payload: error,
  };
};

const getAllCitys = (data) => {
  return {
    type: GET_ALL_CITYS,
    payload: data,
  };
};
const searchEmployeeAndProjectRequest = () => {
  return {
    type: SEARCH_EMPLOYEEANDPROJECT_REQUEST,
  };
};

const searchEmployeeAndProjectSuccess = (data) => {
  return {
    type: SEARCH_EMPLOYEEANDPROJECT_SUCCESS,
    payload: data,
  };
};

const searchEmployeeAndProjectFail = () => {
  return {
    type: SEARCH_EMPLOYEEANDPROJECT_FAILURE,
  };
};

export const getAllUsers = (data, request) => {
  return async (dispatch) => {
    dispatch(getAllUsersRequest());
    try {
      const response = await makeRequest(
        "POST",
        "/employee/getAll",
        {
          result: request ? [request] : [],
        },
        data
      );
      dispatch(getAllUsersSuccess(response));
    } catch (err) {
      dispatch(getAllUsersFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getUserById = (data) => {
  return async (dispatch) => {
    dispatch(getUserByIdRequest());
    try {
      const response = await makeRequest("GET", `/employee/getById/${data}`);
      dispatch(getUserByIdSuccess(response));
    } catch (err) {
      dispatch(getUserByIdFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const CreateUserForm = (data, setIsNaviget) => {
  return async (dispatch) => {
    let formData = new FormData();
    formData.append("file", data.file);

    for (const key in data) {
      if (key !== "file") {
        formData.append(key, data[key]);
      }
    }
    try {
      dispatch(createUserRequest());
      const response = await addRequest("POST", "/employee/create", formData);
      dispatch(createUserSuccess(response));
      toast.success("Create User is  Successfully.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsNaviget(true);
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 403
      ) {
        dispatch(getRefreshToken());
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 400
      ) {
        dispatch(createUserFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const EditUserForm = (data, setIsNaviget) => {
  return async (dispatch) => {
    let formData = new FormData();
    formData.append("file", data.file);

    for (const key in data) {
      if (key !== "file") {
        formData.append(key, data[key]);
      }
    }
    dispatch(createUserRequest());

    try {
      const response = await addRequest("POST", "/employee/create", formData);
      dispatch(createUserSuccess(response));

      toast.success("User Updated  Successfully.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsNaviget(true);
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 403
      ) {
        dispatch(getRefreshToken());
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 400
      ) {
        dispatch(createUserFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const SearchEmployeeAction = (searchQuery) => {
  return async (dispatch) => {
    try {
      dispatch(SearchEmployeeRequest());
      const response = await makeRequest(
        "GET",
        `api/projects/employees/search?empSearch=${searchQuery}`,
        null
      );
      dispatch(SearchEmployeeSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(SearchEmployeeFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const fetchCountriesAction = async (setCountries) => {
  try {
    const response = await makeRequest(
      "GET",
      "/api/masterData/getAll?dataType=country"
    );
    const formattedCountries = response.map((country) => ({
      id: country.id,
      label: country.dataValue,
      value: country,
    }));
    setCountries(formattedCountries);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const fetchStatesAction = async (countryId, setStates) => {
  try {
    const response = await makeRequest(
      "GET",
      `/api/masterData/getAll?parentId=${countryId}&dataType=state`
    );
    const formattedStates = response.map((state) => ({
      id: state.id,
      label: state.dataValue,
      value: state,
    }));
    setStates(formattedStates);
  } catch (error) {
    console.error("Error fetching states:", error);
  }
};

export const fetchCitiesAction = async (stateId, setCities) => {
  try {
    const response = await makeRequest(
      "GET",
      `/api/masterData/getAll?parentId=${stateId}&dataType=city`
    );
    const formattedCities = response.map((city) => ({
      id: city.id,
      label: city.dataValue,
      value: city,
    }));
    setCities(formattedCities);
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};

export const fetchLocationData = () => {
  return async (dispatch) => {
    try {
      const response = await makeRequest("GET", `api/masterData/getAll`);
      dispatch(fetchLocationDataSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const GetAllCitys = (data) => {
  return async (dispatch) => {
    try {
      const response = await makeRequest(
        "GET",
        "/api/masterData/getAll",
        null,
        data
      );
      dispatch(getAllCitys(response));
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const SearchEmployeeAndProject = (data) => {
  return async (dispatch) => {
    dispatch(searchEmployeeAndProjectRequest());
    try {
      const response = await makeRequest(
        "GET",
        "/employee/searchByemployeeAndProjectName",
        null,
        {
          searchTerm: data || "",
        }
      );
      dispatch(searchEmployeeAndProjectSuccess(response));
    } catch (err) {
      dispatch(searchEmployeeAndProjectFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
export const saveSkills = (data) => {
  return async (dispatch) => {
    try {
      dispatch(saveSkillsRequest());
      const response = await makeRequest(
        "POST",
        "employee/addAndUpdateSkills",
        data,
        null
      );
      dispatch(saveSkillsSuccess(response));
      toast.success("Skill updated successfully.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 403
      ) {
        dispatch(getRefreshToken());
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 500
      ) {
        dispatch(saveSkillsFailure(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const getAllCitysAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await makeRequest(
        "GET",
        "/api/masterData/getAll",
        null,
        data
      );
      dispatch(getAllCitys(response));
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
