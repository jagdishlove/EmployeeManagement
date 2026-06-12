const db = require('../config/database');
const { success, error } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.getByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const employeeId = req.query.employeeId || req.user?.id;

    const result = await db.query(
      `SELECT ts.*, jt.job_type_name, p.project_name
       FROM timesheet_entries ts
       LEFT JOIN job_types jt ON ts.jobTypeId = jt.id
       LEFT JOIN projects p ON ts.projectId = p.id
       WHERE ts.employee_id = $1 AND ts.date = $2
       ORDER BY ts.created_at`,
      [employeeId, date]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getTimesheetForApproval = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT ts.*, e."firstName", e."lastName", e."employeeID", p.project_name
       FROM timesheet_entries ts
       JOIN employees e ON ts.employee_id = e.id
       JOIN projects p ON ts.projectId = p.id
       JOIN approver_hierarchy ah ON ts.employee_id = ah.employee_id
       WHERE ah.approver_id = $1 AND ts.status = 'SUBMITTED' AND ah.approval_type = 'TIMESHEET'
       ORDER BY ts.date DESC`,
      [approverId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    const id = uuidv4();
    const {
      jobTypeId, projectId, activityId, startTime, endTime,
      noOfHours, date, comments,
    } = req.body;

    const result = await db.query(
      `INSERT INTO timesheet_entries (id, employee_id, date, "jobTypeId", "projectId", "activityId", "startTime", "endTime", "noOfHours", comments, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'SAVED')
       RETURNING *`,

      [id, employeeId, date, jobTypeId, projectId, activityId, startTime, endTime, noOfHours, comments]
    );
    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employeeId = req.user?.id;

    const result = await db.query(
      'DELETE FROM timesheet_entries WHERE id = $1 AND employee_id = $2 RETURNING id',
      [id, employeeId]
    );

    if (result.rows.length === 0) {
      return error(res, 'Entry not found or unauthorized', 404);
    }
    return success(res, { message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.submitForApproval = async (req, res, next) => {
  try {
    const { date } = req.params;
    const employeeId = req.user?.id;

    const result = await db.query(
      `UPDATE timesheet_entries SET status = 'SUBMITTED'
       WHERE employee_id = $1 AND date = $2 AND status = 'SAVED'
       RETURNING *`,
      [employeeId, date]
    );

    return success(res, {
      message: 'Submitted for approval',
      count: result.rows.length,
      entries: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

exports.setTimesheetEntryApprovalStatusByMgr = async (req, res, next) => {
  try {
    const { timesheetEntryId, status, comments, rating } = req.body;
    const approverId = req.user?.id;

    if (!timesheetEntryId || !status) {
      return error(res, 'timesheetEntryId and status are required');
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return error(res, 'Status must be APPROVED or REJECTED');
    }

    const approvalId = uuidv4();
    await db.query(
      `INSERT INTO timesheet_approvals (id, timesheet_entry_id, approver_id, status, comments, rating, approved_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [approvalId, timesheetEntryId, approverId, status, comments, rating || null]
    );

    await db.query(
      'UPDATE timesheet_entries SET status = $1 WHERE id = $2',
      [status, timesheetEntryId]
    );

    return success(res, { message: `Timesheet ${status.toLowerCase()} successfully` });
  } catch (err) {
    next(err);
  }
};

exports.lastWorkingDays = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    const result = await db.query(
      `SELECT * FROM timesheet_entries
       WHERE employee_id = $1
       ORDER BY date DESC
       LIMIT 3`,
      [employeeId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.mostCommonTimes = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    const result = await db.query(
      `SELECT "startTime", "endTime", COUNT(*) as frequency
       FROM timesheet_entries
       WHERE employee_id = $1 AND "startTime" IS NOT NULL
       GROUP BY "startTime", "endTime"
       ORDER BY frequency DESC
       LIMIT 5`,
      [employeeId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.searchEmployees = async (req, res, next) => {
  try {
    const { employeeName } = req.query;
    if (!employeeName) {
      return success(res, []);
    }

    const term = `%${employeeName}%`;
    const result = await db.query(
      `SELECT id, "firstName", "lastName", "employeeID"
       FROM employees
       WHERE "firstName" ILIKE $1 OR "lastName" ILIKE $1
       LIMIT 20`,
      [term]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.timesheetApprovers = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT e.id, e."firstName", e."lastName", e."employeeID"
       FROM employees e
       JOIN approver_hierarchy ah ON e.id = ah.approver_id
       WHERE ah.approval_type = 'TIMESHEET'`
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getTimesheetForAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query('SELECT COUNT(*) FROM timesheet_entries');
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT ts.*, e."firstName", e."lastName", e."employeeID", p.project_name
       FROM timesheet_entries ts
       JOIN employees e ON ts.employee_id = e.id
       JOIN projects p ON ts.projectId = p.id
       ORDER BY ts.date DESC
       LIMIT $1 OFFSET $2`,
      [size, offset]
    );

    return success(res, {
      content: result.rows,
      totalElements: total,
      totalPages: Math.ceil(total / size),
      number: page,
      size,
    });
  } catch (err) {
    next(err);
  }
};

exports.setTimesheetEntryApprovalStatusByAdmin = async (req, res, next) => {
  try {
    const { timesheetEntryId, status, comments } = req.body;

    if (!timesheetEntryId || !status) {
      return error(res, 'timesheetEntryId and status are required');
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return error(res, 'Status must be APPROVED or REJECTED');
    }

    const approvalId = uuidv4();
    await db.query(
      `INSERT INTO timesheet_approvals (id, timesheet_entry_id, approver_id, status, comments, approved_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [approvalId, timesheetEntryId, req.user.id, status, comments || 'Admin action']
    );

    await db.query(
      'UPDATE timesheet_entries SET status = $1 WHERE id = $2',
      [status, timesheetEntryId]
    );

    return success(res, { message: `Timesheet ${status.toLowerCase()} by admin` });
  } catch (err) {
    next(err);
  }
};
