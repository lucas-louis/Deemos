import { useState } from 'react';

import { Button, HStack, Input, useToast, VStack } from '@chakra-ui/react';

import { ResponseMessage, Token } from 'types/types';

import TokenCard from 'components/TokenCard';
import searchCertificate from '../utils/searchCertificate';

const SearchView = (): JSX.Element => {
	const [results, setResults] = useState<Token>();
	const [address, setAddress] = useState<string>('');
	const [tokenID, setTokenID] = useState<string>('');
	const toast = useToast();

	const printToast = (responseMessage: ResponseMessage): void => {
		toast({
			title: responseMessage.message,
			status: responseMessage.success ? 'success' : 'error',
			duration: 2000,
			isClosable: true,
		});
	};

	return (
		<HStack h="100vh" w="100%" spacing="64px">
			<VStack spacing="32px" bg="rgba(0, 0, 255, 0.1)" p="32px" borderRadius="32px">
				<VStack spacing="16px">
					<Input
						color="#FFEBEB"
						placeholder="Address of the account"
						onChange={(e) => {
							setAddress(e.target.value);
						}}
					/>
					<Input
						color="#FFEBEB"
						placeholder="Token ID"
						onChange={(e) => {
							setTokenID(e.target.value);
						}}
					/>
				</VStack>
				<Button
					variant="inline"
					w="100%"
					cursor="pointer"
					onClick={async () => {
						printToast(await searchCertificate({ address, tokenID, setResults }));
					}}
				>
					Search
				</Button>
			</VStack>
			<VStack w="40%">
				<TokenCard token={results} />
			</VStack>
		</HStack>
	);
};

export default SearchView;
