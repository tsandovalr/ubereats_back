"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: 'MIICVCqo8W9CQrr9v1IsbVKmL9BtbACl',
    formatter: null
};
const geocoder = NodeGeocoder(options);
exports.default = geocoder;
