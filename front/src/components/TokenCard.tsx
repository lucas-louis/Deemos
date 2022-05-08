import { Text, VStack } from '@chakra-ui/react';

import { GetContentTokenURIResponse, Token } from 'types/types';
import getContentTokenURI from 'utils/getContentTokenURI';
import { useEffect, useState } from 'react';
import axios from 'axios';

type TokenCardProps = {
	token: Token | undefined;
};

type ValidityTokenCardProps = {
	token: Token | undefined;
};

const ValidityTokenCard = ({ token }: ValidityTokenCardProps): JSX.Element => {
	if (token) {
		if (token.isValid) {
			return (
				<Text bg="white" color="green" fontSize="20px">
					Token valid
				</Text>
			);
		}
		return (
			<Text bg="white" color="red" fontSize="20px">
				Token invalid
			</Text>
		);
	}
	return <></>;
};

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
	const [tokenInfos, setTokenInfos] = useState<GetContentTokenURIResponse>({
		age: '',
		nationality: '',
		expirationTime: '',
	});

	useEffect(() => {
		(async () => {
			if (token) {
				console.log('te');
				axios.get(token.tokenURI).then((res) => console.log(res));
			}
		})();
	}, []);

	if (!token || !tokenInfos) {
		return (
			<VStack w="100%" h="50vh" p="32px" ml="128px" borderRadius="32px" bg="rgba(0, 0, 255, 0.1)">
				<Text color="#FFEBEB" fontWeight="700">
					No certificate found for this address!
				</Text>
			</VStack>
		);
	}

	return (
		<VStack w="100%" h="50vh" p="32px" ml="128px" borderRadius="32px" bg="rgba(0, 0, 255, 0.1)">
			<Text color="#FFEBEB" fontSize="24px">
				{token.name}
			</Text>
			<Text color="#FFEBEB" fontSize="20px" pb="32px">
				{token.description}
			</Text>
			<Text color="#FFEBEB" fontSize="16px">
				{token.owner}
			</Text>
			<Text color="#FFEBEB" fontSize="16px">
				{token.tokenURI}
			</Text>
			<Text color="#FFEBEB" fontSize="16px">
				{tokenInfos.age}
			</Text>
			<Text color="#FFEBEB" fontSize="16px">
				{tokenInfos.nationality}
			</Text>
			<Text color="#FFEBEB" fontSize="16px">
				{tokenInfos.expirationTime}
			</Text>
			<ValidityTokenCard token={token} />
		</VStack>
	);
};

export default TokenCard;
