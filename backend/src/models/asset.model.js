const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  serialNumber: { type: String, unique: true, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'AssetCategory' },
  status: { type: String, default: 'Available' },
}, { timestamps: true });

module.exports = mongoose.model('Asset', assetSchema);
