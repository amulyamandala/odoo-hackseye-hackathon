const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetCategory = sequelize.define('AssetCategory', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING },
});

module.exports = AssetCategory;
