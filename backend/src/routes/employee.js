const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { authenticate } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post("/getAll", authenticate, employeeController.getAll);
router.get("/getById/:id", authenticate, employeeController.getById);
router.post(
  "/create",
  authenticate,
  upload.single("file"),
  employeeController.create,
);
router.get(
  "/searchByemployeeAndProjectName",
  authenticate,
  employeeController.searchByEmployeeAndProjectName,
);
router.post(
  "/addAndUpdateSkills",
  authenticate,
  employeeController.addAndUpdateSkills,
);

module.exports = router;
