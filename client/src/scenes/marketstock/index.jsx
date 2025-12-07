/*import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
 */

/* import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import axios from "axios";

const stockList = ["RELIANCE.BO", "TCS.BO", "INFY.BO", "HDFCBANK.BO", "ICICIBANK.BO"];

export default function MarketDashboard() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const results = await Promise.all(
        stockList.map((symbol) =>
          axios.get(`http://localhost:{PORT}/api/stocks?symbols=ICICIBANK.BO`)

        )
      );
      const formatted = {};
      results.forEach((res, idx) => {
        const resultArr = res.data?.quoteResponse?.result;
        if (Array.isArray(resultArr) && resultArr.length > 0) {
          formatted[stockList[idx]] = resultArr[0];
        }
      });
      setData(formatted);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Market Dashboard</Typography>

      <TextField
        variant="outlined"
        placeholder="Search stock (e.g. TCS)"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3}>
        {Object.keys(data).filter((key) => key.includes(query)).map((key) => {
          const stock = data[key];
          const change = stock?.regularMarketChangePercent?.toFixed(2);
          const isUp = parseFloat(change) >= 0;

          return (
            <Grid item xs={12} md={6} lg={4} key={stock.symbol}>
              <Card sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{stock.shortName}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">{stock.symbol}</Typography>
                  <Box mt={2} mb={2}>
                    <Typography variant="h4">
                      ₹{stock.regularMarketPrice?.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isUp ? 'green' : 'red', display: 'flex', alignItems: 'center' }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {change}%
                    </Typography>
                  </Box>
                  <Typography variant="body2">Day High: ₹{stock.regularMarketDayHigh}</Typography>
                  <Typography variant="body2">Day Low: ₹{stock.regularMarketDayLow}</Typography>
                  <Typography variant="body2">Volume: {stock.regularMarketVolume?.toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
 */


/* import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const stockList = ["RELIANCE.BO", "TCS.BO", "INFY.BO", "HDFCBANK.BO", "ICICIBANK.BO"];

export default function MarketDashboard() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const symbols = stockList.join(",");
      const response = await fetch(`http://localhost:5000/api/stocks?symbols=${symbols}`);
      const result = await response.json();
      const resultArr = result?.quoteResponse?.result || [];

      const formatted = {};
      resultArr.forEach((stock) => {
        formatted[stock.symbol] = stock;
      });

      setData(formatted);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Market Dashboard</Typography>

      <TextField
        variant="outlined"
        placeholder="Search stock (e.g. TCS)"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3}>
        {Object.keys(data).filter((key) => key.includes(query)).map((key) => {
          const stock = data[key];
          const change = stock?.regularMarketChangePercent?.toFixed(2);
          const isUp = parseFloat(change) >= 0;

          return (
            <Grid item xs={12} md={6} lg={4} key={stock.symbol}>
              <Card sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{stock.shortName}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">{stock.symbol}</Typography>
                  <Box mt={2} mb={2}>
                    <Typography variant="h4">
                      ₹{stock.regularMarketPrice?.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isUp ? 'green' : 'red', display: 'flex', alignItems: 'center' }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {change}%
                    </Typography>
                  </Box>
                  <Typography variant="body2">Day High: ₹{stock.regularMarketDayHigh}</Typography>
                  <Typography variant="body2">Day Low: ₹{stock.regularMarketDayLow}</Typography>
                  <Typography variant="body2">Volume: {stock.regularMarketVolume?.toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
 */


/* import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const stockList = ["RELIANCE.BSE", "TCS.BSE", "HDFCBANK.BSE", "INFY.BSE", "ICICIBANK.BSE"];
const API_KEY = "d1j5ag9r01qhbuvtjc8gd1j5ag9r01qhbuvtjc90g"; // 🔑 Replace this with your real key

export default function Market() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const results = await Promise.all(
        stockList.map(symbol =>
          fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
            .then(res => res.json())
            .then(json => ({ symbol, ...json }))
        )
      );

      const formatted = {};
      results.forEach(stock => {
        formatted[stock.symbol] = stock;
      });

      setData(formatted);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Market</Typography>

      <TextField
        variant="outlined"
        placeholder="Search stock (e.g. TCS)"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3}>
        {Object.keys(data).filter(key => key.includes(query)).map(key => {
          const stock = data[key];
          const change = stock.d !== undefined ? ((stock.c - stock.pc) / stock.pc * 100).toFixed(2) : "N/A";
          const isUp = parseFloat(change) >= 0;

          return (
            <Grid item xs={12} md={6} lg={4} key={stock.symbol}>
              <Card sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{stock.symbol}</Typography>
                  <Box mt={2} mb={2}>
                    <Typography variant="h4">₹{stock.c?.toFixed(2)}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isUp ? 'green' : 'red', display: 'flex', alignItems: 'center' }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {change}%
                    </Typography>
                  </Box>
                  <Typography variant="body2">Open: ₹{stock.o}</Typography>
                  <Typography variant="body2">High: ₹{stock.h}</Typography>
                  <Typography variant="body2">Low: ₹{stock.l}</Typography>
                  <Typography variant="body2">Previous Close: ₹{stock.pc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
 */


// client/src/pages/Market.jsx
/* import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  CircularProgress
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
];

const Market = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const response = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);
          const json = await response.json();
          return { symbol, ...json };
        })
      );

      const formatted = {};
      results.forEach((stock) => {
        formatted[stock.symbol] = stock;
      });

      setData(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box m="20px">
      <Header title="MARKET" subtitle="Live NSE Stock Tracker via Yahoo Finance" />

      <Box mb="20px">
        <TextField
          fullWidth
          placeholder="Search stock (e.g. TCS)"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <CircularProgress sx={{ color: colors.greenAccent[400] }} />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
          {Object.keys(data)
            .filter((key) => key.includes(query))
            .map((key) => {
              const stock = data[key];
              const price = stock.regularMarketPrice || 0;
              const prev = stock.regularMarketPreviousClose || 0;
              const change = prev !== 0 ? (((price - prev) / prev) * 100).toFixed(2) : "0.00";
              const isUp = parseFloat(change) >= 0;

              return (
                <Box
                  key={stock.symbol}
                  gridColumn="span 4"
                  backgroundColor={colors.primary[400]}
                  borderRadius="8px"
                  p="20px"
                >
                  <Typography variant="h6" fontWeight="600" color={colors.greenAccent[400]}>
                    {stock.symbol}
                  </Typography>

                  <Box mt="10px" mb="10px">
                    <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
                      ₹{price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isUp ? colors.greenAccent[500] : colors.redAccent[500],
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                      {change}%
                    </Typography>
                  </Box>

                  <Typography variant="body2" color={colors.grey[300]}>
                    Open: ₹{stock.regularMarketOpen || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    High: ₹{stock.regularMarketDayHigh || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    Low: ₹{stock.regularMarketDayLow || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    Prev Close: ₹{stock.regularMarketPreviousClose || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[500]} mt="4px">
                    Last Updated: {stock.regularMarketTime
                      ? new Date(stock.regularMarketTime * 1000).toLocaleTimeString()
                      : "N/A"}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
};

export default Market;

 */

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  CircularProgress,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// 🔹 Base mutual funds (manual list) – this is your master list
const baseMutualFunds = [
  { code: "120503", name: "SBI Bluechip Fund - Direct Plan - Growth", category: "Large Cap" },
  { code: "119551", name: "HDFC Top 100 Fund - Direct Plan - Growth", category: "Large Cap" },
  { code: "118834", name: "ICICI Prudential Equity & Debt Fund - Direct Plan - Growth", category: "Hybrid" },
  { code: "101206", name: "Nippon India Small Cap Fund - Direct Plan - Growth", category: "Small Cap" },
  { code: "120823", name: "Axis Bluechip Fund - Direct Plan - Growth", category: "Large Cap" },
  { code: "126497", name: "Mirae Asset Large Cap Fund - Direct Plan - Growth", category: "Large Cap" },
  { code: "118574", name: "Kotak Emerging Equity Fund - Direct Plan - Growth", category: "Mid Cap" },
  { code: "125354", name: "SBI Small Cap Fund - Direct Plan - Growth", category: "Small Cap" },
  { code: "102885", name: "HDFC Mid-Cap Opportunities Fund - Direct Plan - Growth", category: "Mid Cap" },
  { code: "120759", name: "Axis Small Cap Fund - Direct Plan - Growth", category: "Small Cap" },
  { code: "112588", name: "DSP Midcap Fund - Direct Plan - Growth", category: "Mid Cap" },
  { code: "135781", name: "UTI Nifty 50 Index Fund - Direct Plan - Growth", category: "Index" },
  { code: "135779", name: "HDFC Nifty 50 Index Fund - Direct Plan - Growth", category: "Index" },
  { code: "129865", name: "ICICI Prudential Nifty Next 50 Index Fund - Direct Plan - Growth", category: "Index" },
  { code: "145678", name: "SBI Equity Hybrid Fund - Direct Plan - Growth", category: "Hybrid" },
  { code: "145679", name: "HDFC Hybrid Equity Fund - Direct Plan - Growth", category: "Hybrid" },
  { code: "110458", name: "Axis Long Term Equity Fund - Direct Plan - Growth", category: "ELSS" },
  { code: "110459", name: "Mirae Asset Tax Saver Fund - Direct Plan - Growth", category: "ELSS" },
  { code: "110460", name: "Canara Robeco Equity Tax Saver - Direct Plan - Growth", category: "ELSS" },
  { code: "130234", name: "ICICI Prudential Technology Fund - Direct Plan - Growth", category: "Sectoral/Thematic" },
  { code: "130235", name: "Tata Digital India Fund - Direct Plan - Growth", category: "Sectoral/Thematic" },
];

// Filters must match category values
const CATEGORY_FILTERS = [
  "All",
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Hybrid",
  "ELSS",
  "Index",
  "Sectoral/Thematic",
];

const Market = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // 👇 This will hold manual list + API data merged
  const [funds, setFunds] = useState(baseMutualFunds);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // 💰 SIP calculator state
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);
  const [sipResult, setSipResult] = useState(null);

  // 🔄 Fetch live NAV from backend and merge into baseMutualFunds
  const fetchData = async () => {
    try {
      setLoading(true);

      const results = await Promise.all(
        baseMutualFunds.map(async (mf) => {
          try {
            const response = await fetch(
              `http://localhost:3001/api/mutualfund?code=${mf.code}`
            );
            const json = await response.json();

            // Expected backend JSON example:
            // {
            //   code: "120503",
            //   schemeName: "SBI Bluechip Fund - Direct Plan - Growth",
            //   fundHouse: "SBI Mutual Fund",
            //   category: "Large Cap",
            //   nav: 104.23,
            //   prevNav: 103.10,
            //   oneYearReturn: 22.5,
            //   lastUpdated: "2025-12-07T15:30:00Z"
            // }
            return { ...mf, ...json };
          } catch (e) {
            console.error("Error for code:", mf.code, e);
            // If API fails for one fund, at least keep manual info
            return mf;
          }
        })
      );

      setFunds(results);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching mutual fund data:", err);
      // fallback: just manual list
      setFunds(baseMutualFunds);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // 💰 SIP calculation (monthly, compounded monthly)
  const handleCalculateSIP = () => {
    const P = Number(sipAmount);
    const annualRate = Number(sipRate);
    const years = Number(sipYears);

    if (!P || !annualRate || !years) {
      setSipResult(null);
      return;
    }

    const r = annualRate / 12 / 100;
    const n = years * 12;

    const maturity =
      r === 0 ? P * n : P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    const totalInvested = P * n;
    const wealthGained = maturity - totalInvested;

    setSipResult({
      maturity,
      totalInvested,
      wealthGained,
    });
  };

  useEffect(() => {
    handleCalculateSIP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sipAmount, sipRate, sipYears]);

  // 🔍 Filter funds based on search + category (using merged `funds` state)
  const filteredFunds = funds.filter((mf) => {
    const text = query.trim().toUpperCase();

    const matchSearch =
      !text ||
      mf.code.toUpperCase().includes(text) ||
      (mf.schemeName || mf.name || "")
        .toUpperCase()
        .includes(text);

    const mfCategory =
      mf.category || mf.categoryFromAPI || ""; // backend can override category if needed

    const matchCategory =
      activeCategory === "All" ||
      mfCategory.toUpperCase() === activeCategory.toUpperCase();

    return matchSearch && matchCategory;
  });

  return (
    <Box m="20px">
      <Header
        title="NAVIGATE MUTUAL FUND TRACKER"
        subtitle="Manual mutual fund list enriched with live NAV from backend"
      />

      {/* 💰 SIP Calculator */}
      <Box
        mb="24px"
        p="20px"
        borderRadius="12px"
        bgcolor={colors.primary[400]}
        boxShadow="0px 3px 10px rgba(0,0,0,0.25)"
      >
        <Typography variant="h6" fontWeight="600" mb={1}>
          SIP Calculator
        </Typography>
        <Typography variant="body2" color={colors.grey[300]} mb={2}>
          Estimate future value of your monthly SIP based on amount, expected
          return and duration.
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "flex-end" }}
        >
          <TextField
            label="Monthly SIP Amount (₹)"
            type="number"
            variant="outlined"
            size="small"
            value={sipAmount}
            onChange={(e) => setSipAmount(Number(e.target.value))}
            InputProps={{ inputProps: { min: 500, step: 500 } }}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="Expected Return (% p.a.)"
            type="number"
            variant="outlined"
            size="small"
            value={sipRate}
            onChange={(e) => setSipRate(Number(e.target.value))}
            InputProps={{ inputProps: { min: 1, max: 25, step: 0.5 } }}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="Duration (years)"
            type="number"
            variant="outlined"
            size="small"
            value={sipYears}
            onChange={(e) => setSipYears(Number(e.target.value))}
            InputProps={{ inputProps: { min: 1, max: 40, step: 1 } }}
            sx={{ minWidth: 200 }}
          />
          <Button
            variant="contained"
            onClick={handleCalculateSIP}
            sx={{
              bgcolor: colors.greenAccent[500],
              color: colors.grey[900],
              fontWeight: "bold",
              "&:hover": { bgcolor: colors.greenAccent[400] },
            }}
          >
            Recalculate
          </Button>
        </Stack>

        {sipResult && (
          <Box mt={3} display="flex" flexWrap="wrap" gap={3}>
            <Box>
              <Typography variant="body2" color={colors.grey[300]}>
                Total Invested
              </Typography>
              <Typography variant="h6" fontWeight="600">
                ₹{sipResult.totalInvested.toFixed(0).toLocaleString("en-IN")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color={colors.grey[300]}>
                Estimated Maturity Value
              </Typography>
              <Typography variant="h6" fontWeight="600">
                ₹{sipResult.maturity.toFixed(0).toLocaleString("en-IN")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color={colors.grey[300]}>
                Wealth Gained
              </Typography>
              <Typography
                variant="h6"
                fontWeight="600"
                color={colors.greenAccent[400]}
              >
                ₹{sipResult.wealthGained.toFixed(0).toLocaleString("en-IN")}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* 🔍 Search + Category Filters */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        mb="20px"
      >
        {/* Search Bar */}
        <Box flex={1}>
          <TextField
            fullWidth
            placeholder="Search mutual fund (name or code)…"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.greenAccent[400] }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Category Chips */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {CATEGORY_FILTERS.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              onClick={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? "filled" : "outlined"}
              sx={{
                bgcolor:
                  activeCategory === cat
                    ? colors.greenAccent[500]
                    : "transparent",
                color:
                  activeCategory === cat
                    ? colors.grey[900]
                    : colors.grey[100],
                borderColor: colors.greenAccent[500],
                fontWeight: activeCategory === cat ? "bold" : "normal",
              }}
            />
          ))}
        </Stack>
      </Stack>

      {/* 📊 Cards for filtered mutual funds */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt="40px">
          <CircularProgress sx={{ color: colors.greenAccent[400] }} />
        </Box>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
          {filteredFunds.map((mf) => {
            const nav = mf.nav || 0;
            const prevNav = mf.prevNav || nav;
            const change =
              prevNav !== 0
                ? (((nav - prevNav) / prevNav) * 100).toFixed(2)
                : "0.00";
            const isUp = parseFloat(change) >= 0;

            return (
              <Box
                key={mf.code}
                gridColumn="span 4"
                backgroundColor={colors.primary[400]}
                borderRadius="12px"
                p="20px"
                boxShadow="0px 3px 10px rgba(0,0,0,0.2)"
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={colors.greenAccent[400]}
                >
                  {mf.schemeName || mf.name}
                </Typography>

                <Typography
                  variant="body2"
                  color={colors.grey[400]}
                  sx={{ mt: 0.5 }}
                >
                  Code: {mf.code}
                </Typography>

                <Typography
                  variant="body2"
                  color={colors.grey[300]}
                  sx={{ mt: 0.5 }}
                >
                  Category: {mf.category || "-"}
                </Typography>

                <Box mt="10px" mb="10px">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.grey[100]}
                  >
                    NAV: ₹{nav.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isUp
                        ? colors.greenAccent[500]
                        : colors.redAccent[500],
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 600,
                    }}
                  >
                    {isUp ? (
                      <TrendingUpIcon fontSize="small" />
                    ) : (
                      <TrendingDownIcon fontSize="small" />
                    )}
                    &nbsp;{change}% ({isUp ? "Up" : "Down"} vs prev NAV)
                  </Typography>
                </Box>

                <Typography variant="body2" color={colors.grey[300]}>
                  Fund House: {mf.fundHouse || "-"}
                </Typography>
                <Typography variant="body2" color={colors.grey[300]}>
                  1Y Return:{" "}
                  {mf.oneYearReturn !== undefined
                    ? `${Number(mf.oneYearReturn).toFixed(2)}%`
                    : "-"}
                </Typography>

                <Typography
                  variant="body2"
                  color={colors.grey[500]}
                  mt="6px"
                >
                  Last Updated:{" "}
                  {mf.lastUpdated
                    ? new Date(mf.lastUpdated).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Market;
