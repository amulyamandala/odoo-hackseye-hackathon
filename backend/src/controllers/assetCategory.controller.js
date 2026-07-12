const assetCategoryService = require("../services/assetCategory.service");

exports.getCategories = async (req, res, next) => {
  try {
    const result = await assetCategoryService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const result = await assetCategoryService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const result = await assetCategoryService.create(req.body);
    res
      .status(201)
      .json({ message: "Category created successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const result = await assetCategoryService.update(req.params.id, req.body);
    res
      .status(200)
      .json({ message: "Category updated successfully", data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const result = await assetCategoryService.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
