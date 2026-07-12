const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TransferRequest = sequelize.define('TransferRequest', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' },
});

module.exports = TransferRequest;
