const { Department, Employee } = require("../models");

class DepartmentService {
  async getAll() {
    return await Department.findAll({
      include: [
        {
          model: Employee,
          as: "head",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  }

  async getById(id) {
    const dept = await Department.findByPk(id, {
      include: [
        {
          model: Employee,
          as: "head",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    if (!dept) throw new Error("Department not found");
    return dept;
  }

  async create(data) {
    return await Department.create(data);
  }

  async update(id, data) {
    const dept = await this.getById(id);
    return await dept.update(data);
  }

  async delete(id) {
    const dept = await this.getById(id);
    await dept.destroy();
    return { message: "Department deleted successfully" };
  }
}

module.exports = new DepartmentService();
