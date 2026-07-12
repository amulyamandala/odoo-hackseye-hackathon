const express = require('express');
const router = express.Router();
const assetCategoryController = require('../controllers/assetCategory.controller');

router.post('/', assetCategoryController.createCategory);
router.get('/', assetCategoryController.getCategories);
router.get('/:id', assetCategoryController.getCategory);
router.put('/:id', assetCategoryController.updateCategory);
router.delete('/:id', assetCategoryController.deleteCategory);

module.exports = router;