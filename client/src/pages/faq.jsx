/* // src/pages/Faq.jsx
import React from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const faqData = [
  {
    question: "What is FinFolio and how does it work?",
    answer: "FinFolio is a smart stock portfolio management platform that allows you to track, analyze, and manage your investments in real-time. It integrates market data, insights, and tools for better decision-making."
  },          
  {
    question: "How do I create an account on FinFolio?",
    answer: "Click on 'Sign Up', enter your basic details, verify your email, and log in to access your personalized dashboard."
  },                                                                                                                                                                                                                                                                                                                                                   
  {
    question: "Can I track live stock prices on FinFolio?",
    answer: "Yes, FinFolio provides real-time updates on stock prices, market movements, and your portfolio's performance using live financial data."
  },
  {
    question: "How does FinFolio help me manage my portfolio?",
    answer: "FinFolio offers detailed analytics, profit/loss tracking, stock health insights, and trade history to help you make informed decisions."
  },
  {
    question: "Is my financial data secure on FinFolio?",
    answer: "Absolutely. We use bank-level encryption, token-based authentication, and secure APIs to protect your data and privacy."
  },
  {
    question: "Do I need a brokerage account to use FinFolio?",
    answer: "No. FinFolio is a portfolio management and simulation tool. However, we do plan to integrate brokerage APIs in future updates."
  },
  {
    question: "Can I export my portfolio or trade history?",
    answer: "Yes, you can download your portfolio summary and trade logs from the dashboard in PDF or CSV format."
  },
  {
    question: "What markets and stock exchanges does FinFolio support?",
    answer: "Currently, we support stocks listed on NSE, BSE, NASDAQ, and NYSE. More exchanges will be added soon."
  },
  {
    question: "How frequently is the stock data updated?",
    answer: "Stock prices are refreshed every 30 seconds to ensure near real-time updates for accurate portfolio tracking."
  },
  {
    question: "Who can I contact for support?",
    answer: "You can reach our support team via the 'Help & Support' section on your dashboard, or email us at support@finfolio.com."
  }
];


export default function Faq() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ bgcolor: colors.primary[900], color: colors.grey[100], minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography align="center" sx={{ mb: 6 }}>
          Answers to the most common questions about getting started and using FinFolio.
        </Typography>

        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ backgroundColor: colors.primary[700], color: colors.grey[100], mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colors.grey[100] }} />}>
              <Typography fontWeight={600}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
} */

import React from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const faqData = [
  {
    question: "What is NAVigate and how does it work?",
    answer: "NAVigate is an intelligent mutual fund portfolio management platform that helps you track, analyze, and manage your mutual fund investments in real-time. It provides insights, analytics, and tools for informed financial decisions."
  },
  {
    question: "How do I create an account on NAVigate?",
    answer: "Click on 'Sign Up', fill in your basic details, verify your email, and log in to access your personalized mutual fund dashboard."
  },
  {
    question: "Can I track live NAV updates on NAVigate?",
    answer: "Yes, NAVigate provides real-time updates on mutual fund NAVs, market fluctuations, and your overall portfolio performance."
  },
  {
    question: "How does NAVigate help me manage my mutual fund portfolio?",
    answer: "NAVigate offers detailed analytics, trend insights, SIP tracking, profit/loss reports, and fund performance comparisons to support better investment decisions."
  },
  {
    question: "Is my financial data secure on NAVigate?",
    answer: "Absolutely. We use bank-level encryption, token-based authentication, and secure APIs to keep your data private and protected."
  },
  {
    question: "Do I need a Demat or brokerage account to use NAVigate?",
    answer: "No. NAVigate is a mutual fund tracking and analysis platform. However, future updates may include integration with investment service providers."
  },
  {
    question: "Can I export my mutual fund portfolio or transaction history?",
    answer: "Yes, you can download your portfolio summary and SIP/transaction logs in PDF or CSV format directly from the dashboard."
  },
  {
    question: "What types of mutual funds does NAVigate support?",
    answer: "NAVigate currently supports equity funds, debt funds, hybrid funds, index funds, ELSS, and liquid funds across major Indian AMCs."
  },
  {
    question: "How frequently is mutual fund data updated?",
    answer: "NAV updates are refreshed every day based on official AMC and market data to ensure accuracy in portfolio tracking."
  },
  {
    question: "Who can I contact for support?",
    answer: "You can reach our support team through the 'Help & Support' section in the app or by emailing us at support@navigate.com."
  }
];

export default function Faq() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ bgcolor: colors.primary[900], color: colors.grey[100], minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography align="center" sx={{ mb: 6 }}>
          Answers to the most common questions about getting started and using NAVigate.
        </Typography>

        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ backgroundColor: colors.primary[700], color: colors.grey[100], mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colors.grey[100] }} />}>
              <Typography fontWeight={600}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
