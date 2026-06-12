const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const { authenticate } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/leave/balance", authenticate, leaveController.balance);
router.get("/leave/holidays", authenticate, leaveController.holidays);
router.get(
  "/leave/searchForEmail",
  authenticate,
  leaveController.searchForEmail,
);
router.post(
  "/leave/apply",
  authenticate,
  upload.single("file"),
  leaveController.apply,
);
router.post("/leave/noOfDays", authenticate, leaveController.noOfDays);
router.delete("/leave/:leaveRequestId", authenticate, leaveController.delete);
router.post(
  "/leave/getAllLeaveRequestsOfEmployees",
  authenticate,
  leaveController.getAllLeaveRequestsOfEmployees,
);
router.get(
  "/leave/searchByNameOrLeaveType",
  authenticate,
  leaveController.searchByNameOrLeaveType,
);
router.get("/masters", authenticate, leaveController.masters);
router.get(
  "/approver/getEmployeesByApprover",
  authenticate,
  leaveController.getEmployeesByApprover,
);
router.get(
  "/leave/getLeaveRequestApproval",
  authenticate,
  leaveController.getLeaveRequestApproval,
);
router.post(
  "/leave/setLeaveApprovalStatusByApprover",
  authenticate,
  leaveController.setLeaveApprovalStatusByApprover,
);
router.post(
  "/leave/leaveRequestApprovalsForAdmin",
  authenticate,
  leaveController.leaveRequestApprovalsForAdmin,
);
router.get("/leave/approvers", authenticate, leaveController.leaveApprovers);
router.post(
  "/leave/setLeaveApprovalStatusByAdmin",
  authenticate,
  leaveController.setLeaveApprovalStatusByAdmin,
);
router.get("/leaveHistory/get", authenticate, leaveController.leaveHistory);

module.exports = router;
