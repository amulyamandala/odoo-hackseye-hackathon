const mongoose = require('mongoose');

const auditCycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: 'Planned' }
}, { timestamps: true });

module.exports = mongoose.model('AuditCycle', auditCycleSchema);
