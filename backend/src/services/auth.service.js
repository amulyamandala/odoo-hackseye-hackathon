const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Employee, Role, Department } = require("../models");

class AuthService {
  async register(data) {
    const { firstName, lastName, email, password, roleId, departmentId } = data;

    // Check if user exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      throw new Error("Email already registered");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create employee
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId,
      departmentId,
      isActive: true,
    });

    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    };
  }

  async login(email, password) {
    const employee = await Employee.findOne({
      where: { email },
      include: [{ model: Role }, { model: Department }],
    });

    if (!employee) {
      throw new Error("Invalid credentials");
    }

    if (!employee.isActive) {
      throw new Error("Account is deactivated");
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Update last login
    await employee.update({ lastLogin: new Date() });

    // Generate token
    const payload = {
      id: employee.id,
      role: employee.Role ? employee.Role.name : null,
      departmentId: employee.departmentId,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" },
    );

    return {
      token,
      user: {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        role: payload.role,
        department: employee.Department ? employee.Department.name : null,
      },
    };
  }

  async changePassword(userId, oldPassword, newPassword) {
    const employee = await Employee.findByPk(userId);
    if (!employee) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, employee.password);
    if (!isMatch) {
      throw new Error("Incorrect old password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await employee.update({ password: hashedPassword });
    return true;
  }
}

module.exports = new AuthService();
