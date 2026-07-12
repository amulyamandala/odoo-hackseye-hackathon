const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResourceBooking = sequelize.define('ResourceBooking', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' },
});

module.exports = ResourceBooking;
