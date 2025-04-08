const { QUIRKY_RESPONSES } = require('../config/constants');

module.exports.quirkyResponses = (input) => {
  const lowerInput = input.toLowerCase();
  for (const [keyword, responses] of Object.entries(QUIRKY_RESPONSES)) {
    if (lowerInput.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return null;
};