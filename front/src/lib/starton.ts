import axios, { AxiosResponse } from 'axios';

import { Token } from 'types/types';

import { REACT_APP_STARTON_API_KEY, REACT_APP_STARTON_BASE_URL, REACT_APP_STARTON_CONTRACT_URI } from 'config/config';

const customAxios = axios.create({
	headers: {
		'x-api-key': REACT_APP_STARTON_API_KEY,
	},
	baseURL: REACT_APP_STARTON_BASE_URL,
});

const req = (func: string, param: any[]) => {
	console.log(REACT_APP_STARTON_CONTRACT_URI);
	// => /read
	return customAxios.post(REACT_APP_STARTON_CONTRACT_URI, {
		functionName: func,
		params: [...param],
	});
	// => /call
	// return customAxios.post(REACT_APP_STARTON_CONTRACT_URI, {
	// 	functionName: func,
	//	signerWallet: WALLET,
	// 	speed: 'low',
	// 	params: [...param],
	// });
};

const deemos = {
	createToken: async (address: string, tokenUri: string, expiration: string): Promise<number> => {
		const name = 'DEEMOS_ID';
		const description = 'Certifies your date of birth and nationality';
		const symbol = 'DEE';
		const res: AxiosResponse = await req('createToken', [address, name, description, tokenUri, symbol, expiration]);
		return res.data;
	},

	balanceOf: async (address: string): Promise<number> => {
		const res: AxiosResponse = await req('balanceOf', [address]);
		return res.data;
	},

	ownerOf: async (id: number): Promise<string> => {
		const res: AxiosResponse = await req('ownerOf', [id]);
		return res.data;
	},

	isValid: async (id: number): Promise<boolean> => {
		const res: AxiosResponse = await req('isvalid', [id]);
		return res.data === true;
	},

	hasValid: async (address: string, id: number): Promise<boolean> => {
		const res: AxiosResponse = await req('hasValid', [address, id]);
		return res.data === true;
	},

	getTokenInfo: async (id: number): Promise<Token> => {
		const res: AxiosResponse = await req('getTokenInfo', [id]);
		return res.data as Token;
	},

	getAllTokens: async (address: string): Promise<number[]> => {
		console.log(address);
		const res: AxiosResponse = await req('getAllTokens', [address]);
		return res.data as number[];
	},

	unvalidToken: async (id: number): Promise<boolean> => {
		const res: AxiosResponse = await req('unvalidToken', [id]);
		return res.data as boolean;
	},
};

export default deemos;
