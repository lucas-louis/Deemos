export type Token = {
	name: string;
	description: string;
	tokenURI: string;
	symbol: string;
	endValidityTime: string;
	isValid: boolean;
	uid: string;
	owner: string;
};

export type ResponseMessage = {
	success: boolean;
	message: string;
};
