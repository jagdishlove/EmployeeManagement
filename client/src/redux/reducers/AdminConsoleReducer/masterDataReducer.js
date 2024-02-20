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
    GET_ALL_COUNTRY_REQUEST,
    GET_ALL_COUNTRY_FAIL,
    GET_ALL_COUNTRY_SUCCESS,
    GET_ALL_STATE_FAIL,
    GET_ALL_STATE_REQUEST,
   GET_ALL_STATE_SUCCESS,
   GET_ALL_CLIENT_DETAILS_FAIL,
   GET_ALL_CLIENT_DETAILS_REQUEST,
   GET_ALL_CLIENT_DETAILS_SUCCESS,
   GET_CLIENT_DETAILS_SUCCESS,
   GET_LOCATION_MASTER_DATA_FAIL,
   GET_LOCATION_MASTER_DATA_REQUEST,
   GET_LOCATION_MASTER_DATA_SUCCESS,
   GET_ALL_ONSITE_OFFICE_LOCATION_SUCCESS,
   GET_ONSITE_OFFICE_LOCATION_SUCCESS,
   GET_ALL_CITY_SUCCESS
} from '../../actions/masterData/masterDataActionType'



const initialState = {
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
    countrydata : [],
    statedata : [],
    citydata : [],
    clientdata : [],
    clientDetails : {},
    LocationData : [],
    locationdataLoading : false ,
    onsiteLocationData : [],
    onsiteLocation : {},
  };

const masterDataReducer = (state = initialState, action) => {
    switch (action.type) {
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
     case GET_ALL_COUNTRY_REQUEST:
      return {
          ...state,
      };
  case GET_ALL_COUNTRY_SUCCESS:
      return {
          ...state,
          countrydata: action.payload,
      };
  case GET_ALL_COUNTRY_FAIL:
      return {
          ...state,
      };
  case GET_ALL_STATE_REQUEST:
      return {
          ...state,
      };
  case GET_ALL_STATE_SUCCESS:
      return {
          ...state,
          statedata: action.payload,
      };
  case GET_ALL_STATE_FAIL:
      return {
          ...state,
      };
   case GET_ALL_CLIENT_DETAILS_REQUEST : 
   return {
      ...state,
   }
   case GET_ALL_CLIENT_DETAILS_SUCCESS : 
   return {
      ...state,
      clientdata : action.payload
   }
   case GET_ALL_CLIENT_DETAILS_FAIL :
      return {
         ...state,
      }
    case GET_CLIENT_DETAILS_SUCCESS :
      return {
         ...state,
         clientDetails : action.payload
      }
    case GET_LOCATION_MASTER_DATA_REQUEST : 
     return{
      ...state,
      locationdataLoading: true
     }
    case GET_LOCATION_MASTER_DATA_SUCCESS :
      return {
         ...state,
         LocationData : action.payload,
         locationdataLoading : false
      }
   case GET_LOCATION_MASTER_DATA_FAIL :
      return {
         ...state,
         locationdataLoading: false
      }
    case GET_ALL_ONSITE_OFFICE_LOCATION_SUCCESS :
      return {
         ...state,
         onsiteLocationData : action.payload
      }
    case GET_ONSITE_OFFICE_LOCATION_SUCCESS :
      return {
         ...state,
         onsiteLocation : action.payload
      }
     case GET_ALL_CITY_SUCCESS : 
     return {
        ...state,
        citydata : action.payload
     }
     default:
        return state;
    }
}

export default masterDataReducer;