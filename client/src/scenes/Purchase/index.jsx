/* import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
];

const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  const handleBuy = async () => {
    try {
      
      const { data } = await axios.get(`/api/quote?symbol=${symbol}`);
      const price = data.latestPrice;

      await axios.post("/api/purchase", {
        email,
        symbol,
        quantity: Number(quantity),
        price: Number(price),
      });

      setAlert({ open: true, msg: "Purchase successful!", severity: "success" });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({ open: true, msg: "Purchase failed", severity: "error" });
    }
  };

  return (
    <Box m="20px">
      <Header title="PURCHASE STOCKS" subtitle="Buy equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            color={colors.greenAccent[400]}
          >
            Place Order
          </Typography>

       
          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {symbols.map((sym) => (
                <MenuItem
                  key={sym}
                  value={sym}
                  sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    "&:hover": {
                      backgroundColor: colors.greenAccent[700],
                      color: "#ffffff",
                    },
                  }}
                >
                  {sym}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

       
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleBuy}
            disabled={!symbol || !quantity}
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: colors.greenAccent[600],
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Buy Now
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage;
 */

/* import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
]; 




const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  const handleTransaction = async (type) => {
    try {
      const userEmail = email || JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail || !symbol || !quantity) {
        throw new Error("Missing required fields.");
      }

      const quoteRes = await fetch(`/api/quote?symbol=${symbol}`);
      const quoteData = await quoteRes.json();

      const price =
        quoteData?.regularMarketPrice ??
        quoteData?.ask ??
        quoteData?.previousClose;

      if (!price || price <= 0) {
        throw new Error("Invalid price data from Yahoo Finance.");
      }

      const res = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          symbol,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${type} failed: ${errText}`);
      }

      localStorage.setItem("portfolio-updated", new Date().toISOString());

      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} successful!`,
        severity: "success",
      });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} failed. ${err.message}`,
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="TRADE STOCKS" subtitle="Buy or sell equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            color={colors.greenAccent[400]}
          >
            Place Order
          </Typography>

          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {[...symbols].sort().map((sym) => (
                <MenuItem
                  key={sym}
                  value={sym}
                  sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    "&:hover": {
                      backgroundColor: colors.greenAccent[700],
                      color: "#ffffff",
                    },
                  }}
                >
                  {sym}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

       
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("purchase")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
            >
              Buy
            </Button>

            <Button
              variant="contained"
              onClick={() => handleTransaction("sell")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: "#f44336",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                },
              }}
            >
              Sell
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage;

 */




/*
last working code 
 import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stockOptions, setStockOptions] = useState([]);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  
  useEffect(() => {
    fetch("/us_sample_stocks.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.trim().split("\n").slice(1); // remove header
        const options = lines.map((line) => {
          const [symbol] = line.split(",");
          return {
            label: symbol.trim(),
            value: symbol.trim(),
          };
        });
        setStockOptions(options);
      })
      .catch((err) => console.error("Error loading stock list:", err));
  }, []);

  const handleTransaction = async (type) => {
    try {
      const userEmail = email || JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail || !symbol || !quantity) {
        throw new Error("Missing required fields.");
      }

      const quoteRes = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);
      const quoteData = await quoteRes.json();

      const price =
        quoteData?.regularMarketPrice ?? quoteData?.ask ?? quoteData?.previousClose;

      if (!price || price <= 0) {
        throw new Error("Invalid price data from Yahoo Finance.");
      }

      const res = await fetch(`http://localhost:3001/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          symbol,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${type} failed: ${errText}`);
      }

      localStorage.setItem("portfolio-updated", new Date().toISOString());
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} successful!`,
        severity: "success",
      });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} failed. ${err.message}`,
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="TRADE STOCKS" subtitle="Buy or sell equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="600" gutterBottom color={colors.greenAccent[400]}>
            Place Order
          </Typography>

        
          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {stockOptions.length === 0 ? (
                <MenuItem disabled>No stocks available</MenuItem>
              ) : (
                [...stockOptions]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("purchase")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Buy
            </Button>

            <Button
              variant="contained"
              onClick={() => handleTransaction("sell")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: "#f44336",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Sell
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage; */

/* import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// 🔁 Hardcoded constant symbols
const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
];

const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stockOptions, setStockOptions] = useState([]);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "success" });

  // ✅ Combine constants, backend, and CSV
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return;

    const backendFetch = fetch(`http://localhost:3001/api/userstocks/${user.email}`)
      .then((res) => res.json())
      .then((data) =>
        data.map((stock) => ({
          label: stock.symbol,
          value: stock.symbol,
        }))
      )
      .catch((err) => {
        console.error("Backend fetch error:", err);
        return [];
      });

    const csvFetch = fetch("/us_sample_stocks.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.trim().split("\n").slice(1);
        return lines.map((line) => {
          const [symbol] = line.split(",");
          return {
            label: symbol.trim(),
            value: symbol.trim(),
          };
        });
      })
      .catch((err) => {
        console.error("CSV fetch error:", err);
        return [];
      });

    const constantSymbols = symbols.map((s) => ({ label: s, value: s }));

    Promise.all([backendFetch, csvFetch]).then(([backend, csv]) => {
      const merged = [...backend, ...csv, ...constantSymbols];
      const deduped = Array.from(new Map(merged.map((s) => [s.value, s])).values());
      setStockOptions(deduped);
    });
  }, []);

  const handleTransaction = async (type) => {
    try {
      const userEmail = email || JSON.parse(localStorage.getItem("user"))?.email;
      if (!userEmail || !symbol || !quantity) {
        throw new Error("Missing required fields.");
      }

      const quoteRes = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);
      const quoteData = await quoteRes.json();

      const price =
        quoteData?.regularMarketPrice ?? quoteData?.ask ?? quoteData?.previousClose;

      if (!price || price <= 0) {
        throw new Error("Invalid price data from Yahoo Finance.");
      }

      const res = await fetch(`http://localhost:3001/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          symbol,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${type} failed: ${errText}`);
      }

      localStorage.setItem("portfolio-updated", new Date().toISOString());
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} successful!`,
        severity: "success",
      });
      setQuantity("");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        msg: `${type === "purchase" ? "Purchase" : "Sell"} failed. ${err.message}`,
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="TRADE STOCKS" subtitle="Buy or sell equity shares in real-time" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="600" gutterBottom color={colors.greenAccent[400]}>
            Place Order
          </Typography>

          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 4 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>Select Stock</InputLabel>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {stockOptions.length === 0 ? (
                <MenuItem disabled>No stocks available</MenuItem>
              ) : (
                [...stockOptions]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("purchase")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Buy
            </Button>

            <Button
              variant="contained"
              onClick={() => handleTransaction("sell")}
              disabled={!symbol || !quantity}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: "#f44336",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Sell
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage;
 */


// src/pages/PurchasePage.jsx  (converted to Mutual Fund purchase)

// src/pages/PurchasePage.jsx

// src/pages/PurchasePage.jsx  (MF version)

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// 🔹 Your already input mutual funds master list
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

const PurchasePage = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // 🔽 Selected MF + amount
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [amount, setAmount] = useState("");

  // 🔍 Search text to filter the above list
  const [searchQuery, setSearchQuery] = useState("");

  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  // 👉 Filter MFs from your hardcoded list based on search
  const filteredFunds = baseMutualFunds.filter((mf) => {
    const q = searchQuery.toLowerCase();
    return (
      mf.name.toLowerCase().includes(q) ||
      mf.code.toLowerCase().includes(q) ||
      mf.category.toLowerCase().includes(q)
    );
  });

  // 🧲 When user selects an MF from dropdown
  const handleSelectScheme = (code) => {
    setSelectedCode(code);
    const mf = baseMutualFunds.find((f) => f.code === code);
    setSelectedName(mf ? mf.name : "");
  };

  // 🟢 Buy or 🔴 Sell – just saved via backend, no payment gateway
  const handleTransaction = async (type) => {
    try {
      const userEmail =
        email || JSON.parse(localStorage.getItem("user"))?.email;

      if (!userEmail || !selectedCode || !amount) {
        throw new Error("Please select a mutual fund and enter amount.");
      }

      const numericAmount = Number(amount);
      if (!numericAmount || numericAmount <= 0) {
        throw new Error("Amount must be greater than 0.");
      }

      setLoading(true);

      // 🔁 This is your demo “transaction” call – no payment gateway
      const res = await fetch(
        `http://localhost:3001/api/mf/${type}`, // /api/mf/buy or /api/mf/sell
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            schemeCode: selectedCode,
            schemeName: selectedName,
            amount: numericAmount,
            source: "NAVigate", // just info
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `${type} request failed.`);
      }

      localStorage.setItem("mf-portfolio-updated", new Date().toISOString());

      setAlert({
        open: true,
        msg:
          type === "buy"
            ? "Mutual fund purchase recorded successfully."
            : "Mutual fund sell order recorded successfully.",
        severity: "success",
      });

      setAmount("");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        msg: `${
          type === "buy" ? "Buy" : "Sell"
        } failed: ${err.message}`,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="TRADE MUTUAL FUNDS"
        subtitle="Buy or sell mutual funds from the NAVigate MF list"
      />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            color={colors.greenAccent[400]}
          >
            Place MF Order
          </Typography>

          {/* 🔍 SEARCH + SELECT SECTION (FROM ALREADY INPUT MFs) */}
          <TextField
            fullWidth
            label="Search Mutual Fund (by name, code, or category)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              mt: 2,
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          <FormControl fullWidth variant="filled" sx={{ mt: 2, mb: 3 }}>
            <InputLabel sx={{ color: colors.grey[300] }}>
              Select Mutual Fund
            </InputLabel>
            <Select
              value={selectedCode}
              onChange={(e) => handleSelectScheme(e.target.value)}
              sx={{
                backgroundColor: colors.primary[300],
                color: colors.grey[100],
                borderRadius: 1,
                "& .MuiSvgIcon-root": { color: colors.grey[100] },
              }}
            >
              {filteredFunds.length === 0 ? (
                <MenuItem disabled>No mutual funds match your search.</MenuItem>
              ) : (
                filteredFunds.map((mf) => (
                  <MenuItem key={mf.code} value={mf.code}>
                    {mf.name} ({mf.code}) — {mf.category}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* 💰 AMOUNT INPUT */}
          <TextField
            fullWidth
            label="Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            variant="filled"
            sx={{
              backgroundColor: colors.primary[300],
              borderRadius: 1,
              "& input": { color: colors.grey[100] },
              "& label": { color: colors.grey[300] },
            }}
          />

          {/* 🟢 BUY / 🔴 SELL BUTTONS */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("buy")}
              disabled={!selectedCode || !amount || loading}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {loading ? "Processing..." : "Buy"}
            </Button>

            <Button
              variant="contained"
              onClick={() => handleTransaction("sell")}
              disabled={!selectedCode || !amount || loading}
              sx={{
                width: "48%",
                py: 1.5,
                backgroundColor: "#f44336",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {loading ? "Processing..." : "Sell"}
            </Button>
          </Box>

          <Typography
            variant="caption"
            display="block"
            mt={2}
            color={colors.grey[300]}
          >
            This is a simulated trade on NAVigate. No payment gateway is used;
            orders are stored only in your backend/DB.
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PurchasePage;
