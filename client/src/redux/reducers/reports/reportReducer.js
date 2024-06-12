import {
    REPORTS_REQUEST,
    REPORTS_SUCCESS,
    REPORTS_FAILURE,
} from "../../actions/reports/reportsActionType";

const initialData = {
    reports: [],
  };
  

const reportReducer = (state = initialData, action) => {
    switch (action.type) {
        case REPORTS_REQUEST:
            return {
                ...state,
            };
        case REPORTS_SUCCESS:
            return {
                ...state,
                reports: action.payload,
            };
        case REPORTS_FAILURE:
            return {
                ...state,
                reports: [],
            };
        default:
            return state;
    }
};

export default reportReducer;