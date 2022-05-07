const axios = require('axios');
const config = require('./config');


const customAxios = axios.create({
	headers: {
		'x-api-key': config.STARTON_API_KEY,
	},
	baseURL: config.STARTON_BASE_URL,
});

module.exports = customAxios;
