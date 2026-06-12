const db = require('../config/database');
const { success, error, paginated } = require('../utils/response');

exports.timesheetReport = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query('SELECT COUNT(*) FROM timesheet_entries');
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT ts.*, e."firstName", e."lastName", e."employeeID",
              p.project_name, jt.job_type_name
       FROM timesheet_entries ts
       JOIN employees e ON ts.employee_id = e.id
       JOIN projects p ON ts.projectId = p.id
       LEFT JOIN job_types jt ON ts.jobTypeId = jt.id
       ORDER BY ts.date DESC
       LIMIT $1 OFFSET $2`,
      [size, offset]
    );

    return paginated(res, result.rows, total, page, size);
  } catch (err) {
    next(err);
  }
};

exports.downloadTimesheetReport = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT ts.date, e."firstName", e."lastName", e."employeeID",
              p.project_name, jt.job_type_name,
              ts.startTime, ts.endTime, ts.noOfHours, ts.status, ts.comments
       FROM timesheet_entries ts
       JOIN employees e ON ts.employee_id = e.id
       JOIN projects p ON ts.projectId = p.id
       LEFT JOIN job_types jt ON ts.jobTypeId = jt.id
       ORDER BY ts.date DESC`
    );

    // Return JSON that frontend can convert to Excel
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.history = async (req, res, next) => {
  try {
    const { employeeId, id } = req.params;
    const empId = employeeId || id || req.user?.id;

    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query(
      'SELECT COUNT(*) FROM activity_history WHERE employee_id = $1',
      [empId]
    );
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT * FROM activity_history
       WHERE employee_id = $1
       ORDER BY date DESC, created_at DESC
       LIMIT $2 OFFSET $3`,
      [empId, size, offset]
    );

    return paginated(res, result.rows, total, page, size);
  } catch (err) {
    next(err);
  }
};
