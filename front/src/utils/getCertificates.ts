import React from 'react';

import { ResponseMessage, Token } from 'types/types';

import starton from 'lib/starton';

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
	try {
		const tokens = await starton.getAllTokens(address);

		const req = tokens.map((id: number) => starton.getTokenInfos(id));
		Promise.all(req).then((arr) => setCertificates(arr));
		console.dir(certificates);
		return { success: true, message: 'Certificates loaded' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'An error occured' };
	}
};
export default getCertificates;
