import axios from 'axios';

type GetContenTokenURIProps = {
	tokenURI: string;
};

const getContentTokenURI = async ({ tokenURI }: GetContenTokenURIProps) => {
	const result = await axios.get(tokenURI);
	console.log(result.data);
};

export default getContentTokenURI;
