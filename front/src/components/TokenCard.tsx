import { Button, Text, VStack } from '@chakra-ui/react';

import { Token } from 'types/types';

type TokenCardProps = {
	token: Token | undefined;
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
	return (
		<VStack w="100%" h="50vh" p="32px" ml="128px" borderRadius="32px" bg="rgba(0, 0, 255, 0.1)">
			<Text color="#FFEBEB" fontSize="24px">
				{token.name}
			</Text>
			<Text color="#FFEBEB" fontSize="20px">
				{token.description}
			</Text>
			<Text color="#FFEBEB" fontSize="16px">
				{token.owner}
			</Text>
			<Text color="#FFEBEB" fontSize="16px">
				{token.isValid}
			</Text>
		</VStack>
	);
};

export default TokenCard;
