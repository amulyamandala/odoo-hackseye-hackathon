const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditCycle = sequelize.define('AuditCycle', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Planned' },
});

module.exports = AuditCycle;
