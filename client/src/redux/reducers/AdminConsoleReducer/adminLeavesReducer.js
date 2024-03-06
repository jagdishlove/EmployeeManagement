import {
  GET_ALL_LEAVES_FOR_ADMIN_REQUEST,
  GET_ALL_LEAVES_FOR_ADMIN_SUCCESS,
  GET_ALL_LEAVES_FOR_ADMIN_FAILURE,
} from "../../actions/AdminConsoleAction/leaves/adminLeaveActionType";

const initialState = {
  allLeavesForAdmin: [],
};

const adminLeavesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LEAVES_FOR_ADMIN_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_LEAVES_FOR_ADMIN_SUCCESS:
      console.log("reducer", action.payload);
      return {
        ...state,
        allLeavesForAdmin: action.payload,
      };
    case GET_ALL_LEAVES_FOR_ADMIN_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminLeavesReducer;
