import {
  TEAM_MEMBER_LIST_FAIL,
  TEAM_MEMBER_LIST_REQUEST,
  TEAM_MEMBER_LIST_SUCCESS,
} from "../actions/approvals/teamMemberActionType";

// Initial state
const initialState = {
  teamMemberList: [],
};

// Reducer function
const teamMemberListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAM_MEMBER_LIST_REQUEST:
      return {
        ...state,
      };
    case TEAM_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        teamMemberList: action.payload,
      };
    case TEAM_MEMBER_LIST_FAIL:
      return {
        ...state,
        teamMemberList: [],
      };

    default:
      return state;
  }
};

export default teamMemberListReducer;
