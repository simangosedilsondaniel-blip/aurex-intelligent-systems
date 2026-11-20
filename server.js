
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors({
  origin: "https://simangosedilsondaniel-blip.github.io"
}));

app.use(express.json({ limit: "20kb" }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("AUREX AI Assistant Server is running.");
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string" || message.length > 2000) {
      return res.status(400).json({
        error: "Please provide a valid message."
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are AUREX AI Assistant, the official virtual assistant of AUREX Intelligent Systems.

AUREX operates in Mozambique and South Africa.

Its five divisions are:
1. AUREX AI Solutions
2. AUREX Automation
3. AUREX Digital
4. AUREX Data Intelligence
5. AUREX Systems

Explain services professionally, help customers understand the company, and respond in the same language used by the customer, Portuguese or English.

Never invent prices, guarantees, partnerships or company facts. When a customer needs a quotation or human assistance, direct them to WhatsApp: +258 820 209 107.`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error("AUREX AI error:", error.message);

    res.status(500).json({
      error: "The assistant is temporarily unavailable."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AUREX server running on port ${PORT}`);
});
