const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditRecord = sequelize.define('AuditRecord', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  condition: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' },
});

module.exports = AuditRecord;
