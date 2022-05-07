import { ethereum, store } from 'aleph-js';

// eslint-disable-next-file @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const uploadFile = async (provider, file) => {
	const account = await ethereum.from_provider(provider);

	const result = await store.submit(account.address, {
		fileobject: file,
		account,
		channel: 'TEST',
		storage_engine: 'ipfs',
		api_server: 'https://api2.aleph.im', // please select an API server accepting files, this one does!
	});
	return result.content.item_hash;
};

export default uploadFile;
