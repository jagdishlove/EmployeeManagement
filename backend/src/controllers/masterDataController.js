const db = require('../config/database');
const { success, error } = require('../utils/response');

const ALLOWED_TABLES = [
  'skills', 'bands', 'designations', 'job_types', 'domains',
  'office_locations', 'holidays', 'clients', 'client_onsite_locations',
  'employee_types', 'leave_types',
];

function sanitizeTable(table) {
  if (!ALLOWED_TABLES.includes(table)) {
    return null;
  }
  return table;
}

exports.listAll = async (req, res, next) => {
  try {
    const { table } = req.params;
    const sanitized = sanitizeTable(table);
    if (!sanitized) {
      return error(res, `Invalid table: ${table}`, 400);
    }

    const result = await db.query(
      `SELECT * FROM ${sanitized} ORDER BY created_at DESC`
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { table, id } = req.params;
    const sanitized = sanitizeTable(table);
    if (!sanitized) {
      return error(res, `Invalid table: ${table}`, 400);
    }

    const result = await db.query(
      `SELECT * FROM ${sanitized} WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return error(res, 'Not found', 404);
    }
    return success(res, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { table } = req.params;
    const sanitized = sanitizeTable(table);
    if (!sanitized) {
      return error(res, `Invalid table: ${table}`, 400);
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const columns = fields.map(f => `"${f}"`).join(', ');

    const result = await db.query(
      `INSERT INTO ${sanitized} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { table, id } = req.params;
    const sanitized = sanitizeTable(table);
    if (!sanitized) {
      return error(res, `Invalid table: ${table}`, 400);
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const setClauses = fields.map((f, i) => `"${f}" = $${i + 1}`).join(', ');
    values.push(id);

    const result = await db.query(
      `UPDATE ${sanitized} SET ${setClauses}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (result.rows.length === 0) {
      return error(res, 'Not found', 404);
    }
    return success(res, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { table, id } = req.params;
    const sanitized = sanitizeTable(table);
    if (!sanitized) {
      return error(res, `Invalid table: ${table}`, 400);
    }

    const result = await db.query(
      `DELETE FROM ${sanitized} WHERE id = $1 RETURNING id`,
      [id]
    );
    if (result.rows.length === 0) {
      return error(res, 'Not found', 404);
    }
    return success(res, { message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Country/State/City from location master tables

exports.getAll = async (req, res, next) => {
  try {
    const { dataType, parentId } = req.query;

    if (!dataType) {
      // Return all countries (backward compat)
      const result = await db.query('SELECT * FROM countries ORDER BY name');
      return success(res, result.rows);
    }

    switch (dataType) {
      case 'country': {
        const result = await db.query('SELECT * FROM countries ORDER BY name');
        return success(res, result.rows);
      }
      case 'state': {
        if (!parentId) {
          return error(res, 'parentId is required for states', 400);
        }
        const result = await db.query(
          'SELECT * FROM states WHERE country_id = $1 ORDER BY name',
          [parentId]
        );
        return success(res, result.rows);
      }
      case 'city': {
        if (!parentId) {
          return error(res, 'parentId is required for cities', 400);
        }
        const result = await db.query(
          'SELECT * FROM cities WHERE state_id = $1 ORDER BY name',
          [parentId]
        );
        return success(res, result.rows);
      }
      default:
        return error(res, `Invalid dataType: ${dataType}`, 400);
    }
  } catch (err) {
    next(err);
  }
};

exports.countries = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT DISTINCT country AS name FROM office_locations WHERE country IS NOT NULL AND country != \'\' ORDER BY country'
    );
    const rows = result.rows.map((r, i) => ({ id: i + 1, name: r.name }));
    return success(res, rows);
  } catch (err) {
    next(err);
  }
};

exports.states = async (req, res, next) => {
  try {
    const { country } = req.query;
    if (!country) {
      return error(res, 'country query parameter is required', 400);
    }

    const result = await db.query(
      'SELECT DISTINCT state AS name FROM office_locations WHERE country = $1 AND state IS NOT NULL AND state != \'\' ORDER BY state',
      [country]
    );
    const rows = result.rows.map((r, i) => ({ id: i + 1, name: r.name }));
    return success(res, rows);
  } catch (err) {
    next(err);
  }
};
