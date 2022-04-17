// node-geocoder converts the address passed to latitude and longitude with more precise info

const NodeGeocoder = require('node-geocoder');
// https://developer.mapquest.com/user/me/profile for the geocoder provider and geocoder api key to implement the node-geocoder
// https://github.com/nchaulet/node-geocoder to learn how to use node-geocoder and its syntax below

const options = {
  provider: process.env.GEOCODER_PROVIDER,

  // Optional depending on the providers
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder