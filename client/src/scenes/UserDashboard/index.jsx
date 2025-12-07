// --- FULL USERDASHBOARD.JSX ---

/* import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Tooltip,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { fetchStockDetails } from "../../services/yahooFetch";
import { ResponsivePie } from "@nivo/pie";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const UserDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [liveHoldings, setLiveHoldings] = useState([]);
  const [dayChange, setDayChange] = useState({ amount: 0, percent: 0 });
  const [monthlyData, setMonthlyData] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);


  const user = JSON.parse(localStorage.getItem("user"));
  const normalizeSymbol = (symbol) => symbol.toUpperCase().replace(".NS", "");
  const timestamp = new Date().toLocaleString("en-IN");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      let total = 0;
      let changeToday = 0;
      const mergedHoldings = {};

      try {
        const res = await fetch(`/api/userstocks/${user.email}`);
        const userStocks = await res.json();

        if (!Array.isArray(userStocks) || userStocks.length === 0) {
          setLiveHoldings([]);
          return;
        }

        for (const stock of userStocks) {
          const rawSymbol = stock.symbol.includes(".")
            ? stock.symbol
            : `${stock.symbol}.NS`;
          const quote = await fetchStockDetails(rawSymbol);

          if (
            !quote ||
            !quote.regularMarketPrice ||
            !quote.regularMarketPreviousClose
          )
            continue;

          const current = quote.regularMarketPrice;
          const prevClose = quote.regularMarketPreviousClose;
          const marketValue = current * stock.quantity;
          const change = current - prevClose;
          const key = normalizeSymbol(stock.symbol);

          if (mergedHoldings[key]) {
            mergedHoldings[key].quantity += stock.quantity;
          } else {
            mergedHoldings[key] = {
              symbol: key,
              quantity: stock.quantity,
              avgBuyPrice: stock.avgPrice || 0,
            };
          }

          mergedHoldings[key].current = current.toFixed(2);
          mergedHoldings[key].marketValue = marketValue.toFixed(2);
          mergedHoldings[key].change = (
            current - (stock.avgPrice || 0)
          ).toFixed(2);

          total += marketValue;
          changeToday += change * stock.quantity;
        }
      } catch (err) {
        console.error("Failed to fetch live portfolio:", err);
      }

      const mergedList = Object.values(mergedHoldings);
      setLiveHoldings(mergedList);
      setPortfolioValue(total);
      setDayChange({
        amount: changeToday.toFixed(2),
        percent: ((changeToday / (total - changeToday)) * 100).toFixed(2),
      });
    };

    const fetchTrades = async () => {
      try {
        const res = await fetch(`/api/trades/${user.email}`);
        const data = await res.json();

        const grouped = {};
        data.forEach((trade) => {
          const date = new Date(trade.tradeTime);
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear();
          const label = `${month} ${year}`;
          const key = `${trade.symbol} ${trade.quantity > 0 ? "Buy" : "Sell"}`;

          if (!grouped[label]) grouped[label] = {};
          if (!grouped[label][key]) grouped[label][key] = 0;

          grouped[label][key] += Math.abs(trade.quantity);
        });

        const formatted = Object.entries(grouped).map(([month, values]) => ({
          month,
          ...values,
        }));

        setMonthlyData(formatted);
        setTradeHistory(data); 

      } catch (err) {
        console.error("Failed to fetch trades:", err);
      }
    };

    fetchPortfolio();
    fetchTrades();
  }, []);

  const allocationData = liveHoldings.map((s) => ({
    id: s.symbol,
    label: s.symbol,
    value: parseFloat(s.marketValue),
  }));


  const downloadHoldingsAsCSV = () => {
  if (!liveHoldings.length && !tradeHistory.length) return;

  const now = new Date();
  const timestamp = now.toLocaleString("en-IN");
  const filename = `portfolio_summary_${now.toISOString().slice(0, 19).replace(/[:T]/g, "-")}.csv`;

  let csvContent = "data:text/csv;charset=utf-8,";


  const headers = [
    "Symbol", "Quantity", "Avg Buy Price", "Current Price", "Market Value", "Change", "Timestamp",
  ];
  const rows = liveHoldings.map((h) => [
    h.symbol,
    h.quantity,
    h.avgBuyPrice,
    h.current,
    h.marketValue,
    h.change,
    timestamp,
  ]);

  csvContent += [`Portfolio Summary (Generated On: ${timestamp})`, headers.join(","), ...rows.map(e => e.join(","))].join("\n");

  csvContent += "\n\nTrade History\n";
  
 
  const tradeHeaders = ["Symbol", "Type", "Quantity", "Price", "Trade Time"];
  csvContent += tradeHeaders.join(",") + "\n";

  csvContent += tradeHistory
    .map(t => [
      t.symbol,
      t.quantity > 0 ? "Buy" : "Sell",
      Math.abs(t.quantity),
      t.price,
      new Date(t.tradeTime).toLocaleString("en-IN")
    ].join(","))
    .join("\n");

 
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
 

  const generateBarChartData = () => {
    const rawData = [];

    monthlyData.forEach((entry) => {
      const month = entry.month;

      Object.entries(entry).forEach(([key, val]) => {
        if (key === "month") return;
        const [symbol, type] = key.split(" ");
        const stockEntry = rawData.find((d) => d.symbol === symbol && d.month === month);
        if (stockEntry) {
          stockEntry[type] = val;
        } else {
          rawData.push({
            symbol,
            month,
            Buy: type === "Buy" ? val : 0,
            Sell: type === "Sell" ? val : 0,
          });
        }
      });
    });

    const groupedByMonth = {};
    rawData.forEach((d) => {
      if (!groupedByMonth[d.month]) groupedByMonth[d.month] = [];
      groupedByMonth[d.month].push(d);
    });

    const chartData = {
      labels: [],
      datasets: [],
    };

    Object.entries(groupedByMonth).forEach(([month, stocks]) => {
      chartData.labels.push(...stocks.map((s) => `${s.symbol}`));

      chartData.datasets.push(
        {
          label: `${month} Buy`,
          data: stocks.map((s) => s.Buy),
          backgroundColor: colors.greenAccent[400],
          stack: month,
        },
        {
          label: `${month} Sell`,
          data: stocks.map((s) => s.Sell),
          backgroundColor: colors.redAccent[400],
          stack: month,
        }
      );
    });

    return chartData;
  };

  return (
    <Box m="20px">
    
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="📈 My Portfolio" subtitle={`Welcome back, ${user?.name || "Investor"}!`} />
        <Tooltip title="Download Portfolio CSV">
          <Button
            onClick={downloadHoldingsAsCSV}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              padding: "8px 18px",
              fontWeight: "bold",
            }}
            startIcon={<DownloadOutlinedIcon />}
          >
            Download Summary
          </Button>
        </Tooltip>
      </Box>

     
      <Box mt="20px" p="25px" borderRadius="12px" backgroundColor={colors.primary[400]}>
        <Typography variant="h4" fontWeight="600" color={colors.greenAccent[400]}>
          ₹{portfolioValue.toLocaleString("en-IN")}
        </Typography>
        <Typography color={colors.grey[100]} mt="8px">
          Day's Change: ₹{dayChange.amount} ({dayChange.percent}%)
        </Typography>
      </Box>

      <Box mt="30px" display="flex" flexDirection={{ xs: "column", md: "row" }} gap="20px">
       
        <Box flex={1} height="350px" backgroundColor={colors.primary[400]} borderRadius="12px" p="20px">
          <Typography variant="h6" color={colors.grey[100]} mb="10px">
            🧩 Portfolio Allocation
                  {liveHoldings.length === 0 && tradeHistory.length === 0 && (
  <Box mt="40px" textAlign="center">
    <Typography variant="h6" color={colors.grey[300]} mt={5}>
      No stocks in your portfolio yet.
    </Typography>
    <Typography color={colors.grey[400]} fontSize="14px">
      Start investing to see your portfolio summary, charts, and trade history here!
    </Typography>
  </Box>
)}
          </Typography>
          <ResponsivePie
            data={allocationData}
            margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={4}
            colors={{ scheme: "category10" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
            enableArcLabels={true}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            arcLinkLabelsColor={{ from: "color" }}
            arcLinkLabelsTextColor={colors.grey[100]}
          />
        </Box>

        <Box flex={1} backgroundColor={colors.primary[400]} borderRadius="12px" p="20px" maxHeight="350px" overflow="auto">
          <Typography variant="h6" color={colors.grey[100]} mb="16px">
            💼 Your Holdings
                  {liveHoldings.length === 0 && tradeHistory.length === 0 && (
  <Box mt="40px" textAlign="center">
    <Typography variant="h6" color={colors.grey[300]} mt={5}>
      No stocks in your portfolio yet.
    </Typography>
    <Typography color={colors.grey[400]} fontSize="14px">
      Start investing to see your portfolio summary, charts, and trade history here!
    </Typography>
  </Box>
)}
          </Typography>
          <Divider sx={{ borderColor: colors.primary[500], mb: 2 }} />
          {liveHoldings.map((stock, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py="10px"
              borderBottom={`1px solid ${colors.primary[500]}`}
            >
              <Box>
                <Typography color={colors.greenAccent[500]} fontWeight="600">{stock.symbol}</Typography>
                <Typography color={colors.grey[100]} fontSize="13px">Qty: {stock.quantity}</Typography>
                <Typography color={colors.grey[100]} fontSize="12px">
                  Avg Buy: ₹{stock.avgBuyPrice} | Current: ₹{stock.current}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography color={colors.grey[100]}>Value</Typography>
                <Typography color={colors.greenAccent[300]} fontWeight="bold">₹{stock.marketValue}</Typography>
                <Typography
                  fontSize="13px"
                  color={
                    parseFloat(stock.change) >= 0
                      ? colors.greenAccent[400]
                      : colors.redAccent[400]
                  }
                >
                  {parseFloat(stock.change) >= 0 ? "+" : ""}
                  {stock.change}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {monthlyData.length > 0 && (
        
        <Box mt="40px" p="20px" backgroundColor={colors.primary[400]} borderRadius="12px">
          <Typography variant="h6" color={colors.grey[100]} mb="10px">
            📊 Monthly Buy/Sell Volume by Stock
          </Typography>
          <Box height="500px">
            <Bar
              data={generateBarChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: colors.grey[100] },
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: "Stock", color: colors.grey[100] },
                    ticks: { color: colors.grey[100] },
                  },
                  y: {
                    title: { display: true, text: "Quantity", color: colors.grey[100] },
                    ticks: { color: colors.grey[100] },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserDashboard; */

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Tooltip,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { fetchMutualFundDetails } from "../../api/mutualfunds"; // 🔹 helper for MF details
import { ResponsivePie } from "@nivo/pie";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const MutualFundDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [portfolioValue, setPortfolioValue] = useState(0);
  const [liveHoldings, setLiveHoldings] = useState([]);
  const [dayChange, setDayChange] = useState({ amount: 0, percent: 0 });
  const [monthlyData, setMonthlyData] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const timestamp = new Date().toLocaleString("en-IN");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  useEffect(() => {
    if (!user || !user.email) return;

    const fetchPortfolio = async () => {
      let total = 0;
      let changeToday = 0;
      const mergedHoldings = {};

      try {
        // 🔹 Get user's MF holdings from backend
        const res = await fetch(`/api/usermfs/${user.email}`);
        const userFunds = await res.json();

        if (!Array.isArray(userFunds) || userFunds.length === 0) {
          setLiveHoldings([]);
          setPortfolioValue(0);
          setDayChange({ amount: 0, percent: 0 });
          return;
        }

        for (const mf of userFunds) {
          // mf: { code, quantity, avgNav?, schemeName? }
          const details = await fetchMutualFundDetails(mf.code);
          if (!details || (!details.nav && !details.price)) continue;

          const nav = details.nav ?? details.price; // fall back if backend uses price
          const prevNav = details.prevNav ?? nav;
          const marketValue = nav * mf.quantity;
          const dayMove = (nav - prevNav) * mf.quantity;

          const key = mf.code;

          if (!mergedHoldings[key]) {
            mergedHoldings[key] = {
              code: key,
              schemeName: details.schemeName || mf.schemeName || key,
              quantity: mf.quantity,
              avgNav: mf.avgNav || mf.avgPrice || 0,
            };
          } else {
            mergedHoldings[key].quantity += mf.quantity;
          }

          mergedHoldings[key].nav = nav.toFixed(2);
          mergedHoldings[key].marketValue = marketValue.toFixed(2);

          const avgCostPerUnit = mergedHoldings[key].avgNav || 0;
          const pnlPerUnit = nav - avgCostPerUnit;
          mergedHoldings[key].pnlPerUnit = pnlPerUnit.toFixed(2);

          total += marketValue;
          changeToday += dayMove;
        }
      } catch (err) {
        console.error("Failed to fetch MF portfolio:", err);
      }

      const mergedList = Object.values(mergedHoldings);
      setLiveHoldings(mergedList);
      setPortfolioValue(total);

      const baseValue = total - changeToday;
      const dayPercent =
        baseValue > 0 ? (changeToday / baseValue) * 100 : 0;

      setDayChange({
        amount: changeToday.toFixed(2),
        percent: dayPercent.toFixed(2),
      });
    };

    const fetchTrades = async () => {
      try {
        // 🔹 MF trades (buy/sell history) from backend
        const res = await fetch(`/api/mftrades/${user.email}`);
        const data = await res.json();

        const grouped = {};
        data.forEach((trade) => {
          const date = new Date(trade.tradeTime);
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear();
          const label = `${month} ${year}`;
          const key = `${trade.code} ${trade.quantity > 0 ? "Buy" : "Sell"}`;

          if (!grouped[label]) grouped[label] = {};
          if (!grouped[label][key]) grouped[label][key] = 0;

          grouped[label][key] += Math.abs(trade.quantity);
        });

        const formatted = Object.entries(grouped).map(([month, values]) => ({
          month,
          ...values,
        }));

        setMonthlyData(formatted);
        setTradeHistory(data);
      } catch (err) {
        console.error("Failed to fetch MF trades:", err);
      }
    };

    fetchPortfolio();
    fetchTrades();
  }, [user]);

  // Pie chart data for allocation by MF
  const allocationData = liveHoldings.map((f) => ({
    id: f.schemeName || f.code,
    label: f.schemeName || f.code,
    value: parseFloat(f.marketValue),
  }));

  // CSV download: portfolio summary + MF trade history
  const downloadHoldingsAsCSV = () => {
    if (!liveHoldings.length && !tradeHistory.length) return;

    const now = new Date();
    const ts = now.toLocaleString("en-IN");
    const filename = `mf_portfolio_summary_${now
      .toISOString()
      .slice(0, 19)
      .replace(/[:T]/g, "-")}.csv`;

    let csvContent = "data:text/csv;charset=utf-8,";

    // Portfolio Summary
    const headers = [
      "Scheme Name",
      "Code",
      "Units",
      "Avg NAV",
      "Current NAV",
      "Market Value",
      "P&L Per Unit",
      "Generated At",
    ];

    const rows = liveHoldings.map((h) => [
      `"${h.schemeName || ""}"`,
      h.code,
      h.quantity,
      h.avgNav,
      h.nav,
      h.marketValue,
      h.pnlPerUnit,
      ts,
    ]);

    csvContent += [
      `Mutual Fund Portfolio Summary (Generated On: ${ts})`,
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");

    // Divider
    csvContent += "\n\nMutual Fund Trade History\n";

    // Trade History
    const tradeHeaders = ["Scheme Code", "Type", "Units", "Price", "Trade Time"];
    csvContent += tradeHeaders.join(",") + "\n";

    csvContent += tradeHistory
      .map((t) => [
        t.code,
        t.quantity > 0 ? "Buy" : "Sell",
        Math.abs(t.quantity),
        t.price,
        new Date(t.tradeTime).toLocaleString("en-IN"),
      ].join(","))
      .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare bar chart data for monthly MF Buy / Sell volume
  const generateBarChartData = () => {
    const rawData = [];

    monthlyData.forEach((entry) => {
      const month = entry.month;
      Object.entries(entry).forEach(([key, val]) => {
        if (key === "month") return;
        const [code, type] = key.split(" ");
        const mfEntry = rawData.find(
          (d) => d.code === code && d.month === month
        );
        if (mfEntry) {
          mfEntry[type] = val;
        } else {
          rawData.push({
            code,
            month,
            Buy: type === "Buy" ? val : 0,
            Sell: type === "Sell" ? val : 0,
          });
        }
      });
    });

    const groupedByMonth = {};
    rawData.forEach((d) => {
      if (!groupedByMonth[d.month]) groupedByMonth[d.month] = [];
      groupedByMonth[d.month].push(d);
    });

    const chartData = {
      labels: [],
      datasets: [],
    };

    Object.entries(groupedByMonth).forEach(([month, mfs]) => {
      chartData.labels.push(...mfs.map((s) => `${s.code}`));

      chartData.datasets.push(
        {
          label: `${month} Buy`,
          data: mfs.map((s) => s.Buy),
          backgroundColor: colors.greenAccent[400],
          stack: month,
        },
        {
          label: `${month} Sell`,
          data: mfs.map((s) => s.Sell),
          backgroundColor: colors.redAccent[400],
          stack: month,
        }
      );
    });

    return chartData;
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="📊 My Mutual Fund Portfolio"
          subtitle={`Welcome back, ${user?.name || "Investor"}!`}
        />
        <Tooltip title="Download Mutual Fund Portfolio CSV">
          <Button
            onClick={downloadHoldingsAsCSV}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              padding: "8px 18px",
              fontWeight: "bold",
            }}
            startIcon={<DownloadOutlinedIcon />}
          >
            Download Summary
          </Button>
        </Tooltip>
      </Box>

      {/* Small disclaimer for college/legal vibe */}
      <Typography
        variant="body2"
        color={colors.grey[400]}
        mt={1}
        sx={{ fontStyle: "italic" }}
      >
        Disclaimer: This dashboard is a college project prototype for educational
        purposes only. It does not execute real mutual fund transactions or
        provide investment advice.
      </Typography>

      {/* PORTFOLIO VALUE */}
      <Box
        mt="20px"
        p="25px"
        borderRadius="12px"
        backgroundColor={colors.primary[400]}
      >
        <Typography
          variant="h4"
          fontWeight="600"
          color={colors.greenAccent[400]}
        >
          ₹{portfolioValue.toLocaleString("en-IN")}
        </Typography>
        <Typography color={colors.grey[100]} mt="8px">
          Day&apos;s Change: ₹{dayChange.amount} ({dayChange.percent}%)
        </Typography>
        <Typography color={colors.grey[400]} fontSize="12px" mt="4px">
          Last updated: {timestamp}
        </Typography>
      </Box>

      {/* HOLDINGS + PIE */}
      <Box
        mt="30px"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap="20px"
      >
        {/* PIE */}
        <Box
          flex={1}
          height="350px"
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          p="20px"
        >
          <Typography variant="h6" color={colors.grey[100]} mb="10px">
            🧩 Mutual Fund Allocation
          </Typography>

          {liveHoldings.length === 0 && tradeHistory.length === 0 ? (
            <Box mt="40px" textAlign="center">
              <Typography variant="h6" color={colors.grey[300]} mt={5}>
                No mutual funds in your portfolio yet.
              </Typography>
              <Typography color={colors.grey[400]} fontSize="14px">
                Add sample mutual fund investments to visualise your allocation
                and performance here.
              </Typography>
            </Box>
          ) : (
            <ResponsivePie
              data={allocationData}
              margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
              innerRadius={0.5}
              padAngle={1}
              cornerRadius={4}
              colors={{ scheme: "category10" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
              enableArcLabels={true}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
              arcLinkLabelsColor={{ from: "color" }}
              arcLinkLabelsTextColor={colors.grey[100]}
            />
          )}
        </Box>

        {/* HOLDINGS LIST */}
        <Box
          flex={1}
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          p="20px"
          maxHeight="350px"
          overflow="auto"
        >
          <Typography variant="h6" color={colors.grey[100]} mb="16px">
            💼 Your Mutual Fund Holdings
          </Typography>
          <Divider sx={{ borderColor: colors.primary[500], mb: 2 }} />

          {liveHoldings.length === 0 && tradeHistory.length === 0 ? (
            <Box mt="20px" textAlign="center">
              <Typography variant="h6" color={colors.grey[300]} mt={2}>
                No mutual funds yet.
              </Typography>
              <Typography color={colors.grey[400]} fontSize="14px">
                Once you add mutual fund entries, they will appear here with NAV,
                value, and profit/loss.
              </Typography>
            </Box>
          ) : (
            liveHoldings.map((mf, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py="10px"
                borderBottom={`1px solid ${colors.primary[500]}`}
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    fontWeight="600"
                  >
                    {mf.schemeName}
                  </Typography>
                  <Typography color={colors.grey[100]} fontSize="13px">
                    Code: {mf.code} | Units: {mf.quantity}
                  </Typography>
                  <Typography color={colors.grey[100]} fontSize="12px">
                    Avg NAV: ₹{mf.avgNav} | Current NAV: ₹{mf.nav}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography color={colors.grey[100]}>Value</Typography>
                  <Typography
                    color={colors.greenAccent[300]}
                    fontWeight="bold"
                  >
                    ₹{mf.marketValue}
                  </Typography>
                  <Typography
                    fontSize="13px"
                    color={
                      parseFloat(mf.pnlPerUnit) >= 0
                        ? colors.greenAccent[400]
                        : colors.redAccent[400]
                    }
                  >
                    {parseFloat(mf.pnlPerUnit) >= 0 ? "+" : ""}
                    {mf.pnlPerUnit} / unit
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* MONTHLY CHART */}
      {monthlyData.length > 0 && (
        <Box
          mt="40px"
          p="20px"
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
        >
          <Typography variant="h6" color={colors.grey[100]} mb="10px">
            📊 Monthly Buy/Sell Volume by Mutual Fund
          </Typography>
          <Box height="500px">
            <Bar
              data={generateBarChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: colors.grey[100] },
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Mutual Fund (Code)",
                      color: colors.grey[100],
                    },
                    ticks: { color: colors.grey[100] },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Units",
                      color: colors.grey[100],
                    },
                    ticks: { color: colors.grey[100] },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MutualFundDashboard;
