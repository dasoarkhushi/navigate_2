/* 
const express = require("express");
const router = express.Router();
require("dotenv").config();

const fetchImpl = (typeof fetch === "function") ? fetch : require("node-fetch");

const DEFAULT_MODEL = "llama-3.1-8b-instant";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Valid message is required" });
  }

  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("Missing GROQ_API_KEY in environment");
    return res.status(500).json({ error: "Server misconfiguration: missing API key" });
  }

  const bodyPayload = {
    model,
    messages: [
      { role: "system", content: "You are a helpful assistant for a stock app called FinFolio." },
      { role: "user", content: message }
    ]
  };

  // Log the outgoing payload so you can verify the model string being sent
  console.log("Sending to Groq:", JSON.stringify(bodyPayload, null, 2));

  // Setup timeout
  const controller = new AbortController();
  const timeoutMs = Number(process.env.GROQ_TIMEOUT_MS) || 15000; // 15s default
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const groqResponse = await fetchImpl(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(bodyPayload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    // If non-2xx, try to read the JSON error and log it
    if (!groqResponse.ok) {
      let errBody;
      try {
        errBody = await groqResponse.json();
      } catch (e) {
        errBody = { raw: await groqResponse.text() };
      }
      console.error("Groq returned non-OK status:", groqResponse.status, errBody);
      return res.status(502).json({ error: "Upstream Groq API error", details: errBody });
    }

    const data = await groqResponse.json();
    console.log("Full Groq API response:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? null;

    if (!reply) {
      console.warn("No reply found in Groq response");
      return res.status(502).json({ error: "Groq did not return a usable reply", raw: data });
    }

    console.log("LLaMA 3 (Groq) reply:", reply);
    res.status(200).json({ reply });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      console.error("Groq request timed out");
      return res.status(504).json({ error: "Groq request timed out" });
    }
    console.error("Groq API Error:", err);
    res.status(500).json({ error: "Groq failed to respond", details: err.message });
  }
});

module.exports = router;
 */


// routes/chatbot.js (for Groq + LLaMA 3)
const express = require("express");
const router = express.Router();
/* const fetch = require("node-fetch"); */
require("dotenv").config();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Valid message is required" });
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful assistant for a stock app called FinFolio." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await groqResponse.json();
    console.log("Full Groq API response:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content;

    console.log("LLaMA 3 (Groq) reply:", reply);
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Groq API Error:", err);
    res.status(500).json({ error: "Groq failed to respond" });
  }
});

module.exports = router;