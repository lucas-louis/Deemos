import axios, { AxiosResponse } from 'axios';

import { REACT_APP_STARTON_API_KEY, REACT_APP_STARTON_BASE_URL, REACT_APP_STARTON_CONTRACT_URI } from 'config/config';
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

const req = (func: string, param: any[], address = '') => {
	const modifyingFunctions = ['createToken', 'unvalidToken'];
	if (!modifyingFunctions.find((f) => f === func)) {
		return customAxios.post(`${REACT_APP_STARTON_CONTRACT_URI}/read`, {
			functionName: func,
			params: [...param],
		});
	}
	return customAxios.post(`${REACT_APP_STARTON_CONTRACT_URI}/call`, {
		functionName: func,
		signerWallet: '0xc613066dB8085B44d7212C0c3389c747Ea71b325',
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
	createToken: async (address: string, tokenUri: string, expiration: string): Promise<number> => {
		const name = 'DEEMOS_ID';
		const description = 'certifies your date of birth and nationality';
		const symbol = 'DEE';

		const res: AxiosResponse = await req(
			'createToken',
			[
				'0xc613066dB8085B44d7212C0c3389c747Ea71b325',
				name,
				description,
				tokenUri,
				symbol,
				Date.parse(expiration).toString(10),
			],
			address,
		);
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
		console.log(res.data);
		return res.data.response as Token;
	},

	getAllTokens: async (address: string): Promise<number[]> => {
		const res: AxiosResponse = await req('getAllTokens', [address]);
		// eslint-disable-next-line no-underscore-dangle
		return res.data.response.map((id: GetAllTokensRes) => parseInt(id._hex, 16));
	},

	unvalidToken: async (id: number, address: string): Promise<boolean> => {
		const res: AxiosResponse = await req('unvalidToken', [id], address);
		return res.data.response as boolean;
	},
};

export default starton;
