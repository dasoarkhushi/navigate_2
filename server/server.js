/* const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const yahooRoute = require("./routes/yahoo");


const yahooFinance = require("yahoo-finance2").default;
const authRouter = require("./routes/auth");
const chatbotRouter = require("./routes/Chatbot");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/yahoo", yahooRoute);



app.use("/api/auth", authRouter);
app.use("/api/chatbot", chatbotRouter);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


app.use("/api/auth", authRouter); 

app.get("/", (req, res) => {
  res.send("Yahoo Finance Proxy is running");
});


app.get("/api/quote", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: "Missing symbol" });

  try {
    const result = await yahooFinance.quote(symbol);
    const patched = {
      ...result,
      regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
    };
    res.json(patched);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Yahoo Finance quote failed" });
  }
});

app.get("/api/quotes", async (req, res) => {
  const symbols = req.query.symbols?.split(",") || [];
  if (!symbols.length) {
    return res.status(400).json({ error: "Missing symbols query" });
  }

  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const result = await yahooFinance.quote(symbol);
        return {
          symbol,
          ...result,
          regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
        };
      })
    );
    res.json(results);
  } catch (err) {
    console.error("Bulk quote fetch failed:", err.message);
    res.status(500).json({ error: "Yahoo Finance bulk fetch failed" });
  }
});

app.get("/check", (req, res) => {
  res.send("Correct backend is running");
});

const { OpenAI } = require("openai");
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1" // Groq's endpoint
});

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;

  try {
    const chatResponse = await groq.chat.completions.create({
      model: "llama3-8b-8192", // or "llama3-70b-8192"
      messages: [
        {
          role: "system",
          content: "You are a friendly and helpful assistant for FinFolio users. Keep answers short, clear, and supportive."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const botReply = chatResponse.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Groq API error:", error.message);
    res.status(500).json({ reply: "Sorry, the assistant is having trouble responding right now." });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Proxy running at http://localhost:${PORT}`);
});
 */

/* const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// === Route Imports ===
const yahooRoute = require("./routes/yahoo");
const authRouter = require("./routes/auth");
const newsletterRouter = require("./routes/newsletter");
const { OpenAI } = require("openai");
const yahooFinance = require("yahoo-finance2").default;

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

//purchase route
const purchaseRoute = require("./routes/purchase");
app.use("/api/purchase", purchaseRoute);  

// === REST Routes ===
app.use("/api/yahoo", yahooRoute);
app.use("/api/auth", authRouter);
app.use("/api/newsletter", newsletterRouter);

// === Health Check ===
app.get("/", (req, res) => {
  res.send(" Yahoo Finance & FinFolio Backend is Running");
});

// === Single Quote Route ===
app.get("/api/quote", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: "Missing symbol" });

  try {
    const result = await yahooFinance.quote(symbol);
    const patched = {
      ...result,
      regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
    };
    res.json(patched);
  } catch (err) {
    console.error("Yahoo quote error:", err.message);
    res.status(500).json({ error: "Yahoo Finance quote failed" });
  }
});

// === Bulk Quote Route ===
app.get("/api/quotes", async (req, res) => {
  const symbols = req.query.symbols?.split(",") || [];
  if (!symbols.length) return res.status(400).json({ error: "Missing symbols query" });

  try {
    const results = await Promise.all(symbols.map(async (symbol) => {
      const result = await yahooFinance.quote(symbol);
      return {
        symbol,
        ...result,
        regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
      };
    }));
    res.json(results);
  } catch (err) {
    console.error("Yahoo bulk fetch error:", err.message);
    res.status(500).json({ error: "Yahoo Finance bulk fetch failed" });
  }
});

// === Groq Chatbot ===
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a friendly and helpful assistant for FinFolio users. Keep answers short, clear, and supportive." },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Groq error:", error.message);
    res.status(500).json({ reply: "Sorry, the assistant is having trouble responding right now." });
  }
});

// === Start Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
 */

/* const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// === Route Imports ===
//const yahooRoute = require("./routes/yahoo");
//const authRouter = require("./routes/auth");
const newsletterRouter = require("./routes/newsletter");
const purchaseRoute = require("./routes/purchase");
const sellRoute = require("./routes/sell");
const userStocksRoute = require("./routes/userstocks"); // ✅ ADDED
  
const tradeRoute = require("./routes/trades");
const importRoute = require("./routes/import");

// const yahooRoute = require("./routes/yahoo"); // ❌ no longer needed for NAVigate
// const yahooFinance = require("yahoo-finance2").default; // ❌ stock-only

const authRouter = require("./routes/auth");
const chatbotRouter = require("./routes/Chatbot");

// ✅ Mutual fund helpers for NAVigate
const {
  searchSchemesByName,
  getLatestNavBySchemeCode,
  getVroSchemeDetails,
  getVroRatingsAndRisk,
} = require("./services/mfApis");




const { OpenAI } = require("openai");
//const yahooFinance = require("yahoo-finance2").default;

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("  Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// === Custom Routes ===
//app.use("/api/yahoo", yahooRoute);
app.use("/api/auth", authRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/purchase", purchaseRoute);
app.use("/api/sell", sellRoute);
app.use("/api/userstocks", userStocksRoute);
app.use("/api/trades", tradeRoute);
app.use("/api/import", importRoute);

// === Health Check ===
app.get("/", (req, res) => {
  res.send(" Yahoo Finance & FinFolio Backend is Running");
});

// === Single Quote Route ===
app.get("/api/quote", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: "Missing symbol" });

  try {
    const result = await yahooFinance.quote(symbol);
    const patched = {
      ...result,
      regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
    };
    res.json(patched);
  } catch (err) {
    console.error("Yahoo quote error:", err.message);
    res.status(500).json({ error: "Yahoo Finance quote failed" });
  }
});

// === Bulk Quote Route ===
app.get("/api/quotes", async (req, res) => {
  const symbols = req.query.symbols?.split(",") || [];
  if (!symbols.length) return res.status(400).json({ error: "Missing symbols query" });

  try {
    const results = await Promise.all(symbols.map(async (symbol) => {
      const result = await yahooFinance.quote(symbol);
      return {
        symbol,
        ...result,
        regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
      };
    }));
    res.json(results);
  } catch (err) {
    console.error("Yahoo bulk fetch error:", err.message);
    res.status(500).json({ error: "Yahoo Finance bulk fetch failed" });
  }
});

// === Groq Chatbot ===
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a friendly and helpful assistant for FinFolio users. Keep answers short, clear, and supportive." },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Groq error:", error.message);
    res.status(500).json({ reply: "Sorry, the assistant is having trouble responding right now." });
  }
});

// === Start Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
}); */


/* const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// === Route Imports ===
const newsletterRouter = require("./routes/newsletter");
const purchaseRoute = require("./routes/purchase");
const sellRoute = require("./routes/sell");
const userStocksRoute = require("./routes/userstocks"); // you can later rename to userfunds if you change schema
const tradeRoute = require("./routes/trades");
const importRoute = require("./routes/import");
const authRouter = require("./routes/auth");

// ✅ Mutual fund helpers for NAVigate (AMFI + Value Research)
const {
  searchSchemesByName,
  getLatestNavBySchemeCode,
  getVroSchemeDetails,
  getVroRatingsAndRisk,
} = require("./services/mfApis");

// === MongoDB Connection ===
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("  Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// === Custom Routes ===
// app.use("/api/yahoo", yahooRoute); // ❌ not needed anymore
app.use("/api/auth", authRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/purchase", purchaseRoute);
app.use("/api/sell", sellRoute);
app.use("/api/userstocks", userStocksRoute);
app.use("/api/trades", tradeRoute);
app.use("/api/import", importRoute);

// === Health Check ===
app.get("/", (req, res) => {
  res.send(" NAVigate Mutual Fund Backend is Running");
});

// ===============================
//      NAVigate – Mutual Funds
// ===============================

// 🔍 Search mutual fund schemes by name (AMFI NAV dump)
app.get("/api/mf/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const results = await searchSchemesByName(q);
    // limit to avoid huge payloads
    res.json(results.slice(0, 50));
  } catch (err) {
    console.error("MF search error:", err.message);
    res.status(500).json({ error: "Failed to search mutual fund schemes" });
  }
});

// 📈 Get latest NAV for a scheme (AMFI)
app.get("/api/mf/:schemeCode/nav", async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const navData = await getLatestNavBySchemeCode(schemeCode);

    if (!navData) {
      return res.status(404).json({ error: "Scheme not found in AMFI data" });
    }

    res.json(navData);
  } catch (err) {
    console.error("MF NAV error:", err.message);
    res.status(500).json({ error: "Failed to fetch latest NAV" });
  }
});

// 📊 Detailed scheme info (Value Research via RapidAPI)
app.get("/api/mf/:schemeCode/details", async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const details = await getVroSchemeDetails(schemeCode);
    res.json(details);
  } catch (err) {
    console.error("MF details error:", err.message);
    res.status(500).json({ error: "Failed to fetch mutual fund details" });
  }
});

// ⭐ Ratings & risk metrics (Value Research via RapidAPI)
app.get("/api/mf/:schemeCode/ratings", async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const ratings = await getVroRatingsAndRisk(schemeCode);
    res.json(ratings);
  } catch (err) {
    console.error("MF ratings error:", err.message);
    res.status(500).json({ error: "Failed to fetch ratings and risk" });
  }
});

// === Groq Chatbot ===
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and helpful assistant for NAVigate users managing mutual funds. Keep answers short, clear, and supportive.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Groq error:", error.message);
    res.status(500).json({
      reply: "Sorry, the assistant is having trouble responding right now.",
    });
  }
});

// === Start Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
 */



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// === Route Imports ===
const newsletterRouter = require("./routes/newsletter");
const purchaseRoute = require("./routes/purchase");
const sellRoute = require("./routes/sell");
const userStocksRoute = require("./routes/userstocks"); // you can later rename to userfunds if you change schema
const tradeRoute = require("./routes/trades");
const importRoute = require("./routes/import");
const authRouter = require("./routes/auth");

// ✅ Mutual fund helpers for NAVigate (AMFI + Value Research)
const {
  searchSchemesByName,
  getLatestNavBySchemeCode,
  getVroSchemeDetails,
  getVroRatingsAndRisk,
} = require("./services/mfApis");

// ===============================
//    MongoDB Atlas Connection
// ===============================
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

console.log("Using Mongo URI:", MONGO_URI); // you can remove this after confirming it works

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// === Custom Routes ===
// app.use("/api/yahoo", yahooRoute); // ❌ not needed anymore
app.use("/api/auth", authRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/purchase", purchaseRoute);
app.use("/api/sell", sellRoute);
app.use("/api/userstocks", userStocksRoute);
app.use("/api/trades", tradeRoute);
app.use("/api/import", importRoute);

// === Health Check ===
app.get("/", (req, res) => {
  res.send(" NAVigate Mutual Fund Backend is Running");
});

// 🔍 DB check – to confirm Atlas connection
app.get("/db-check", (req, res) => {
  res.json({
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    readyState: mongoose.connection.readyState, // 1 = connected
  });
});

// ===============================
//      NAVigate – Mutual Funds
// ===============================

// 🔍 Search mutual fund schemes by name (AMFI NAV dump)
app.get("/api/mf/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const results = await searchSchemesByName(q);
    // limit to avoid huge payloads
    res.json(results.slice(0, 50));
  } catch (err) {
    console.error("MF search error:", err.message);
    res.status(500).json({ error: "Failed to search mutual fund schemes" });
  }
});

// 📈 Get latest NAV for a scheme (AMFI)
app.get("/api/mf/:schemeCode/nav", async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const navData = await getLatestNavBySchemeCode(schemeCode);

    if (!navData) {
      return res.status(404).json({ error: "Scheme not found in AMFI data" });
    }

    res.json(navData);
  } catch (err) {
    console.error("MF NAV error:", err.message);
    res.status(500).json({ error: "Failed to fetch latest NAV" });
  }
});

// 📊 Detailed scheme info (Value Research via RapidAPI)
app.get("/api/mf/:schemeCode/details", async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const details = await getVroSchemeDetails(schemeCode);
    res.json(details);
  } catch (err) {
    console.error("MF details error:", err.message);
    res.status(500).json({ error: "Failed to fetch mutual fund details" });
  }
});

// ⭐ Ratings & risk metrics (Value Research via RapidAPI)
app.get("/api/mf/:schemeCode/ratings", async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const ratings = await getVroRatingsAndRisk(schemeCode);
    res.json(ratings);
  } catch (err) {
    console.error("MF ratings error:", err.message);
    res.status(500).json({ error: "Failed to fetch ratings and risk" });
  }
});

// === Groq Chatbot ===
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and helpful assistant for NAVigate users managing mutual funds. Keep answers short, clear, and supportive.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Groq error:", error.message);
    res.status(500).json({
      reply: "Sorry, the assistant is having trouble responding right now.",
    });
  }
});

// === Start Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
