require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { quirkyResponses } = require('./utils/quirky');
const { getOpenAIResponse } = require('./utils/openai');

const app = express();
app.use(cors());
app.use(express.json());

// Personality modes
const PERSONALITIES = {
  normal: "You're a helpful AI assistant",
  pirate: "Respond like a pirate from the Caribbean",
  robot: "Speak in monotone beeps and boops",
  conspiracy: "Everything is connected to aliens"
};

app.post('/chat', async (req, res) => {
  const { message, mode } = req.body;
  
  // Check for quirky responses
  const lowerInput = message.toLowerCase();
  const quirkyReply = quirkyResponses(lowerInput);
  if (quirkyReply) return res.json({ reply: quirkyReply });

  // Get mode-specific response
  try {
    const reply = await getOpenAIResponse({
      message,
      systemPrompt: PERSONALITIES[mode] || PERSONALITIES.normal
    });
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "AI core meltdown detected 🔥" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server sailing on port ${PORT} 🏴‍☠️`));