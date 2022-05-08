import { Button, Text, VStack } from '@chakra-ui/react';

import { Token } from 'types/types';
import getContentTokenURI from '../utils/getContentTokenURI';

type TokenCardProps = {
	token: Token | undefined;
};

const ValidityTokenCard = ({ token }: TokenCardProps): JSX.Element => {
	if (token) {
		if (token.isValid) {
			return (
				<Text color="green" fontSize="20px">
					Token valid
				</Text>
			);
		}
		return (
			<Text color="red" fontSize="20px">
				Token invalid
			</Text>
		);
	}
	return <></>;
};

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
	if (!token) {
		return (
			<VStack w="100%" h="50vh" p="32px" ml="128px" borderRadius="32px" bg="rgba(0, 0, 255, 0.1)">
				<Text color="#FFEBEB" fontWeight="700">
					No certificate founded for this address!
				</Text>
			</VStack>
		);
	}
	const temp = async () => {
		await getContentTokenURI({ tokenURI: token.tokenURI });
	};
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
			<Button onClick={temp}>G</Button>
			<ValidityTokenCard token={token} />
		</VStack>
	);
};

export default TokenCard;
