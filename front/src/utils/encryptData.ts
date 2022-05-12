import Auth from 'lib/auth';

type EncryptDataProps = {
	auth: Auth;
	data: string;
};

const encryptData = ({ auth, data }: EncryptDataProps): string => {
	if (auth.account) {
		const res = auth.account.utils.sha3(data);
		if (res) return res;
		return '';
	}
	return '';
};

export default encryptData;
