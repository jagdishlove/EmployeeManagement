import { combineReducers } from "redux";
import projectsReducer from "./AdminConsoleReducer/projectsReducer";
import ApprovalLeavesReducer from "./approvalLeavesReducer";
import errorMessageReducer from "./errorMessagesReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import historyDataReducer from "./historyDataReducer";
import leaveHistoryReducer from "./leaveHiistoryReducer";
import LeavesReducer from "./leavesReducer";
import projectListReducer from "./projectListReducer";
import teamMemberListReducer from "./teamMemberListReducer";
import timesheetReducer from "./timesheetReducer";
import usersReducer from "./AdminConsoleReducer/usersReducer";
import masterDataReducer from "./AdminConsoleReducer/masterDataReducer";

const rootReducer = combineReducers({
  forgotPassword: forgotPasswordReducer,
  errorMessages: errorMessageReducer,
  timesheetData: timesheetReducer,
  projectListData: projectListReducer,
  teamMemberList: teamMemberListReducer,
  historyData: historyDataReducer,
  leavesData: LeavesReducer,
  approvalLeavesData: ApprovalLeavesReducer,
  leaveHistoryData: leaveHistoryReducer,
  userDetails: usersReducer,
  projectDetails: projectsReducer,
  masterDataDetails: masterDataReducer
});

export default rootReducer;
