import { combineReducers } from "redux";
import errorMessageReducer from "./errorMessagesReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import projectListReducer from "./projectListReducer";
import teamMemberListReducer from "./teamMemberListReducer";
import timesheetReducer from "./timesheetReducer";
import historyDataReducer from "./historyDataReducer";
import LeavesReducer from "./leavesReducer";
import ApprovalLeavesReducer from "./approvalLeavesReducer";
import leaveHistoryReducer from "./leaveHiistoryReducer";
import usersReducer from "./usersReducer";
import projectsReducer from "./projectsReducer";

const rootReducer = combineReducers({
  forgotPassword: forgotPasswordReducer,
  errorMessages: errorMessageReducer,
  timesheetData: timesheetReducer,
  projectListData: projectListReducer,
  teamMemberList: teamMemberListReducer,
  historyData: historyDataReducer,
  leavesData :LeavesReducer,
  approvalLeavesData : ApprovalLeavesReducer,
  leaveHistoryData:leaveHistoryReducer,
  userDetails: usersReducer,
  projectDetails:projectsReducer,
});

export default rootReducer;
 