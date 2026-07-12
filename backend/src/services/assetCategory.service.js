const { AssetCategory } = require("../models");

class AssetCategoryService {
  async getAll() {
    return await AssetCategory.findAll();
  }

  async getById(id) {
    const category = await AssetCategory.findByPk(id);
    if (!category) throw new Error("AssetCategory not found");
    return category;
  }

  async create(data) {
    return await AssetCategory.create(data);
  }

  async update(id, data) {
    const category = await this.getById(id);
    return await category.update(data);
  }

  async delete(id) {
    const category = await this.getById(id);
    await category.destroy();
    return { message: "AssetCategory deleted successfully" };
  }
}

module.exports = new AssetCategoryService();
