import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_FAILURE,
    FETCH_ALL_USERS_SUCCESS,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_SUCCESS
} from '../../actions/AdminConsoleAction/users/usersActionTypes'

import {
    GET_ALL_SKILL_SUCCESS,
    GET_ALL_DESIGNATION_SUCCESS,
    GET_ALL_BAND_SUCCESS,
    GET_ALL_OFFICELOCAION_SUCCESS,
    GET_OFFICE_LOCATION_SUCCESS,
    GET_BAND_BY_ID_SUCCESS,
    GET_ALL_HOLIDAYS_SUCCESS,
    GET_ALL_JOBTYPE_SUCCESS,
    GET_ALL_JOBTYPE_REQUEST,
    GET_ALL_JOBTYPE_FAIL,
    GET_HOLIDAY_BY_ID_SUCCESS,
    GET_ALL_DOMINE_SUCCESS,
} from '../../actions/masterData/masterDataActionType'


const initialState = {
    usersData: [],
    usersDataLoading: false,
    userByIdData : {},
    skillData : [],
    jobTypeData:[],
    designationData: [],
    bandData: [],
    holidayData: [],
    officeLocationData : [],
    officeLocation : {},
    bandValue : {},
    holiday : {},
    domineData : [],
  };

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
     case FETCH_ALL_USERS_REQUEST:
        return {
          ...state,
          usersDataLoading: true,
        };
     case FETCH_ALL_USERS_SUCCESS:
      
        return {
            ...state,
            usersData: action.payload,
            usersDataLoading: false,
        };
     case FETCH_ALL_USERS_FAILURE:
        return{
            ...state,
            usersData: [],
            usersDataLoading: false,
        }
     case GET_USER_BY_ID_REQUEST : 
        return {
            ...state
        };
     case GET_USER_BY_ID_SUCCESS : 
        return {
            ...state,
            userByIdData: action.payload,
        };
     case GET_USER_BY_ID_FAILURE : 
        return {
            ...state
        }
     case GET_ALL_SKILL_SUCCESS :
        return {
            ...state,
            skillData: action.payload
        }
      case GET_ALL_JOBTYPE_SUCCESS:
         return{
            ...state,
            jobTypeData: action.payload
         }
      case GET_ALL_JOBTYPE_REQUEST:
         return{
            ...state
         }
      case GET_ALL_JOBTYPE_FAIL:
         return{
            ...state
         }
     case GET_ALL_DESIGNATION_SUCCESS :
        return {
            ...state,
            designationData:action.payload
        }
     case GET_ALL_BAND_SUCCESS :
        return {
            ...state,
            bandData: action.payload
        }
     case GET_ALL_OFFICELOCAION_SUCCESS :
        return {
            ...state,
            officeLocationData: action.payload
        }
     case GET_OFFICE_LOCATION_SUCCESS : 
     return {
        ...state,
        officeLocation : action.payload
     }
     case GET_BAND_BY_ID_SUCCESS : 
     return {
        ...state,
        bandValue : action.payload
     }
     case GET_ALL_HOLIDAYS_SUCCESS : 
     return {
        ...state,
        holidayData : action.payload
     }
     case GET_HOLIDAY_BY_ID_SUCCESS : 
     return {
        ...state,
        holiday : action.payload
     }
     case GET_ALL_DOMINE_SUCCESS : 
     return{
        ...state,
        domineData : action.payload
     }
     default:
        return state;
    }
}

export default usersReducer;