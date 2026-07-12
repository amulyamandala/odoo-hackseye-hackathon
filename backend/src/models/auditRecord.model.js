const mongoose = require('mongoose');

const auditRecordSchema = new mongoose.Schema({
  auditCycle: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditCycle', required: true },
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  auditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  condition: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('AuditRecord', auditRecordSchema);
