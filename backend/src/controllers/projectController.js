const db = require('../config/database');
const { success, error, paginated } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

exports.getProjects = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;

    const countResult = await db.query('SELECT COUNT(*) FROM projects');
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT p.*, c.client_name, d.domain_name
       FROM projects p
       LEFT JOIN clients c ON p.client_id = c.id
       LEFT JOIN domains d ON p.domain_id = d.id
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [size, offset]
    );

    return paginated(res, result.rows, total, page, size);
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT p.*, c.client_name, d.domain_name
       FROM projects p
       LEFT JOIN clients c ON p.client_id = c.id
       LEFT JOIN domains d ON p.domain_id = d.id
       WHERE p.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return error(res, 'Project not found', 404);
    }
    return success(res, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.searchEmployees = async (req, res, next) => {
  try {
    const { query: searchQuery } = req.query;
    if (!searchQuery) {
      return success(res, []);
    }

    const term = `%${searchQuery}%`;
    const result = await db.query(
      `SELECT id, "firstName", "lastName", "employeeID"
       FROM employees
       WHERE "firstName" ILIKE $1 OR "lastName" ILIKE $1 OR "employeeID" ILIKE $1
       LIMIT 20`,
      [term]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getAllDomains = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM domains WHERE status = \'ACTIVE\' ORDER BY domain_name');
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.searchResource = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const result = await db.query(
        `SELECT pr.*, e."firstName", e."lastName", e."employeeID"
         FROM project_resources pr
         JOIN employees e ON pr.employee_id = e.id
         WHERE pr.project_id = $1`,
        [id]
      );
      return success(res, result.rows);
    }

    const { query: searchQuery } = req.query;
    if (searchQuery) {
      const term = `%${searchQuery}%`;
      const result = await db.query(
        `SELECT e.id, e."firstName", e."lastName", e."employeeID", e.designation
         FROM employees e
         WHERE e."firstName" ILIKE $1 OR e."lastName" ILIKE $1 OR e."employeeID" ILIKE $1
         AND e."Status" = 'ACTIVE'
         LIMIT 20`,
        [term]
      );
      return success(res, result.rows);
    }

    const result = await db.query(
      `SELECT id, "firstName", "lastName", "employeeID", designation
       FROM employees WHERE "Status" = 'ACTIVE'`
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.searchByProjectOrClientName = async (req, res, next) => {
  try {
    const { query: searchQuery } = req.query;
    if (!searchQuery) {
      return success(res, { projects: [], clients: [] });
    }

    const term = `%${searchQuery}%`;
    const projects = await db.query(
      `SELECT id, project_name, project_code FROM projects
       WHERE project_name ILIKE $1 OR project_code ILIKE $1
       LIMIT 20`,
      [term]
    );

    const clients = await db.query(
      `SELECT id, client_name, client_code FROM clients
       WHERE client_name ILIKE $1 OR client_code ILIKE $1
       LIMIT 20`,
      [term]
    );

    return success(res, { projects: projects.rows, clients: clients.rows });
  } catch (err) {
    next(err);
  }
};

exports.searchClients = async (req, res, next) => {
  try {
    const { query: searchQuery } = req.query;
    if (!searchQuery) {
      return success(res, []);
    }

    const term = `%${searchQuery}%`;
    const result = await db.query(
      `SELECT id, client_name, client_code FROM clients
       WHERE client_name ILIKE $1 OR client_code ILIKE $1
       LIMIT 20`,
      [term]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const result = await db.query('SELECT * FROM clients WHERE id = $1', [clientId]);
    if (result.rows.length === 0) {
      return error(res, 'Client not found', 404);
    }
    return success(res, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const id = req.body.id || uuidv4();
    const {
      project_name, project_code, client_id, domain_id,
      start_date, end_date, description, status,
    } = req.body;

    const result = await db.query(
      `INSERT INTO projects (id, project_name, project_code, client_id, domain_id, start_date, end_date, description, status, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [id, project_name, project_code, client_id, domain_id, start_date, end_date, description, status || 'ACTIVE', req.user?.id]
    );
    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.createCostIncurred = async (req, res, next) => {
  try {
    const id = uuidv4();
    const { project_id, cost_type, amount, description, incurred_date } = req.body;

    const result = await db.query(
      `INSERT INTO cost_incurred (id, project_id, cost_type, amount, description, incurred_date, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, project_id, cost_type, amount, description, incurred_date, req.user?.id]
    );
    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.getAllCostIncurred = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const result = await db.query(
      'SELECT * FROM cost_incurred WHERE project_id = $1 ORDER BY incurred_date DESC',
      [projectId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.resourceDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT pr.*, e."firstName", e."lastName", e."employeeID", e.designation, e.email, e.number
       FROM project_resources pr
       JOIN employees e ON pr.employee_id = e.id
       WHERE pr.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return error(res, 'Resource not found', 404);
    }
    return success(res, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.createResource = async (req, res, next) => {
  try {
    const id = uuidv4();
    const {
      project_id, employee_id, role, allocation_percentage,
      start_date, end_date, billing_rate, currency,
    } = req.body;

    const result = await db.query(
      `INSERT INTO project_resources (id, project_id, employee_id, role, allocation_percentage, start_date, end_date, billing_rate, currency)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, project_id, employee_id, role, allocation_percentage, start_date, end_date, billing_rate, currency || 'INR']
    );
    return success(res, result.rows[0], 201);
  } catch (err) {
    next(err);
  }
};

exports.deleteCostIncurred = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM cost_incurred WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return error(res, 'Cost entry not found', 404);
    }
    return success(res, { message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getAllResources = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const result = await db.query(
      `SELECT pr.*, e."firstName", e."lastName", e."employeeID", e.designation
       FROM project_resources pr
       JOIN employees e ON pr.employee_id = e.id
       WHERE pr.project_id = $1
       ORDER BY pr.created_at`,
      [projectId]
    );
    return success(res, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.deleteResource = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM project_resources WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return error(res, 'Resource not found', 404);
    }
    return success(res, { message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};
