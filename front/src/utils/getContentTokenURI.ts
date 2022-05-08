import { GetContentTokenURIResponse } from 'types/types';
import React from 'react';
import getFile from 'utils/getFile';

type GetContentTokenURIProps = {
	tokenURI: string;
	setTokenInfos: React.Dispatch<React.SetStateAction<GetContentTokenURIResponse>>;
};

const getContentTokenURI = async ({ tokenURI, setTokenInfos }: GetContentTokenURIProps): Promise<void> => {
	// const req = axios.get(tokenURI);
	// Promise.all([req]).then(([res]) => {
	// 	console.log(res.data);
	// });
	const req = await getFile(tokenURI);
	console.log(await getFile(tokenURI));
};

export default getContentTokenURI;
