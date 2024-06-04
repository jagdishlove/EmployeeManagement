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
import adminTimeSheetReducer from "./AdminConsoleReducer/adminTimeSheetReducer";
import adminLeavesReducer from "./AdminConsoleReducer/adminLeavesReducer";
import workspaceReducer from "./workSpace/workSpaceReducer";
import dashboardProjectReducer from "./dashboard/dashboardProjectReducer";
import loginReducer from "./loginReducer";
import timesheetReportsReducer from "./dashboard/reportsReducer";

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
  masterDataDetails: masterDataReducer,
  adminTimeSheet: adminTimeSheetReducer,
  adminLeaves: adminLeavesReducer,
  workSpace: workspaceReducer,
  dashboardProjectdetails: dashboardProjectReducer,
  timesheetreportsDetails:timesheetReportsReducer,
  loginDetails: loginReducer,
});

export default rootReducer;
