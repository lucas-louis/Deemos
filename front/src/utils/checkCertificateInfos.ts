type CheckCertificateInfosProps = {
	lastName: string;
	firstName: string;
	sex: string;
	nationality: string;
	birthDate: string;
	birthPlace: string;
	expiryDate: string;
	file: File | undefined;
	certificateType: string;
	password: string;
};

const checkCertificateInfos = ({
	lastName,
	firstName,
	sex,
	nationality,
	birthDate,
	birthPlace,
	expiryDate,
	file,
	certificateType,
	password,
}: CheckCertificateInfosProps): boolean => {
	console.log(
		lastName,
		firstName,
		sex,
		nationality,
		birthDate,
		birthPlace,
		expiryDate,
		file,
		certificateType,
		password,
	);

	return (
		lastName !== '' &&
		firstName !== '' &&
		sex !== '' &&
		nationality !== '' &&
		birthDate !== '' &&
		birthPlace !== '' &&
		expiryDate !== '' &&
		file !== undefined &&
		certificateType !== '' &&
		password !== ''
	);
};

export default checkCertificateInfos;
