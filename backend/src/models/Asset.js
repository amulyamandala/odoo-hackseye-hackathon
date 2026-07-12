const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  serialNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Available' },
});

module.exports = Asset;
