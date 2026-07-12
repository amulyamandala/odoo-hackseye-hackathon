const sequelize = require('../config/database');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');
const AssetCategory = require('./AssetCategory');
const Asset = require('./Asset');
const AssetAllocation = require('./AssetAllocation');
const TransferRequest = require('./TransferRequest');
const ResourceBooking = require('./ResourceBooking');
const MaintenanceRequest = require('./MaintenanceRequest');
const AuditCycle = require('./AuditCycle');
const AuditRecord = require('./AuditRecord');
const Notification = require('./Notification');
const ActivityLog = require('./ActivityLog');

// Department & Employee
Department.hasOne(Employee, { as: 'head', foreignKey: 'departmentHeadId' });
Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Employee.belongsTo(Role, { foreignKey: 'roleId' });

// Asset & Category
Asset.belongsTo(AssetCategory, { foreignKey: 'categoryId' });

// Asset Allocation
AssetAllocation.belongsTo(Asset, { foreignKey: 'assetId' });
AssetAllocation.belongsTo(Employee, { foreignKey: 'employeeId' });

// Transfer Request
TransferRequest.belongsTo(Asset, { foreignKey: 'assetId' });
TransferRequest.belongsTo(Employee, { as: 'fromEmployee', foreignKey: 'fromEmployeeId' });
TransferRequest.belongsTo(Employee, { as: 'toEmployee', foreignKey: 'toEmployeeId' });
TransferRequest.belongsTo(Department, { as: 'fromDepartment', foreignKey: 'fromDepartmentId' });
TransferRequest.belongsTo(Department, { as: 'toDepartment', foreignKey: 'toDepartmentId' });

// Resource Booking
ResourceBooking.belongsTo(Asset, { foreignKey: 'assetId' });
ResourceBooking.belongsTo(Employee, { foreignKey: 'employeeId' });

// Maintenance Request
MaintenanceRequest.belongsTo(Asset, { foreignKey: 'assetId' });
MaintenanceRequest.belongsTo(Employee, { as: 'reportedBy', foreignKey: 'reportedById' });

// Audit
AuditRecord.belongsTo(AuditCycle, { foreignKey: 'auditCycleId' });
AuditRecord.belongsTo(Asset, { foreignKey: 'assetId' });
AuditRecord.belongsTo(Employee, { as: 'auditedBy', foreignKey: 'auditedById' });

// Notification
Notification.belongsTo(Employee, { as: 'recipient', foreignKey: 'recipientId' });

// Activity Log
ActivityLog.belongsTo(Employee, { as: 'actor', foreignKey: 'actorId' });

const db = {
  sequelize,
  Department,
  Role,
  Employee,
  AssetCategory,
  Asset,
  AssetAllocation,
  TransferRequest,
  ResourceBooking,
  MaintenanceRequest,
  AuditCycle,
  AuditRecord,
  Notification,
  ActivityLog
};

module.exports = db;
