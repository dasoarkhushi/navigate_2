// src/scenes/aiInsights.jsx
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Tabs, Tab, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";

const AIInsights = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tab, setTab] = useState(0);
  const [mfData, setMfData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    // MF forecast + anomalies
    fetch("http://localhost:3001/api/analytics/mf-forecast")
      .then((res) => res.json())
      .then(setMfData)
      .catch(console.error);

    // Tweets + news sentiment
    fetch("http://localhost:3001/api/analytics/sentiment")
      .then((res) => res.json())
      .then(setSentimentData)
      .catch(console.error);

    // XGBoost risk profile
    fetch("http://localhost:3001/api/analytics/risk-profile")
      .then((res) => res.json())
      .then(setRiskData)
      .catch(console.error);
  }, []);

  return (
    <Box m="20px">
      <Header
        title="AI INSIGHTS"
        subtitle="ARIMA forecasts, anomalies, sentiment & risk profiling"
      />

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2, borderBottom: `1px solid ${colors.grey[700]}` }}
      >
        <Tab label="MF Insights" />
        <Tab label="Sentiment" />
        <Tab label="Risk Profile" />
      </Tabs>

      {tab === 0 && (
        <Card sx={{ backgroundColor: colors.primary[400] }}>
          <CardContent>
            <Typography variant="h6" color={colors.greenAccent[400]}>
              Mutual Fund Forecast & Anomalies
            </Typography>
            {/* Use mfData.history + mfData.forecast + mfData.anomalies here with charts */}
            <pre style={{ whiteSpace: "pre-wrap", color: colors.grey[100] }}>
              {mfData ? JSON.stringify(mfData, null, 2) : "Loading..."}
            </pre>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card sx={{ backgroundColor: colors.primary[400] }}>
          <CardContent>
            <Typography variant="h6" color={colors.greenAccent[400]}>
              Sentiment (Tweets + News)
            </Typography>
            {/* Use sentimentData.hashtags, tweetsPerDay, tweetSentimentDaily, newsSentimentDaily */}
            <pre style={{ whiteSpace: "pre-wrap", color: colors.grey[100] }}>
              {sentimentData ? JSON.stringify(sentimentData, null, 2) : "Loading..."}
            </pre>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card sx={{ backgroundColor: colors.primary[400] }}>
          <CardContent>
            <Typography variant="h6" color={colors.greenAccent[400]}>
              Risk Profiling (XGBoost)
            </Typography>
            {/* Use riskData.buckets + riskData.featureImportance */}
            <pre style={{ whiteSpace: "pre-wrap", color: colors.grey[100] }}>
              {riskData ? JSON.stringify(riskData, null, 2) : "Loading..."}
            </pre>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AIInsights;
