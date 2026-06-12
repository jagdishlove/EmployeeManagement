const express = require("express");
const router = express.Router();
const approvalController = require("../controllers/approvalController");
const { authenticate } = require("../middleware/auth");

router.get(
  "/approver/getProjectsList",
  authenticate,
  approvalController.getProjectsList,
);
router.get(
  "/approver/getTeamMembers",
  authenticate,
  approvalController.getTeamMembers,
);
router.post(
  "/workspace/getMyReportees",
  authenticate,
  approvalController.getMyReportees,
);
router.post(
  "/workspace/getAllTeamMembers",
  authenticate,
  approvalController.getAllTeamMembers,
);

module.exports = router;
