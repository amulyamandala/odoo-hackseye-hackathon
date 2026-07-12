const mongoose = require('mongoose');

const assetAllocationSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  allocatedDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('AssetAllocation', assetAllocationSchema);
