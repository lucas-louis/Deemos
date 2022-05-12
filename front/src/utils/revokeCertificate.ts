import { ResponseMessage, Token } from '../types/types';
import starton from '../lib/starton';

const revokeCertificate = async (certificate: Token, key: string): Promise<ResponseMessage> => {
	await starton.unvalidToken(parseInt(certificate.id, 10), key);
	return { success: true, message: 'Certificate validity revoked' };
};

export default revokeCertificate;
