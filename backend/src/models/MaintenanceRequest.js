const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MaintenanceRequest = sequelize.define('MaintenanceRequest', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  issueDescription: { type: DataTypes.STRING, allowNull: false },
  cost: { type: DataTypes.DECIMAL(10, 2) },
  status: { type: DataTypes.STRING, defaultValue: 'Open' },
});

module.exports = MaintenanceRequest;
