const db = require("../config/database");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");
const { success, error } = require("../utils/response");
const { v4: uuidv4 } = require("uuid");
const { createOTP, validateOTP } = require("../utils/otp");
const { sendEmail } = require("../utils/email");
const { seal, unseal } = require("../utils/seal");
const {
  otpEmailTemplate,
  forgotPasswordEmailTemplate,
} = require("../emails/templates");

function toProfile(row) {
  return {
    id: row.id,
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
    role: row.role,
    employeeID: row.employeeID,
  };
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return error(res, "Email and password are required");
    }

    const result = await db.query("SELECT * FROM employees WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return error(res, "Invalid email or password", 401);
    }

    const employee = result.rows[0];
    if (!employee.password_hash) {
      return error(res, "Account not set up yet. Use forgot password.", 400);
    }

    const valid = await comparePassword(password, employee.password_hash);
    if (!valid) {
      return error(res, "Invalid email or password", 401);
    }

    if (employee.Status !== "ACTIVE") {
      return error(res, "Account is inactive", 403);
    }

    const tokenPayload = {
      id: employee.id,
      email: employee.email,
      role: employee.role,
      employeeID: employee.employeeID,
    };
    const accessToken = signToken(tokenPayload);

    const profile = toProfile(employee);

    return success(res, {
      user: { id: employee.id, email: employee.email, role: employee.role },
      session: { access_token: accessToken, token_type: "bearer" },
      profile,
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
      return error(res, "Email and password are required");
    }

    const existing = await db.query(
      "SELECT id FROM employees WHERE email = $1",
      [email],
    );
    if (existing.rows.length > 0) {
      return error(res, "Email already registered", 409);
    }

    const passwordHash = await hashPassword(password);
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO employees (id, email, password_hash, "firstName", "lastName", role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, email, passwordHash, firstName || "", lastName || "", "EMPLOYEE"],
    );

    const employee = result.rows[0];
    const profile = toProfile(employee);

    return success(
      res,
      {
        user: { id: employee.id, email: employee.email, role: employee.role },
        profile,
      },
      201,
    );
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return success(res, { message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

exports.session = async (req, res, next) => {
  try {
    if (!req.user) {
      return success(res, { session: null, profile: null });
    }

    const result = await db.query("SELECT * FROM employees WHERE id = $1", [
      req.user.id,
    ]);
    if (result.rows.length === 0) {
      return success(res, { session: null, profile: null });
    }

    const employee = result.rows[0];
    const accessToken = signToken({
      id: employee.id,
      email: employee.email,
      role: employee.role,
      employeeID: employee.employeeID,
    });

    return success(res, {
      session: {
        access_token: accessToken,
        token_type: "bearer",
        user: { id: employee.id },
      },
      profile: toProfile(employee),
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    if (!req.user) {
      return error(res, "Not authenticated", 401);
    }

    const result = await db.query("SELECT * FROM employees WHERE id = $1", [
      req.user.id,
    ]);
    if (result.rows.length === 0) {
      return error(res, "User not found", 404);
    }

    return success(res, { user: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// ---- OTP & Password Reset ----

exports.otp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return error(res, "Email is required");
    }

    const user = await db.query("SELECT id FROM employees WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return error(res, "No account found with this email", 404);
    }

    const result = await createOTP(email, "PASSWORD_RESET");
    if (result.error) {
      return error(res, result.error, 429);
    }

    console.log(
      `Generated OTP for ${email}: ${result.otp} (expires at ${result.expiresAt})`,
    );

    const userName = email.split("@")[0];
    // await sendEmail({
    //   to: email,
    //   subject: "Your OTP Code",
    //   html: otpEmailTemplate({ otp: result.otp, userName }),
    // });

    const sealedToken = seal({
      email,
      expiresAt: result.expiresAt.toISOString(),
    });

    const responseData = {
      otpsealedobject: sealedToken,
    };

    if (process.env.NODE_ENV === "development") {
      responseData.otp = result.otp;
    }

    return success(res, responseData);
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp, purpose } = req.body;
    if (!email || !otp) {
      return error(res, "Email and OTP are required");
    }

    const validation = await validateOTP(
      email,
      otp,
      purpose || "PASSWORD_RESET",
    );
    if (!validation.valid) {
      return error(res, validation.reason, 400);
    }

    return success(res, { message: "OTP verified successfully" });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return error(res, "Email is required");
    }

    const user = await db.query(
      'SELECT id, "firstName" FROM employees WHERE email = $1',
      [email],
    );
    if (user.rows.length === 0) {
      return success(res, {
        message: "If the email exists, a reset OTP has been sent",
      });
    }

    const result = await createOTP(email, "PASSWORD_RESET");
    if (result.error) {
      return error(res, result.error, 429);
    }

    // await sendEmail({
    //   to: email,
    //   subject: "Password Reset OTP",
    //   html: forgotPasswordEmailTemplate({
    //     otp: result.otp,
    //     userName: user.rows[0].firstName || email.split("@")[0],
    //   }),
    // });

    const sealedToken = seal({
      email,
      expiresAt: result.expiresAt.toISOString(),
    });

    const responseData = {
      otpsealedobject: sealedToken,
    };

    if (process.env.NODE_ENV === "development") {
      responseData.otp = result.otp;
    }

    return success(res, responseData);
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { otpsealedobject, email: directEmail, otp, newPassword } = req.body;

    let email = directEmail;

    if (otpsealedobject) {
      const decrypted = unseal(otpsealedobject);
      if (!decrypted) {
        return error(res, "Invalid or tampered sealed object", 400);
      }
      if (new Date(decrypted.expiresAt) < new Date()) {
        return error(res, "Sealed object has expired", 400);
      }
      email = decrypted.email;
    }

    if (!email || !otp || !newPassword) {
      return error(
        res,
        "Email (or sealed object), OTP, and new password are required",
      );
    }

    if (newPassword.length < 8) {
      return error(res, "Password must be at least 8 characters");
    }

    const validation = await validateOTP(email, otp, "PASSWORD_RESET");
    if (!validation.valid) {
      return error(res, validation.reason, 400);
    }

    const passwordHash = await hashPassword(newPassword);
    const result = await db.query(
      "UPDATE employees SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL WHERE email = $2 RETURNING id",
      [passwordHash, email],
    );

    if (result.rows.length === 0) {
      return error(res, "User not found", 404);
    }

    return success(res, { message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};
