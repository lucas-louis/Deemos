import React from 'react';

import { ResponseMessage, Token } from 'types/types';

import starton from 'lib/starton';

type SearchCertificateProps = {
	address: string;
	tokenID: string;
	setResults: React.Dispatch<React.SetStateAction<Token | undefined>>;
};

const searchCertificate = async ({
	address,
	tokenID,
	setResults,
}: SearchCertificateProps): Promise<ResponseMessage> => {
	try {
		if (await starton.hasValid(address, parseInt(tokenID, 10))) {
			setResults(await starton.getTokenInfo(parseInt(tokenID, 10)));
			return { success: true, message: 'Certificate found' };
		}
		return { success: false, message: 'Certificate not found' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'An error occured' };
	}
};
export default searchCertificate;
