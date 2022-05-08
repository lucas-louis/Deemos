import Auth from 'lib/auth';
import starton from 'lib/starton';
import axios from 'axios';

import uploadFile from 'utils/uploadFile';

import { ResponseMessage } from 'types/types';
import { REACT_APP_BASE_URI, REACT_APP_BACKEND } from '../config/config';

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
	try {
		// TODO improve return messages
		if (auth.account) {
			const data = {
				age: birthDate,
				nationality,
				expirationTime: expiryDate,
			};
			const newFile = new File([JSON.stringify(data)], 'metadata.json');
			const CID = await uploadFile(auth.account.currentProvider, newFile);
			// const result = await axios.post(
			//	`${REACT_APP_BACKEND}/api/identity?wallet_address=${auth.accountAddress}&tokenUri=${REACT_APP_BASE_URI}${CID}&expiration=${expiryDate}`,
			// );
			// console.dir(result.data);
			const result = await starton.createToken(auth.accountAddress, `${REACT_APP_BASE_URI}${CID}`, expiryDate);
			return { success: true, message: 'Certificat added' };
		}
		return { success: false, message: 'Bad account' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'An error occured' };
	}
};

export default uploadCertificate;
