// server/services/mfService.js
const axios = require('axios');
const MutualFund = require('../models/MutualFund');

const MFAPI_BASE = 'https://api.mfapi.in'; // free for prototyping

async function fetchFundBySchemeCode(schemeCode) {
  const resp = await axios.get(`${MFAPI_BASE}/api/indfund/${schemeCode}`);
  const data = resp.data;
  // map mfapi response
  const latest = data.data[0];
  return {
    schemeCode: data.meta.scheme_code || schemeCode,
    name: data.meta.scheme_name,
    fundHouse: data.meta.fund_house,
    schemeType: data.meta.scheme_type,
    latestNAV: parseFloat(latest.nav),
    latestNAVDate: new Date(latest.date),
    navHistory: data.data.map(d => ({ date: new Date(d.date), nav: parseFloat(d.nav) }))
  };
}

async function upsertFundFromSchemeCode(schemeCode) {
  const mapped = await fetchFundBySchemeCode(schemeCode);
  return MutualFund.findOneAndUpdate(
    { schemeCode: mapped.schemeCode },
    { $set: mapped },
    { upsert: true, new: true }
  );
}

module.exports = { fetchFundBySchemeCode, upsertFundFromSchemeCode };
