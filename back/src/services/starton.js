const  axios = require('axios');
const config = require('../config');


const customAxios = axios.create({
	headers: {
		'x-api-key': config.STARTON_API_KEY,
	},
	baseURL: config.STARTON_BASE_URL,
});

const req = (func, param, address = '') => {
	const modifyingFunctions = ['createToken', 'unvalidToken'];
	if (!modifyingFunctions.find((f) => f === func)) {
		return customAxios.post(`${config.STARTON_CONTRACT_URI}/read`, {
			functionName: func,
			params: [...param],
		});
	}
	return customAxios.post(`${config.STARTON_CONTRACT_URI}/call`, {
		functionName: func,
		signerWallet: config.SIGNER_WALLET,
		speed: 'low',
		params: [...param],
	});
};

const uriToCid = (uri) => {
	const splittedUri = uri.split('/');
	return splittedUri[splittedUri.length - 1];
};

const pinCid = async (cid) => {
	const res = await customAxios.post('/pinning/pins', {
		cid,
		name: cid,
	});
	return res.status === 202;
};

const starton = {
	createToken: async (address, tokenUri, expiration) => {
		const name = 'DEEMOS_ID';
		const description = 'certifies your date of birth and nationality';
		const symbol = 'DEE';

		const res = await req(
			'createToken',
			[
				config.SIGNER_WALLET,
				name,
				description,
				tokenUri,
				symbol,
				Date.parse(expiration).toString(10),
			],
			address,
		);
		pinCid(uriToCid(tokenUri));
		console.dir(res.data)
		return res.data.response;
	},

	balanceOf: async (address) => {
		const res = await req('balanceOf', [address]);
		return parseInt(res.data.response, 10);
	},

	ownerOf: async (id) => {
		const res = await req('ownerOf', [id]);
		return res.data.response;
	},

	isValid: async (id) => {
		const res = await req('isvalid', [id]);
		return res.data.response === true;
	},

	hasValid: async (address, id) => {
		const res = await req('hasValid', [address, id]);
		return res.data.response === true;
	},

	getTokenInfos: async (id) => {
		const res = await req('getTokenInfos', [id]);
		console.log(res.data);
		return res.data.response;
	},

	getAllTokens: async (address) => {
		const res= await req('getAllTokens', [address]);
		// eslint-disable-next-line no-underscore-dangle
		return res.data.response.map((id) => parseInt(id._hex, 16));
	},

	unvalidToken: async (id, address) => {
		const res = await req('unvalidToken', [id], address);
		return res.data.response;
	},
};

module.exports = starton;
