// server/services/mfApis.js

// const axios = require("axios"); // ❌ NOT USED ANYMORE

const AMFI_NAV_ALL_URL = "https://www.amfiindia.com/spages/NAVAll.txt"; // official AMFI NAV dump

// ---------- AMFI HELPERS (Daily NAV) ----------

async function fetchAmfiNavRaw() {
  const res = await fetch(AMFI_NAV_ALL_URL, {
    method: "GET",
    headers: {
      "User-Agent": "NAVigate/1.0",
      Accept: "text/plain",
    },
  });

  if (!res.ok) {
    throw new Error(`AMFI NAV fetch failed: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  return text;
}

// Parse AMFI NAVAll.txt into array of objects
function parseAmfiNav(rawText) {
  return rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && /^\d+;/.test(line)) // lines starting with scheme code
    .map((line) => {
      const [
        schemeCode,
        isinDivPayout,
        isinDivReinvest,
        schemeName,
        navStr,
        date,
      ] = line.split(";");
      return {
        schemeCode: schemeCode?.trim(),
        schemeName: (schemeName || "").trim(),
        nav: navStr ? parseFloat(navStr) : null,
        date: date ? date.trim() : null,
        isinDivPayout: isinDivPayout ? isinDivPayout.trim() : null,
        isinDivReinvest: isinDivReinvest ? isinDivReinvest.trim() : null,
      };
    });
}

async function searchSchemesByName(query) {
  const raw = await fetchAmfiNavRaw();
  const parsed = parseAmfiNav(raw);
  const q = (query || "").toLowerCase();
  return parsed.filter((s) => s.schemeName.toLowerCase().includes(q));
}

async function getLatestNavBySchemeCode(schemeCode) {
  const raw = await fetchAmfiNavRaw();
  const parsed = parseAmfiNav(raw);
  return parsed.find((s) => s.schemeCode === String(schemeCode));
}

// ---------- VALUE RESEARCH (via RapidAPI) ----------
// (ratings / performance / risk)

const VRO_HOST = "valueresearchonline.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // set this in your .env

async function callValueResearch(path, params = {}) {
  if (!RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY is not set in environment variables");
  }

  // Build URL with query params
  const url = new URL(`https://${VRO_HOST}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": VRO_HOST,
    },
  });

  if (!res.ok) {
    throw new Error(
      `ValueResearch API error: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  return data;
}

// Adjust path/params based on the RapidAPI docs you’re using
async function getVroSchemeDetails(schemeCode) {
  // Example: "/funds/get-fund-details" – update if your RapidAPI path differs
  return callValueResearch("/funds/get-fund-details", { SchemeCode: schemeCode });
}

async function getVroRatingsAndRisk(schemeCode) {
  // Example: "/funds/get-fund-performance"
  return callValueResearch("/funds/get-fund-performance", { SchemeCode: schemeCode });
}

module.exports = {
  fetchAmfiNavRaw,
  parseAmfiNav,
  searchSchemesByName,
  getLatestNavBySchemeCode,
  getVroSchemeDetails,
  getVroRatingsAndRisk,
};
