import { store } from 'aleph-js';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getFile = async (tokenURI) => {
	const result = await store.retrieve(tokenURI, {
		api_server: 'https://api2.aleph.im',
	});

	return result.toString('utf8');
};

export default getFile;
