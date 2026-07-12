const { Role } = require("../models");

class RoleService {
  async getAll() {
    return await Role.findAll();
  }

  async getById(id) {
    const role = await Role.findByPk(id);
    if (!role) throw new Error("Role not found");
    return role;
  }

  async create(data) {
    return await Role.create(data);
  }

  async update(id, data) {
    const role = await this.getById(id);
    return await role.update(data);
  }

  async delete(id) {
    const role = await this.getById(id);
    await role.destroy();
    return { message: "Role deleted successfully" };
  }
}

module.exports = new RoleService();
