require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const masterDataRoutes = require("./routes/masterData");
const employeeRoutes = require("./routes/employee");
const leaveRoutes = require("./routes/leave");
const timesheetRoutes = require("./routes/timesheet");
const projectRoutes = require("./routes/project");
const approvalRoutes = require("./routes/approval");
const workspaceRoutes = require("./routes/workspace");
const ratingRoutes = require("./routes/rating");
const reportRoutes = require("./routes/report");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/auth", authRoutes);
app.use("/api/masterData", masterDataRoutes);
app.use("/employee", employeeRoutes);
app.use("/api", leaveRoutes);
app.use("/api", timesheetRoutes);
app.use("/api", approvalRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/domain", projectRoutes);
app.use("/api/resources", projectRoutes);
app.use("/api/client", projectRoutes);
app.use("/api/costIncurred", projectRoutes);
app.use("/api/projectProgress", workspaceRoutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/history", reportRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Kairos backend running on port ${PORT}`);
});

module.exports = app;
