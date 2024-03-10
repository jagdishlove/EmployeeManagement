import {
  GET_ALL_LEAVES_FOR_ADMIN_REQUEST,
  GET_ALL_LEAVES_FOR_ADMIN_SUCCESS,
  GET_ALL_LEAVES_FOR_ADMIN_FAILURE,
  GET_ALL_LEAVES_APPROVERS_REQUEST,
  GET_ALL_LEAVES_APPROVERS_SUCCESS,
  GET_ALL_LEAVES_APPROVERS_FAILURE,
} from "../../actions/AdminConsoleAction/leaves/adminLeaveActionType";

const initialState = {
  allLeavesForAdmin: [],
  leavesApproversData: [],
};

const adminLeavesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LEAVES_FOR_ADMIN_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_LEAVES_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        allLeavesForAdmin: action.payload,
      };
    case GET_ALL_LEAVES_FOR_ADMIN_FAILURE:
      return {
        ...state,
      };
    case GET_ALL_LEAVES_APPROVERS_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_LEAVES_APPROVERS_SUCCESS:
      return {
        ...state,
        leavesApproversData: action.payload,
      };
    case GET_ALL_LEAVES_APPROVERS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminLeavesReducer;
