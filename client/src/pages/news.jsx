// src/pages/News.jsx
/* import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme
} from "@mui/material";
import { tokens } from "../theme";

const newsArticles = [
  {
    title: "Sensex Ends Lower Amid Global Cues",
    description: "Indian markets fell as global investors reacted to U.S. job data and oil price trends.",
    url: "https://www.moneycontrol.com/news/business/markets/sensex-nifty-end-lower-on-global-cues-12685371.html"
  },
  {
    title: "Nifty Crosses 24,000 Mark for First Time",
    description: "The benchmark index reached a record high led by banking and IT stocks.",
    url: "https://www.livemint.com/market/stock-market-news/nifty-crosses-24000-mark-led-by-it-banking-stocks-11693847145758.html"
  },
  {
    title: "FinFolio Launches Real-Time Portfolio Insights",
    description: "Track your stocks live and get automated alerts powered by FinFolio AI.",
    url: "https://finfolio.ai/features/real-time-insights"
  },
  {
    title: "FinFolio Risk Analyzer Goes Live",
    description: "Users can now analyze portfolio risk and get actionable AI insights with a single click.",
    url: "https://finfolio.ai/blog/risk-analyzer-launch"
  },
  {
    title: "India’s Retail Investors Surge in 2024",
    description: "A record number of new Demat accounts opened in the first half of the year.",
    url: "https://economictimes.indiatimes.com/markets/stocks/news/retail-investor-base-surges-in-2024/articleshow/123456789.cms"
  },
  {
    title: "HDFC Bank Shares Rise After Q1 Results",
    description: "Strong quarterly earnings push HDFC Bank shares up 3% in intraday trade.",
    url: "https://www.business-standard.com/markets/news/hdfc-bank-shares-rise-3-on-strong-q1-results-124070501234_1.html"
  },
  {
    title: "Infosys Signs AI Deal with Global Retailer",
    description: "Infosys has signed a multi-million dollar deal to integrate AI tools into global retail operations.",
    url: "https://www.moneycontrol.com/news/business/companies/infosys-signs-ai-deal-with-global-retail-giant-124070501245_1.html"
  },
  {
    title: "FPIs Pump Rs 25,000 Crore into Indian Equities in July",
    description: "Foreign Portfolio Investors remain bullish on Indian markets amid global uncertainty.",
    url: "https://www.livemint.com/market/foreign-investors-inject-rs-25000-crore-into-equities-in-july-124070501258.html"
  },
  {
    title: "Gold Prices Ease as Dollar Gains",
    description: "Gold prices fell slightly as the US dollar gained strength after Fed's hawkish stance.",
    url: "https://www.financialexpress.com/market/commodities/gold-prices-slip-as-dollar-rallies-fed-minutes-in-focus-124070501267.html"
  }
];


export default function News() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Stock Market & FinFolio News
      </Typography>

      <Grid container spacing={4}>
        {newsArticles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                bgcolor: colors.primary[600],
                color: colors.grey[100],
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6
                },
                cursor: "pointer"
              }}
              onClick={() => window.open(article.url, "_blank")}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  textDecoration: "underline",
                  color: colors.greenAccent[400],
                  mb: 1
                }}
              >
                {article.title}
              </Typography>
              <Typography variant="body2">{article.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
 */

// src/pages/News.jsx
// src/pages/News.jsx
/* import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme
} from "@mui/material";
import { tokens } from "../theme";

const newsArticles = [
  {
    title: "SIP Inflows Hit Record High in June 2025",
    description:
      "Monthly SIP investments touched a record ₹27,269 crore in June 2025, with contributing SIP accounts crossing 8.64 crore.",
    url: "https://timesofindia.indiatimes.com/business/india-business/mutual-fund-sip-inflows-touch-record-high-june-investments-hit-rs-27269-crore-up-2-from-may-contributing-sip-accounts-cross-8-64-crore-for-first-time/articleshow/122347999.cms"
  },
  {
    title: "Retail Investors Drive Mutual Fund Assets to New Highs",
    description:
      "Post-pandemic, strong participation from retail investors and rising SIP contributions have pushed mutual fund assets sharply higher.",
    url: "https://www.ndtvprofit.com/markets/mutual-funds-post-pandemic-retail-momentum-drives-assets-under-custody-to-rs-71-lakh-crore"
  },
  {
    title: "SIP Contributions Rise Over 20% Year-on-Year",
    description:
      "SIP contributions in August 2025 rose to nearly ₹28,300 crore, up around 20% from a year earlier, highlighting growing investor discipline.",
    url: "https://www.angelone.in/news/mutual-funds/mutual-fund-industry-s-sip-contributions-rise-20-yoy-to-28-300-crore-in-august-2025"
  },
  {
    title: "Gold ETF Assets Cross ₹1 Lakh Crore Mark",
    description:
      "Gold ETF AUM in India has crossed ₹1 lakh crore, reflecting rising investor interest in gold as a portfolio diversifier.",
    url: "https://m.economictimes.com/mf/mf-news/gold-etf-aum-crosses-rs-1-lakh-crore-in-october-inflows-recorded-at-rs-27500-crore/articleshow/125693690.cms"
  },
  {
    title: "Gold ETFs Continue to Attract Steady Inflows",
    description:
      "Gold ETFs have seen cumulative net inflows above ₹27,000 crore in 2025, remaining one of the most resilient passive segments.",
    url: "https://investmentguruindia.com/newsdetail/gold-etfs-continue-to-attract-steady-investor-interest-in-oct-amfi-data160480"
  },
  {
    title: "SEBI Master Circular for Mutual Funds",
    description:
      "The latest SEBI Master Circular consolidates key regulations and compliance requirements applicable to mutual funds in India.",
    url: "https://www.sebi.gov.in/legal/master-circulars/jun-2024/master-circular-for-mutual-funds_84441.html"
  },
  {
    title: "New SEBI Mutual Fund Disclosure Rules Explained",
    description:
      "An overview of SEBI’s guidelines on disclosures, expense segregation, and risk-o-meter norms for mutual fund schemes.",
    url: "https://paytm.com/blog/mutual-funds/sebi-mutual-fund-guidelines/"
  },
  {
    title: "AMFI Mutual Fund Factbook 2024",
    description:
      "AMFI’s official factbook provides detailed statistics and trends on India’s mutual fund industry, investor profile, and product mix.",
    url: "https://www.amfiindia.com/Themes/Theme1/downloads/AMFIFactbook%202024.pdf"
  },
  {
    title: "Industry Report on Indian Mutual Funds",
    description:
      "A recent industry report analyses how mutual fund AUM has grown, the role of retail investors, and the outlook for the sector.",
    url: "https://www.icicipruamc.com/blob/investor-relations/IR_Documents/ICICI_Prudential_Industry_Report.pdf"
  }
];

export default function News() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Mutual Fund & NAVigate News
      </Typography>

      <Grid container spacing={4}>
        {newsArticles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                bgcolor: colors.primary[600],
                color: colors.grey[100],
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6
                },
                cursor: "pointer"
              }}
              onClick={() => window.open(article.url, "_blank")}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  textDecoration: "underline",
                  color: colors.greenAccent[400],
                  mb: 1
                }}
              >
                {article.title}
              </Typography>
              <Typography variant="body2">{article.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

 */

// src/pages/News.jsx
// src/pages/news.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  CircularProgress,
  TextField,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../theme";

// Static curated articles
const staticArticles = [
  {
    title: "SIP Inflows Hit Record High in June 2025",
    description:
      "Monthly SIP investments touched a record ₹27,269 crore in June 2025, with contributing SIP accounts crossing 8.64 crore.",
    url: "https://timesofindia.indiatimes.com/business/india-business/mutual-fund-sip-inflows-touch-record-high-june-investments-hit-rs-27269-crore-up-2-from-may-contributing-sip-accounts-cross-8-64-crore-for-first-time/articleshow/122347999.cms",
  },
  {
    title: "Retail Investors Drive Mutual Fund Assets to New Highs",
    description:
      "Post-pandemic, strong participation from retail investors and rising SIP contributions have pushed mutual fund assets sharply higher.",
    url: "https://www.ndtvprofit.com/markets/mutual-funds/post-pandemic-retail-momentum-drives-assets-under-custody-to-rs-71-lakh-crore",
  },
  {
    title: "SIP Contributions Rise Over 20% Year-on-Year",
    description:
      "SIP contributions in August 2025 rose to nearly ₹28,300 crore, up around 20% from a year earlier, highlighting growing investor discipline.",
    url: "https://www.angelone.in/news/mutual-funds/mutual-fund-industry-s-sip-contributions-rise-20-yoy-to-28-300-crore-in-august-2025",
  },
  {
    title: "Gold ETF Assets Cross ₹1 Lakh Crore Mark",
    description:
      "Gold ETF AUM in India has crossed ₹1 lakh crore, reflecting rising investor interest in gold as a portfolio diversifier.",
    url: "https://m.economictimes.com/mf/mf-news/gold-etf-aum-crosses-rs-1-lakh-crore-in-october-inflows-recorded-at-rs-27500-crore/articleshow/125693690.cms",
  },
  {
    title: "Gold ETFs Continue to Attract Steady Inflows",
    description:
      "Gold ETFs have seen cumulative net inflows above ₹27,000 crore in 2025, remaining one of the most resilient passive segments.",
    url: "https://investmentguruindia.com/newsdetail/gold-etfs-continue-to-attract-steady-investor-interest-in-oct-amfi-data160480",
  },
  {
    title: "SEBI Master Circular for Mutual Funds",
    description:
      "The latest SEBI Master Circular consolidates key regulations and compliance requirements applicable to mutual funds in India.",
    url: "https://www.sebi.gov.in/legal/master-circulars/jun-2024/master-circular-for-mutual-funds_84441.html",
  },
  {
    title: "New SEBI Mutual Fund Disclosure Rules Explained",
    description:
      "An overview of SEBI’s guidelines on disclosures, expense segregation, and risk-o-meter norms for mutual fund schemes.",
    url: "https://paytm.com/blog/mutual-funds/sebi-mutual-fund-guidelines/",
  },
  {
    title: "AMFI Mutual Fund Factbook 2024",
    description:
      "AMFI’s official factbook provides detailed statistics and trends on India’s mutual fund industry, investor profile, and product mix.",
    url: "https://www.amfiindia.com/Themes/Theme1/downloads/AMFIFactbook%202024.pdf",
  },
  {
    title: "Industry Report on Indian Mutual Funds",
    description:
      "A recent industry report analyses how mutual fund AUM has grown, the role of retail investors, and the outlook for the sector.",
    url: "https://www.icicipruamc.com/blob/investor-relations/IR_Documents/ICICI_Prudential_Industry_Report.pdf",
  },
];

const FILTER_TAGS = ["All", "SIP", "Gold ETF", "SEBI", "Regulation"];

export default function News() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // 🚨 CRA ONLY: read from process.env
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  // Debug log
  console.log("NEWS API KEY FROM ENV:", API_KEY);

  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 600);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch news whenever filters/search change
  useEffect(() => {
    const fetchNews = async () => {
      if (!API_KEY) {
        console.warn("No News API key found, showing static articles only.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        let q = `"mutual fund"`;
        if (activeTag !== "All") q += ` ${activeTag}`;
        if (debouncedQuery) q += ` ${debouncedQuery}`;

        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          q
        )}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "Error fetching news");
        }

        const apiArticles = data.articles.map((article) => ({
          title: article.title,
          description:
            article.description ||
            "Click to read the full article for more details.",
          url: article.url,
        }));

        setArticles([...apiArticles, ...staticArticles]);

        setLastUpdated(
          new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        );
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong fetching news");
        setArticles(staticArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_KEY, activeTag, debouncedQuery]);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold">
        Mutual Fund & NAVigate News
      </Typography>

      {lastUpdated && (
        <Typography
          variant="body2"
          sx={{ mt: 0.5, mb: 2, opacity: 0.8 }}
          color={colors.greenAccent[400]}
        >
          Last updated: {lastUpdated} (IST)
        </Typography>
      )}

      {/* Search + filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        mb={3}
      >
        <Box display="flex" alignItems="center" flex={1} gap={1}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search mutual fund news (e.g., SIP, gold, SEBI circular)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setDebouncedQuery(searchQuery.trim())}
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {FILTER_TAGS.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              onClick={() => setActiveTag(tag)}
              variant={activeTag === tag ? "filled" : "outlined"}
              sx={{
                bgcolor:
                  activeTag === tag ? colors.greenAccent[500] : "transparent",
                color: activeTag === tag ? colors.grey[900] : colors.grey[100],
                borderColor: colors.greenAccent[500],
                fontWeight: activeTag === tag ? "bold" : "normal",
              }}
            />
          ))}
        </Stack>
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" mt={1} mb={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                bgcolor: colors.primary[600],
                color: colors.grey[100],
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
                cursor: "pointer",
              }}
              onClick={() => window.open(article.url, "_blank")}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  textDecoration: "underline",
                  color: colors.greenAccent[400],
                  mb: 1,
                }}
              >
                {article.title}
              </Typography>
              <Typography variant="body2">{article.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
