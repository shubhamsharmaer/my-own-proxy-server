const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// app.use('/', (req, res) => {
//     res.send('Universal Proxy Server');
// })

// Universal proxy route
app.use('/proxy', async (req, res) => {
  const targetUrl = req.query.url;  // Accept the target API URL from the request query

  if (!targetUrl) {
    return res.status(400).json({ error: 'Target URL is required' });
  }

  try {
    // Forward the request to the target URL
    const response = await axios.get(targetUrl);
    res.json(response.data);
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Format the timestamp
    const timestamp = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

    // Log the usage
    console.log(`Proxy bypass used for target URL: ${targetUrl} at [${timestamp}]`);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from target API' });
  }
});

app.listen(PORT, () => {
  console.log(`Universal Proxy Server is running on port ${PORT}`);
});