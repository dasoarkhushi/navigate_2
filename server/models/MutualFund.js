// server/models/MutualFund.js
const mongoose = require('mongoose');

const NavPointSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  nav: { type: Number, required: true }
}, { _id: false });

const MutualFundSchema = new mongoose.Schema({
  schemeCode: { type: String, required: true, index: true }, // e.g., AMFI code
  isin: { type: String },
  name: { type: String, required: true },
  fundHouse: { type: String },
  schemeType: { type: String }, // Equity / Debt / Hybrid / Liquid ...
  expenseRatio: { type: Number },
  aum: { type: Number },
  latestNAV: { type: Number },
  latestNAVDate: { type: Date },
  navHistory: { type: [NavPointSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

MutualFundSchema.pre('save', function(next){
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('MutualFund', MutualFundSchema);
