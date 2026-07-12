const mongoose = require('mongoose');

const transferRequestSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  fromEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  toEmployee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  fromDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  toDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('TransferRequest', transferRequestSchema);
