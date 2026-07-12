const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ActivityLog = sequelize.define('ActivityLog', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  action: { type: DataTypes.STRING, allowNull: false },
  entityType: { type: DataTypes.STRING, allowNull: false },
  entityId: { type: DataTypes.UUID, allowNull: false },
  details: { type: DataTypes.JSON },
});

module.exports = ActivityLog;
