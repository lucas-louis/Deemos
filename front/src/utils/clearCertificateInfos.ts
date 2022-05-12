import React from 'react';

type UploadCertificateProps = {
	setLastName: React.Dispatch<React.SetStateAction<string>>;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	setSex: React.Dispatch<React.SetStateAction<string>>;
	setNationality: React.Dispatch<React.SetStateAction<string>>;
	setBirthDate: React.Dispatch<React.SetStateAction<string>>;
	setBirthPlace: React.Dispatch<React.SetStateAction<string>>;
	setExpiryDate: React.Dispatch<React.SetStateAction<string>>;
	setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
	setCertificateType: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const clearCertificateInfos = ({
	setLastName,
	setFirstName,
	setSex,
	setNationality,
	setBirthDate,
	setBirthPlace,
	setExpiryDate,
	setFile,
	setCertificateType,
	setPassword,
}: UploadCertificateProps): void => {
	setLastName('');
	setFirstName('');
	setSex('');
	setNationality('');
	setBirthDate('');
	setBirthPlace('');
	setExpiryDate('');
	setFile(undefined);
	setCertificateType('');
	setPassword('');
};

export default clearCertificateInfos;
