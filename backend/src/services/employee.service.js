const { Employee, Department, Role } = require("../models");
const bcrypt = require("bcryptjs");

class EmployeeService {
  async getAll() {
    return await Employee.findAll({ 
      attributes: { exclude: ['password'] },
      include: [{ model: Department }, { model: Role }] 
    });
  }

  async getById(id) {
    const emp = await Employee.findByPk(id, { 
      attributes: { exclude: ['password'] },
      include: [{ model: Department }, { model: Role }] 
    });
    if (!emp) throw new Error("Employee not found");
    return emp;
  }

  async create(data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const emp = await Employee.create(data);
    const empData = emp.toJSON();
    delete empData.password;
    return empData;
  }

  async update(id, data) {
    const emp = await this.getById(id);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await emp.update(data);
    const empData = emp.toJSON();
    delete empData.password;
    return empData;
  }

  async delete(id) {
    const emp = await this.getById(id);
    await emp.destroy();
    return { message: "Employee deleted successfully" };
  }
}

module.exports = new EmployeeService();
