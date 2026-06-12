const db = require('../config/database');
const { success, error } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.underManager = async (req, res, next) => {
  try {
    const managerId = req.user?.id;
    const result = await db.query(
      `SELECT e.id, e."firstName", e."lastName", e."employeeID", e.designation,
              r.rating, r.comments, r.rating_period, r.created_at as rating_date
       FROM employees e
       JOIN approver_hierarchy ah ON e.id = ah.employee_id
       LEFT JOIN ratings r ON e.id = r.employee_id AND r.manager_id = $1
       WHERE ah.approver_id = $1
       ORDER BY e."firstName"`,
      [managerId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.save = async (req, res, next) => {
  try {
    const { employeeId, rating: ratingValue, comments, ratingPeriod } = req.body;
    const managerId = req.user?.id;

    if (!employeeId || !ratingValue) {
      return error(res, 'employeeId and rating are required');
    }

    if (ratingValue < 1 || ratingValue > 5) {
      return error(res, 'Rating must be between 1 and 5');
    }

    const existing = await db.query(
      'SELECT id FROM ratings WHERE employee_id = $1 AND manager_id = $2 AND rating_period = $3',
      [employeeId, managerId, ratingPeriod || null]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await db.query(
        `UPDATE ratings SET rating = $1, comments = $2, updated_at = CURRENT_TIMESTAMP
         WHERE id = $3 RETURNING *`,
        [ratingValue, comments, existing.rows[0].id]
      );
    } else {
      const id = uuidv4();
      result = await db.query(
        `INSERT INTO ratings (id, employee_id, manager_id, rating, comments, rating_period)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [id, employeeId, managerId, ratingValue, comments, ratingPeriod || null]
      );
    }

    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.byManager = async (req, res, next) => {
  try {
    const managerId = req.user?.id;
    const result = await db.query(
      `SELECT r.*, e."firstName", e."lastName", e."employeeID"
       FROM ratings r
       JOIN employees e ON r.employee_id = e.id
       WHERE r.manager_id = $1
       ORDER BY r.created_at DESC`,
      [managerId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};
