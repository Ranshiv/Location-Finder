const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/track', async (req, res) => {
  let userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Handle IPv6 localhost
  if (userIp === '::1' || userIp === '127.0.0.1') {
    userIp = '8.8.8.8'; // Google's public DNS IP, for testing purposes
  }

  console.log(`User IP: ${userIp}`);

  try {
    const response = await axios.get(`https://ipapi.co/${userIp}/json/`);
    const location = response.data;
    console.log(`User Location: ${JSON.stringify(location)}`);
    res.send(`Your IP address is ${userIp} and your location is ${location.city}, ${location.region}, ${location.country_name}`);
  } catch (error) {
    console.error(`Error fetching location for IP ${userIp}: ${error.message}`);
    res.send(`Your IP address is ${userIp}. Unable to determine location.`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});