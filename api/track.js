const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`User IP: ${userIp}`);

  try {
    const response = await axios.get(`https://ipapi.co/${userIp}/json/`);
    const location = response.data;
    console.log(`User Location: ${JSON.stringify(location)}`);
    
    const logMessage = `IP: ${userIp}, Location: ${location.city}, ${location.region}, ${location.country_name}\n`;
    const logFilePath = path.join(__dirname, '..', 'logs', 'access.log');
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
    
    res.status(200).send(`Your request has been logged.`);
  } catch (error) {
    console.error(`Error fetching location for IP ${userIp}: ${error.message}`);
    res.status(500).send(`Unable to determine location. Your request has been logged.`);
  }
};
