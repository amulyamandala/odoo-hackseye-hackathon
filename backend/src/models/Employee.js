const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
      primaryKey: true
     },
  firstName: { type: DataTypes.STRING,
     allowNull: false 
    },
  lastName: { type: DataTypes.STRING,
     allowNull: false },
  email: { type: DataTypes.STRING,
     allowNull: false,
      unique: true },
  isActive: { type: DataTypes.BOOLEAN,
     defaultValue: true },
});

module.exports = Employee;
