const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const { authenticate } = require("../middleware/auth");

router.post("/timesheetReport", authenticate, reportController.timesheetReport);
router.get(
  "/download/timesheet-reports",
  authenticate,
  reportController.downloadTimesheetReport,
);
router.get("/:employeeId/:id", authenticate, reportController.history);

module.exports = router;
