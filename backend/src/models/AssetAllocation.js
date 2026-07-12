const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetAllocation = sequelize.define('AssetAllocation', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  allocatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returnDate: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, defaultValue: 'Active' },
});

module.exports = AssetAllocation;
