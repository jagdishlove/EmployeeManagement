const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspaceController");
const { authenticate } = require("../middleware/auth");

// Project Progress
router.get(
  "/getProjectsDropDownList",
  authenticate,
  workspaceController.getProjectsDropDownList,
);
router.get("/performance", authenticate, workspaceController.performance);
router.get(
  "/projectPerformance",
  authenticate,
  workspaceController.projectPerformance,
);
router.get(
  "/getTeamMembersDropDownList",
  authenticate,
  workspaceController.getTeamMembersDropDownList,
);
router.get(
  "/timeCostPercentage/:projectId",
  authenticate,
  workspaceController.timeCostPercentage,
);
router.get(
  "/progressDetails/:id",
  authenticate,
  workspaceController.progressDetails,
);
router.get(
  "/projectResources/:id",
  authenticate,
  workspaceController.projectResources,
);

// Workspace
router.get("/activity", authenticate, workspaceController.activity);
router.get("/todayActivity", authenticate, workspaceController.todayActivity);

module.exports = router;
