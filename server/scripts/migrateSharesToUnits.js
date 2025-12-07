// server/scripts/migrateSharesToUnits.js
// Run with: node server/scripts/migrateSharesToUnits.js
const mongoose = require('mongoose');
const Holding = require('../models/Holding'); // adjust path
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/finfolio';

async function migrate() {
  await mongoose.connect(url);
  const holdings = await Holding.find({ shares: { $exists: true } });
  for (const h of holdings) {
    const shares = h.shares;
    const avgPrice = h.avgPrice || (h.totalInvested && h.totalInvested / shares);
    h.units = shares; // for mutual funds units = shares
    h.avgCostPerUnit = avgPrice;
    h.totalInvested = (h.totalInvested || (shares * avgPrice));
    h.shares = undefined;
    h.avgPrice = undefined;
    await h.save();
    console.log(`Migrated holding ${h._id}`);
  }
  console.log('Migration done');
  process.exit(0);
}

migrate().catch(err => { console.error(err); process.exit(1); });
