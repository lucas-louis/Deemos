import Auth from 'lib/auth';
import deemos from 'lib/starton';

import uploadFile from 'utils/uploadFile';

import { ResponseMessage } from 'types/types';
import { REACT_APP_BASE_URI } from '../config/config';

type UploadCertificateProps = {
	file: File | undefined;
	lastName: string;
	firstName: string;
	sex: string;
	nationality: string;
	birthDate: string;
	birthPlace: string;
	expiryDate: string;
	auth: Auth;
};

const uploadCertificate = async ({
	file,
	lastName,
	firstName,
	sex,
	nationality,
	birthDate,
	birthPlace,
	expiryDate,
	auth,
}: UploadCertificateProps): Promise<ResponseMessage> => {
	// TODO improve return messages
	if (auth.account) {
		const data = {
			age: birthDate,
			nationality,
			expirationTime: expiryDate,
		};
		const newFile = new File([JSON.stringify(data)], 'metadata.json');
		const CID = await uploadFile(auth.account.currentProvider, newFile);
		const result = await deemos.createToken(auth.accountAddress, `${REACT_APP_BASE_URI}${CID}`, expiryDate);
		return { success: true, message: 'Good' };
	}
	return { success: false, message: 'Bad account' };
};

export default uploadCertificate;
