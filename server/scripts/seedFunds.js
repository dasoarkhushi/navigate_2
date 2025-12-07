// server/scripts/seedFunds.js
const mongoose = require('mongoose');
const { upsertFundFromSchemeCode } = require('../services/mfService');
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/finfolio';

const sampleSchemeCodes = ['120503','120563']; // replace with real scheme codes (example)

async function seed() {
  await mongoose.connect(url);
  for (const sc of sampleSchemeCodes) {
    try {
      const fund = await upsertFundFromSchemeCode(sc);
      console.log('Seeded', fund.schemeCode, fund.name);
    } catch (e) {
      console.error('Fail', sc, e.message);
    }
  }
  process.exit(0);
}
seed();
