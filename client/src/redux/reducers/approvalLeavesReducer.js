import {
    APPROVAL_LEAVE_DATES_REQUEST,
    APPROVAL_LEAVE_DATES_SUCCESS,
    APPROVAL_LEAVE_DATES_FAIL,
    APPROVAL_LEAVE_TEAM_MEMBER_REQUEST,
    APPROVAL_LEAVE_TEAM_MEMBER_SUCCESS,
    APPROVAL_LEAVE_TEAM_MEMBER_FAIL,
    GET_LEAVE_REQUEST,
    GET_LEAVE_SUCCESS,
    GET_LEAVE_FAIL,
} from "../actions/leaves/approvalLeaveActionType"

// Initial state
const initialState = {
    approvalLeaveDatesData: [],
    approvalLeaveTeamMemberData:[],
    leaveDatesoading: false,
    leaveTeamMemberLaoding:false,
    getLeaveData: [],
  getLeaveLoading: false,
  };

  // Reducer function
 const ApprovalLeavesReducer = (state = initialState, action) => {
    switch (action.type) {
      case  APPROVAL_LEAVE_DATES_REQUEST:
        return {
          ...state,
          leaveDatesoading: true,
        };
      case APPROVAL_LEAVE_DATES_SUCCESS:
        return {
          ...state,
          approvalLeaveDatesData: action.payload,
          leaveDatesoading: false,
        };
      case  APPROVAL_LEAVE_DATES_FAIL: {
        return {
          ...state,
          approvalLeaveDatesData: [],
          leaveDatesoading: false,
        };
      }
      case APPROVAL_LEAVE_TEAM_MEMBER_REQUEST:
        return {
          ...state,
          leaveTeamMemberLaoding: true,
        };
      case APPROVAL_LEAVE_TEAM_MEMBER_SUCCESS:
        return {
          ...state,
          approvalLeaveTeamMemberData: action.payload,
          leaveTeamMemberLaoding: false,
        };
      case APPROVAL_LEAVE_TEAM_MEMBER_FAIL: {
        return {
          ...state,
          approvalLeaveTeamMemberData: [],
          leaveTeamMemberLaoding: false,
        };
      }
      case GET_LEAVE_REQUEST: {
        return {
          ...state,
          getLeaveData: [],
          getLeaveLoading: true,
        };
      }
      case GET_LEAVE_SUCCESS: {
        return {
          ...state,
          getLeaveData: action.payload,
          getLeaveLoading: false,
        };
      }
      case GET_LEAVE_FAIL: {
        return {
          ...state,
          getLeaveData: [],
          getLeaveLoading: false,
        };
      }
  
      default:
        return state;
    }
  };
  
  export default ApprovalLeavesReducer;
  
  
  