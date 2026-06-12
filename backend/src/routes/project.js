const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { authenticate } = require("../middleware/auth");

// Projects
router.post("/getProjects", authenticate, projectController.getProjects);
router.get("/getProject/:id", authenticate, projectController.getProject);
router.post("/createProject", authenticate, projectController.createProject);
router.get(
  "/searchByProjectOrClientName",
  authenticate,
  projectController.searchByProjectOrClientName,
);
router.get(
  "/employees/search",
  authenticate,
  projectController.searchEmployees,
);

// Domains
router.get("/getAllDomains", authenticate, projectController.getAllDomains);

// Resources
router.get(
  "/searchResource/:id",
  authenticate,
  projectController.searchResource,
);
router.get("/searchResource", authenticate, projectController.searchResource);
router.post("/create", authenticate, projectController.createResource);
router.get(
  "/resourceDetails/:id",
  authenticate,
  projectController.resourceDetails,
);
router.get(
  "/getAllResources/:projectId",
  authenticate,
  projectController.getAllResources,
);
router.delete("/delete/:id", authenticate, projectController.deleteResource);

// Clients
router.get("/search", authenticate, projectController.searchClients);
router.get("/get/:clientId", authenticate, projectController.getClient);

// Cost Incurred
router.post("/create", authenticate, projectController.createCostIncurred);
router.get(
  "/getAllCostIncurred/:projectId",
  authenticate,
  projectController.getAllCostIncurred,
);
router.delete(
  "/delete/:id",
  authenticate,
  projectController.deleteCostIncurred,
);

module.exports = router;
