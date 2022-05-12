import { Token } from 'types/types';

import starton from 'lib/starton';

const revokeCertificate = async (certificate: Token, key: string): Promise<void> => {
	await starton.unvalidToken(parseInt(certificate.id, 10), key);
};

export default revokeCertificate;
