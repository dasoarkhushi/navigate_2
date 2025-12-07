// server/routes/mutualFunds.js
const express = require('express');
const router = express.Router();
const MutualFund = require('../models/MutualFund');
const { fetchFundBySchemeCode, upsertFundFromSchemeCode } = require('../services/mfService');

// GET /api/mf/:schemeCode  -> returns cached DB doc or fetches and returns fresh
router.get('/:schemeCode', async (req, res) => {
  try {
    const { schemeCode } = req.params;
    let fund = await MutualFund.findOne({ schemeCode });
    if (!fund) {
      fund = await upsertFundFromSchemeCode(schemeCode);
    }
    res.json(fund);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch fund' });
  }
});

// GET /api/mf/:schemeCode/nav-history?days=365
router.get('/:schemeCode/nav-history', async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const days = parseInt(req.query.days || '365', 10);
    const fund = await MutualFund.findOne({ schemeCode });
    if (!fund) return res.status(404).json({ error: 'Not found' });
    // filter last N days
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const filtered = fund.navHistory.filter(p => new Date(p.date) >= cutoff);
    res.json({ schemeCode: fund.schemeCode, navHistory: filtered });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
