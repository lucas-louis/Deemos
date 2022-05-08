import React from 'react';

import { ResponseMessage, Token } from 'types/types';

import starton from 'lib/starton';
import { start } from 'repl';
import axios, { AxiosResponse } from 'axios';
import { REACT_APP_BACKEND } from '../config/config'

type GetCertificatesProps = {
	address: string;
	certificates: Token[];
	setCertificates: React.Dispatch<React.SetStateAction<Token[]>>;
};

type GetAllTokensRes = {
	_hex: string;
	_isBigNumber: boolean;
};

const getCertificates = async ({
	address,
	certificates,
	setCertificates,
}: GetCertificatesProps): Promise<ResponseMessage> => {
	try {
		let tokens;
		await axios.get(`${REACT_APP_BACKEND}/api/tokens/${address}`).then(async (res: AxiosResponse) => {
			tokens = res.data.response.map((id: GetAllTokensRes) => parseInt(id._hex, 16));
			const req = tokens.map((id: number) =>  axios.get(`${REACT_APP_BACKEND}/api/identity/${id}`) )//starton.getTokenInfos(id));
			await Promise.all(req).then((arr) => setCertificates(arr))
		});
		// const tokens = await starton.getAllTokens(address);

		return { success: true, message: 'Certificate loaded' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'An error occured' };
	}
};
export default getCertificates;
