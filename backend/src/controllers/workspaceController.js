const db = require('../config/database');
const { success } = require('../utils/response');

exports.getProjectsDropDownList = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT id, project_name, project_code FROM projects WHERE status = \'ACTIVE\' ORDER BY project_name'
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.performance = async (req, res, next) => {
  try {
    const managerId = req.user?.id;
    const result = await db.query(
      `SELECT e.id, e."firstName", e."lastName", e."employeeID",
              COUNT(ts.id) as total_entries,
              COUNT(CASE WHEN ts.status = 'APPROVED' THEN 1 END) as approved_entries,
              COALESCE(AVG(r.rating), 0) as avg_rating
       FROM employees e
       LEFT JOIN timesheet_entries ts ON e.id = ts.employee_id
       LEFT JOIN ratings r ON e.id = r.employee_id
       JOIN approver_hierarchy ah ON e.id = ah.employee_id
       WHERE ah.approver_id = $1
       GROUP BY e.id, e."firstName", e."lastName", e."employeeID"`,
      [managerId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.projectPerformance = async (req, res, next) => {
  try {
    const managerId = req.user?.id;
    const result = await db.query(
      `SELECT p.id, p.project_name, p.project_code,
              COUNT(ts.id) as total_hours,
              COUNT(DISTINCT ts.employee_id) as team_size
       FROM projects p
       JOIN timesheet_entries ts ON p.id = ts.projectId
       JOIN employees e ON ts.employee_id = e.id
       JOIN approver_hierarchy ah ON e.id = ah.employee_id
       WHERE ah.approver_id = $1
       GROUP BY p.id, p.project_name, p.project_code`,
      [managerId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getTeamMembersDropDownList = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT e.id, e."firstName", e."lastName", e."employeeID"
       FROM employees e
       JOIN approver_hierarchy ah ON e.id = ah.employee_id
       WHERE ah.approver_id = $1 AND e."Status" = 'ACTIVE'
       ORDER BY e."firstName"`,
      [approverId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.activity = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    const result = await db.query(
      `SELECT * FROM activity_history
       WHERE employee_id = $1
       ORDER BY date DESC, created_at DESC
       LIMIT 50`,
      [employeeId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.todayActivity = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    const today = new Date().toISOString().split('T')[0];

    const result = await db.query(
      `SELECT * FROM activity_history
       WHERE employee_id = $1 AND date = $2
       ORDER BY created_at DESC`,
      [employeeId, today]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.timeCostPercentage = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const timeResult = await db.query(
      `SELECT COALESCE(SUM("noOfHours"), 0) as total_hours
       FROM timesheet_entries WHERE "projectId" = $1`,
      [projectId]
    );

    const costResult = await db.query(
      `SELECT COALESCE(SUM(amount), 0) as total_cost
       FROM cost_incurred WHERE project_id = $1`,
      [projectId]
    );

    return success(res, {
      projectId,
      totalHours: parseFloat(timeResult.rows[0].total_hours),
      totalCost: parseFloat(costResult.rows[0].total_cost),
    });
  } catch (err) {
    next(err);
  }
};

exports.progressDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT p.*, c.client_name, d.domain_name,
              (SELECT COUNT(*) FROM timesheet_entries WHERE "projectId" = p.id) as total_entries,
              (SELECT COUNT(*) FROM project_resources WHERE project_id = p.id) as total_resources,
              (SELECT COALESCE(SUM(amount), 0) FROM cost_incurred WHERE project_id = p.id) as total_cost
       FROM projects p
       LEFT JOIN clients c ON p.client_id = c.id
       LEFT JOIN domains d ON p.domain_id = d.id
       WHERE p.id = $1`,
      [id]
    );
    return success(res, result.rows[0] || {});
  } catch (err) {
    next(err);
  }
};

exports.projectResources = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT pr.*, e."firstName", e."lastName", e."employeeID", e.designation, e.email
       FROM project_resources pr
       JOIN employees e ON pr.employee_id = e.id
       WHERE pr.project_id = $1
       ORDER BY pr.created_at`,
      [id]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};
