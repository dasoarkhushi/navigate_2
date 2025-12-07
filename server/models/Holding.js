// server/models/Holding.js (or update existing portfolio model)
const HoldingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  schemeCode: { type: String, required: true },
  units: { type: Number, required: true },              // allow fractional
  avgCostPerUnit: { type: Number, required: true },     // rupees per unit
  totalInvested: { type: Number, required: true },      // convenience
  createdAt: { type: Date, default: Date.now }
});
