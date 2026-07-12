const sequelize = require('../config/database');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');
const AssetCategory = require('./AssetCategory');
const Asset = require('./Asset');

// Foreign Key Relationships
Department.hasOne(Employee, { as: 'head', foreignKey: 'departmentHeadId' });
Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Employee.belongsTo(Role, { foreignKey: 'roleId' });
Asset.belongsTo(AssetCategory, { foreignKey: 'categoryId' });

const db = {
  sequelize,
  Department,
  Role,
  Employee,
  AssetCategory,
  Asset,
};

module.exports = db;
