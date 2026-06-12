const db = require('../config/database');
const { success, error, paginated } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query('SELECT COUNT(*) FROM employees');
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      'SELECT * FROM employees ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [size, offset]
    );

    return paginated(res, result.rows, total, page, size);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM employees WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return error(res, 'Employee not found', 404);
    }
    return success(res, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const id = req.body.id || uuidv4();
    const filePath = req.file ? req.file.path : null;

    const fields = [
      'id', 'firstName', 'lastName', 'email', 'number', 'gender',
      'DOB', 'DOJ', 'CTC', 'Status', 'skill', 'UANNo', 'AadhaarNo',
      'workMode', 'ManagerName_id', 'ManagerName_name', 'designation',
      'employeeType', 'employeeID', 'ACNo', 'Bank_Name', 'IFSCCode',
      'address1', 'address2', 'country', 'state', 'city', 'Zip',
      'currentAddress1', 'currentAddress2', 'currentcountry', 'currentstate',
      'currentcity', 'currentZIP', 'employedBy', 'Client_loc', 'productType',
      'employeeCoordinates', 'band',
    ];

    const values = fields.map(f => req.body[f] || null);
    values[0] = id; // use generated UUID for id
    const valuePlaceholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const columns = fields.map(f => `"${f}"`).join(', ');

    if (filePath) {
      // Add file_path to the INSERT
      const sql = `INSERT INTO employees (${columns}, file_path, profile_img) VALUES (${valuePlaceholders}, $${values.length + 1}, $${values.length + 2}) RETURNING *`;
      values.push(filePath);
      values.push(`/uploads/${req.file.filename}`);
      const result = await db.query(sql, values);
      return success(res, result.rows[0], 201);
    }

    const sql = `INSERT INTO employees (${columns}) VALUES (${valuePlaceholders}) RETURNING *`;
    const result = await db.query(sql, values);
    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.searchByEmployeeAndProjectName = async (req, res, next) => {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return success(res, { employees: [], projects: [] });
    }

    const term = `%${searchTerm}%`;
    const employees = await db.query(
      `SELECT id, "firstName", "lastName", "employeeID", email FROM employees
       WHERE "firstName" ILIKE $1 OR "lastName" ILIKE $1 OR "employeeID" ILIKE $1 OR email ILIKE $1
       LIMIT 20`,
      [term]
    );

    const projects = await db.query(
      `SELECT id, project_name, project_code FROM projects
       WHERE project_name ILIKE $1 OR project_code ILIKE $1
       LIMIT 20`,
      [term]
    );

    return success(res, {
      employees: employees.rows,
      projects: projects.rows,
    });
  } catch (err) {
    next(err);
  }
};

exports.addAndUpdateSkills = async (req, res, next) => {
  try {
    const { employeeId, skills } = req.body;
    if (!employeeId) {
      return error(res, 'employeeId is required');
    }

    const skillsStr = Array.isArray(skills) ? skills.join(',') : (skills || '');
    const result = await db.query(
      'UPDATE employees SET skill = $1 WHERE id = $2 RETURNING id, skill',
      [skillsStr, employeeId]
    );

    if (result.rows.length === 0) {
      return error(res, 'Employee not found', 404);
    }
    return success(res, result.rows[0]);
  } catch (err) {
    next(err);
  }
};
