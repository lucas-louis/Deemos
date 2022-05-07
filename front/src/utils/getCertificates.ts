import React from 'react';

import { ResponseMessage, Token } from 'types/types';

import deemos from 'lib/starton';

type GetCertificatesProps = {
	address: string;
	certificates: Token[];
	setCertificates: React.Dispatch<React.SetStateAction<Token[]>>;
};

const getCertificates = async ({
	address,
	certificates,
	setCertificates,
}: GetCertificatesProps): Promise<ResponseMessage> => {
	const tokens = await deemos.getAllTokens(address);

	console.log('tokens', tokens);
	tokens.map(async (id: number) => {
		certificates.push(await deemos.getTokenInfo(id));
	});
	setCertificates(certificates);
	return { success: true, message: 'success' };
};
export default getCertificates;
