const express = require("express");
const router = express.Router();
const masterDataController = require("../controllers/masterDataController");
const { authenticate } = require("../middleware/auth");

router.get("/getAll", masterDataController.getAll);
router.get("/countries", masterDataController.countries);
router.get("/states", masterDataController.states);
router.get("/:table", authenticate, masterDataController.listAll);
router.get("/:table/:id", authenticate, masterDataController.getById);
router.post("/:table", authenticate, masterDataController.create);
router.put("/:table/:id", authenticate, masterDataController.update);
router.delete("/:table/:id", authenticate, masterDataController.remove);

module.exports = router;
