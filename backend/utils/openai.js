const axios = require('axios');

const getOpenAIResponse = async ({ message, systemPrompt }) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` } }
  );
  return response.data.choices[0].message.content;
};

module.exports = { getOpenAIResponse };