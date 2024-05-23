const axios = require('axios');

module.exports = async (req, res) => {
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`User IP: ${userIp}`);

  try {
    const response = await axios.get(`https://ipapi.co/${userIp}/json/`);
    const location = response.data;
    console.log(`User Location: ${JSON.stringify(location)}`);
    res.status(200).send(`Your IP address is ${userIp} and your location is ${location.city}, ${location.region}, ${location.country_name}`);
  } catch (error) {
    console.error(`Error fetching location for IP ${userIp}: ${error.message}`);
    res.status(500).send(`Your IP address is ${userIp}. Unable to determine location.`);
  }
};
