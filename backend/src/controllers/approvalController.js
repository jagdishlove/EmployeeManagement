const db = require('../config/database');
const { success } = require('../utils/response');

exports.getProjectsList = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT DISTINCT p.id, p.project_name, p.project_code
       FROM projects p
       JOIN timesheet_entries ts ON p.id = ts.projectId
       JOIN approver_hierarchy ah ON ts.employee_id = ah.employee_id
       WHERE ah.approver_id = $1`,
      [approverId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getTeamMembers = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT e.id, e."firstName", e."lastName", e."employeeID", e.email
       FROM employees e
       JOIN approver_hierarchy ah ON e.id = ah.employee_id
       WHERE ah.approver_id = $1`,
      [approverId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getMyReportees = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT e.id, e."firstName", e."lastName", e."employeeID", e.designation, e.email
       FROM employees e
       JOIN approver_hierarchy ah ON e.id = ah.employee_id
       WHERE ah.approver_id = $1`,
      [approverId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getAllTeamMembers = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT e.id, e."firstName", e."lastName", e."employeeID", e.designation, e.email, e."Status"
       FROM employees e
       JOIN approver_hierarchy ah ON e.id = ah.employee_id
       WHERE ah.approver_id = $1 AND e."Status" = 'ACTIVE'`,
      [approverId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};
