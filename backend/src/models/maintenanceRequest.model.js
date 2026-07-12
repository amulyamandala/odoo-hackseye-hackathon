const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  issueDescription: { type: String, required: true },
  cost: { type: Number },
  status: { type: String, default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
