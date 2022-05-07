import { useState } from 'react';

import { Button, HStack, Input, VStack } from '@chakra-ui/react';

import { Token } from 'types/types';

import TokenCard from 'components/TokenCard';

const SearchView = (): JSX.Element => {
	const [results, setResults] = useState<Token>();
	const [address, setAddress] = useState<string>('');
	const [tokenId, setTokenId] = useState<string>('');

	const search = () => {
		// TOOD call the api to search
	};

	return (
		<HStack h="100vh" w="100%" spacing="64px">
			<VStack spacing="32px" bg="rgba(0, 0, 255, 0.1)" p="32px" borderRadius="32px">
				<VStack spacing="16px">
					<Input
						placeholder="Address of the account"
						onChange={(e) => {
							setAddress(e.target.value);
						}}
					/>
					<Input
						placeholder="Token ID"
						onChange={(e) => {
							setTokenId(e.target.value);
						}}
					/>
				</VStack>
				<Button variant="inline" w="100%" cursor="pointer" onClick={search}>
					Search
				</Button>
			</VStack>
			<VStack>
				<TokenCard token={results} />
			</VStack>
		</HStack>
	);
};

export default SearchView;
