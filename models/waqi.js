// FUNCTIONS
var data = {}

const axios = require('axios');

// This one posts sensor data to the DB
exports.getlocalpollutiondata = async (latitude,longitude) => {
  
  res = await axios.get('http://api.waqi.info/feed/geo:'+latitude+';'+longitude+'/?token='+process.env['waqikey'])

  return(res.data.data.iaqi)
}