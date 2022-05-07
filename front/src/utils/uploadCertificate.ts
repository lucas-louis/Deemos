import Auth from 'lib/auth';
import axios from 'axios';
import uploadFile from './uploadFile';

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
}: UploadCertificateProps) => {
	if (auth.account) {
		const data = {
			age: birthDate,
			nationality,
		};
		const newFile = new File([JSON.stringify(data)], 'metadata.json');
		const CID = await uploadFile(auth.account.currentProvider, newFile);
		console.log('CID', CID);
		const address = await auth.account.eth.getAccounts();

		console.log('address', address);
		const http = axios.create({
			baseURL: 'http://127.0.0.1/api/',
			headers: {
				ContentType: 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const result = await http.post(`/identity?wallet_adress=${address[0]}&cid=${CID}`, {
			card: {
				first_name: firstName,
				last_name: lastName,
				date_of_birth: birthDate,
				sex,
				nationality,
				place_of_birth: birthPlace,
				expiration: expiryDate,
			},
			file,
		});
		console.log(result.status, result.data);
	}
	console.log(file, lastName, firstName, sex, nationality, birthDate, birthPlace, expiryDate);
};

export default uploadCertificate;
