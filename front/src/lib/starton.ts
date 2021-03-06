import axios, { AxiosResponse } from 'axios';

import {
	REACT_APP_STARTON_API_KEY,
	REACT_APP_STARTON_BASE_URL,
	REACT_APP_STARTON_CONTRACT_URI,
	REACT_APP_SIGNER_WALLET,
} from 'config/config';

import { Token } from 'types/types';

type GetAllTokensRes = {
	_hex: string;
	_isBigNumber: boolean;
};

const customAxios = axios.create({
	headers: {
		'x-api-key': REACT_APP_STARTON_API_KEY,
	},
	baseURL: REACT_APP_STARTON_BASE_URL,
});

// eslint-disable-next-line
const req = (func: string, param: any[]) => {
	const modifyingFunctions = ['createToken', 'unvalidToken'];
	if (!modifyingFunctions.find((f) => f === func)) {
		return customAxios.post(`${REACT_APP_STARTON_CONTRACT_URI}/read`, {
			functionName: func,
			params: [...param],
		});
	}
	return customAxios.post(`${REACT_APP_STARTON_CONTRACT_URI}/call`, {
		functionName: func,
		signerWallet: REACT_APP_SIGNER_WALLET,
		speed: 'low',
		params: [...param],
	});
};

const uriToCid = (uri: string): string => {
	const splittedUri = uri.split('/');
	return splittedUri[splittedUri.length - 1];
};

const pinCid = async (cid: string): Promise<boolean> => {
	const res: AxiosResponse = await customAxios.post('/pinning/pins', {
		cid,
		name: cid,
	});
	return res.status === 202;
};

const starton = {
	createToken: async (address: string, tokenUri: string, expiration: string, key: string): Promise<number> => {
		const name = 'DEEMOS_ID';
		const description = 'Certifies your date of birth and nationality';
		const symbol = 'DEE';

		const res: AxiosResponse = await req('createToken', [
			address,
			name,
			description,
			tokenUri,
			symbol,
			(new Date(expiration).getTime() / 1000).toString(10),
			key,
		]);
		pinCid(uriToCid(tokenUri));
		return res.data.response;
	},

	balanceOf: async (address: string): Promise<number> => {
		const res: AxiosResponse = await req('balanceOf', [address]);
		return parseInt(res.data.response, 10);
	},

	ownerOf: async (id: number): Promise<string> => {
		const res: AxiosResponse = await req('ownerOf', [id]);
		return res.data.response;
	},

	isValid: async (id: number): Promise<boolean> => {
		const res: AxiosResponse = await req('isvalid', [id]);
		return res.data.response === true;
	},

	hasValid: async (address: string, id: number): Promise<boolean> => {
		const res: AxiosResponse = await req('hasValid', [address, id]);
		return res.data.response === true;
	},

	getTokenInfos: async (id: number): Promise<Token> => {
		const res: AxiosResponse = await req('getTokenInfos', [id]);
		return {
			name: res.data.response[0],
			description: res.data.response[1],
			symbol: res.data.response[2],
			tokenURI: res.data.response[3],
			// eslint-disable-next-line no-underscore-dangle
			endValidityTime: parseInt(res.data.response[4]._hex, 16).toString(10),
			isValid: res.data.response[5],
			// eslint-disable-next-line no-underscore-dangle
			id: parseInt(res.data.response[6]._hex, 16).toString(10),
			owner: res.data.response[7],
		};
	},

	getAllTokens: async (address: string): Promise<number[]> => {
		const res: AxiosResponse = await req('getAllTokens', [address]);
		// eslint-disable-next-line no-underscore-dangle
		return res.data.response.map((id: GetAllTokensRes) => parseInt(id._hex, 16));
	},

	unvalidToken: async (id: number, key: string): Promise<boolean> => {
		const res: AxiosResponse = await req('unvalidToken', [id, key]);
		return res.data.response as boolean;
	},
};

export default starton;
