const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  // Ensure data is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Data must be an array.' });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: true, // Set to true as per your requirement
    file_mime_type: "image/png", // Add the mime type
    file_size_kb: "400", // Add the file size
  };

  res.json(response);
});

// GET endpoint for testing
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
