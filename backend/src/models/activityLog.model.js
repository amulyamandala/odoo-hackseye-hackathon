const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  details: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
