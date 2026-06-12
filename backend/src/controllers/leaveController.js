const db = require('../config/database');
const { success, error } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.balance = async (req, res, next) => {
  try {
    const employeeId = req.query.employeeId || req.user?.id;
    if (!employeeId) {
      return error(res, 'employeeId is required');
    }

    const result = await db.query(
      `SELECT lb.*, lt.leave_type_name, lt.leave_code
       FROM leave_balances lb
       JOIN leave_types lt ON lb.leave_type_id = lt.id
       WHERE lb.employee_id = $1`,
      [employeeId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.holidays = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT h.*, o.office_location_name
       FROM holidays h
       LEFT JOIN office_locations o ON h.location_id = o.id
       WHERE h.status = 'ACTIVE'
       ORDER BY h.holiday_date`
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.searchForEmail = async (req, res, next) => {
  try {
    const { partialEmail } = req.query;
    if (!partialEmail) {
      return success(res, []);
    }

    const result = await db.query(
      `SELECT id, email, "firstName", "lastName"
       FROM employees
       WHERE email ILIKE $1
       LIMIT 10`,
      [`%${partialEmail}%`]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.apply = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    if (!employeeId) {
      return error(res, 'Authentication required', 401);
    }

    const id = uuidv4();
    const filePath = req.file ? req.file.path : null;

    const {
      leaveMasterId, fromDate, toDate, fromSession, toSession,
      noOfDays, comments, cc,
    } = req.body;

    const result = await db.query(
      `INSERT INTO leave_requests (id, employee_id, "leaveMasterId", "fromDate", "toDate", "fromSession", "toSession", "noOfDays", comments, cc, file_path, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'SAVED')
       RETURNING *`,
      [id, employeeId, leaveMasterId, fromDate, toDate, fromSession || 'FULL_DAY', toSession || 'FULL_DAY', noOfDays, comments, cc, filePath]
    );

    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.noOfDays = async (req, res, next) => {
  try {
    const { fromDate, toDate, fromSession, toSession } = req.body;
    if (!fromDate || !toDate) {
      return error(res, 'fromDate and toDate are required');
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (fromSession === 'FIRST_HALF' || fromSession === 'SECOND_HALF') diffDays -= 0.5;
    if (toSession === 'FIRST_HALF' || toSession === 'SECOND_HALF') diffDays -= 0.5;

    return success(res, { noOfDays: diffDays });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { leaveRequestId } = req.params;
    const employeeId = req.user?.id;

    const result = await db.query(
      'DELETE FROM leave_requests WHERE id = $1 AND employee_id = $2 RETURNING id',
      [leaveRequestId, employeeId]
    );

    if (result.rows.length === 0) {
      return error(res, 'Leave request not found or unauthorized', 404);
    }
    return success(res, { message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getAllLeaveRequestsOfEmployees = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query(
      `SELECT COUNT(*) FROM leave_requests lr
       JOIN approver_hierarchy ah ON lr.employee_id = ah.employee_id
       WHERE ah.approver_id = $1 AND ah.approval_type = 'LEAVE'`,
      [employeeId]
    );
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT lr.*, e."firstName", e."lastName", e."employeeID"
       FROM leave_requests lr
       JOIN employees e ON lr.employee_id = e.id
       JOIN approver_hierarchy ah ON lr.employee_id = ah.employee_id
       WHERE ah.approver_id = $1 AND ah.approval_type = 'LEAVE'
       ORDER BY lr.created_at DESC
       LIMIT $2 OFFSET $3`,
      [employeeId, size, offset]
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

exports.searchByNameOrLeaveType = async (req, res, next) => {
  try {
    const { query: searchQuery } = req.query;
    if (!searchQuery) {
      return success(res, []);
    }

    const term = `%${searchQuery}%`;
    const result = await db.query(
      `SELECT lr.*, e."firstName", e."lastName", e."employeeID", lt.leave_type_name
       FROM leave_requests lr
       JOIN employees e ON lr.employee_id = e.id
       JOIN leave_types lt ON lr.leaveMasterId = lt.id
       WHERE e."firstName" ILIKE $1 OR e."lastName" ILIKE $1 OR lt.leave_type_name ILIKE $1
       LIMIT 20`,
      [term]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.masters = async (req, res, next) => {
  try {
    const [leaveTypes, employees] = await Promise.all([
      db.query('SELECT * FROM leave_types WHERE status = \'ACTIVE\''),
      db.query('SELECT id, "firstName", "lastName", "employeeID" FROM employees WHERE "Status" = \'ACTIVE\''),
    ]);

    return success(res, {
      leaveTypes: leaveTypes.rows,
      employees: employees.rows,
    });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeesByApprover = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT e.id, e."firstName", e."lastName", e."employeeID"
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

exports.getLeaveRequestApproval = async (req, res, next) => {
  try {
    const approverId = req.user?.id;
    const result = await db.query(
      `SELECT lr.*, e."firstName", e."lastName", e."employeeID", lt.leave_type_name
       FROM leave_requests lr
       JOIN employees e ON lr.employee_id = e.id
       JOIN leave_types lt ON lr.leaveMasterId = lt.id
       JOIN approver_hierarchy ah ON lr.employee_id = ah.employee_id
       WHERE ah.approver_id = $1 AND lr.status = 'SUBMITTED' AND ah.approval_type = 'LEAVE'
       ORDER BY lr.created_at DESC`,
      [approverId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.setLeaveApprovalStatusByApprover = async (req, res, next) => {
  try {
    const { leaveRequestId, status, comments } = req.body;
    const approverId = req.user?.id;

    if (!leaveRequestId || !status) {
      return error(res, 'leaveRequestId and status are required');
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return error(res, 'Status must be APPROVED or REJECTED');
    }

    const approvalId = uuidv4();
    await db.query(
      `INSERT INTO leave_approvals (id, leave_request_id, approver_id, status, comments, approved_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [approvalId, leaveRequestId, approverId, status, comments]
    );

    await db.query(
      'UPDATE leave_requests SET status = $1 WHERE id = $2',
      [status, leaveRequestId]
    );

    return success(res, { message: `Leave ${status.toLowerCase()} successfully` });
  } catch (err) {
    next(err);
  }
};

exports.leaveRequestApprovalsForAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query('SELECT COUNT(*) FROM leave_requests');
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT lr.*, e."firstName", e."lastName", e."employeeID", lt.leave_type_name
       FROM leave_requests lr
       JOIN employees e ON lr.employee_id = e.id
       JOIN leave_types lt ON lr.leaveMasterId = lt.id
       ORDER BY lr.created_at DESC
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

exports.leaveApprovers = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT e.id, e."firstName", e."lastName", e."employeeID"
       FROM employees e
       JOIN approver_hierarchy ah ON e.id = ah.approver_id`
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.setLeaveApprovalStatusByAdmin = async (req, res, next) => {
  try {
    const { leaveRequestId, status, comments } = req.body;

    if (!leaveRequestId || !status) {
      return error(res, 'leaveRequestId and status are required');
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return error(res, 'Status must be APPROVED or REJECTED');
    }

    const approvalId = uuidv4();
    await db.query(
      `INSERT INTO leave_approvals (id, leave_request_id, approver_id, status, comments, approved_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [approvalId, leaveRequestId, req.user.id, status, comments || 'Admin action']
    );

    await db.query(
      'UPDATE leave_requests SET status = $1 WHERE id = $2',
      [status, leaveRequestId]
    );

    return success(res, { message: `Leave ${status.toLowerCase()} by admin` });
  } catch (err) {
    next(err);
  }
};

exports.leaveHistory = async (req, res, next) => {
  try {
    const employeeId = req.user?.id;
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query(
      'SELECT COUNT(*) FROM leave_requests WHERE employee_id = $1',
      [employeeId]
    );
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT lr.*, lt.leave_type_name
       FROM leave_requests lr
       JOIN leave_types lt ON lr.leaveMasterId = lt.id
       WHERE lr.employee_id = $1
       ORDER BY lr.created_at DESC
       LIMIT $2 OFFSET $3`,
      [employeeId, size, offset]
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
