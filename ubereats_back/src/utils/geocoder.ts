const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'MIICVCqo8W9CQrr9v1IsbVKmL9BtbACl',
  formatter: null
};

const geocoder = NodeGeocoder(options);

export default geocoder;
