import {
    GET_MY_REPORTES_FAIL,
    GET_MY_REPORTES_REQUEST,
    GET_MY_REPORTES_SUCCESS,
  
  } from "../../actions/approvals/Myreportees/MyreorteesActionType";
  
  const initialData = {
    reports: [],
  };
  
  const MyreporteesReducer = (state = initialData, action) => {
    switch (action.type) {
  
      case GET_MY_REPORTES_REQUEST:
        return {
          ...state,
        };
      case GET_MY_REPORTES_SUCCESS:
        return {
          ...state,
          reports: action.payload,
        };
      case GET_MY_REPORTES_FAIL:
        return {
          ...state,
          reports: [],
        };
    
      default:
        return state;
    }
  };
  
  export default MyreporteesReducer;
  