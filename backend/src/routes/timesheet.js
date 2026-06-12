const express = require("express");
const router = express.Router();
const timesheetController = require("../controllers/timesheetController");
const { authenticate } = require("../middleware/auth");

router.get(
  "/timesheet/getByDate/:date",
  authenticate,
  timesheetController.getByDate,
);
router.get(
  "/timesheetentry/getTimesheetForApproval",
  authenticate,
  timesheetController.getTimesheetForApproval,
);
router.post("/timesheetentry/create", authenticate, timesheetController.create);
router.delete("/timesheetentry/:id", authenticate, timesheetController.delete);
router.post(
  "/timesheetentry/submitForApproval/:date",
  authenticate,
  timesheetController.submitForApproval,
);
router.post(
  "/timesheetentry/setTimesheetEntryApprovalStatusByMgr",
  authenticate,
  timesheetController.setTimesheetEntryApprovalStatusByMgr,
);
router.get(
  "/timesheetentry/lastWorkingDays",
  authenticate,
  timesheetController.lastWorkingDays,
);
router.get(
  "/timesheetentry/mostCommonTimes",
  authenticate,
  timesheetController.mostCommonTimes,
);
router.get(
  "/timesheetentry/searchEmployees",
  authenticate,
  timesheetController.searchEmployees,
);
router.get(
  "/timesheetentry/approvers",
  authenticate,
  timesheetController.timesheetApprovers,
);
router.post(
  "/timesheetentry/getTimesheetForAdmin",
  authenticate,
  timesheetController.getTimesheetForAdmin,
);
router.post(
  "/timesheetentry/setTimesheetEntryApprovalStatusByAdmin",
  authenticate,
  timesheetController.setTimesheetEntryApprovalStatusByAdmin,
);

module.exports = router;
