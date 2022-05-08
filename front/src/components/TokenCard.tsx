import { Box, Button, Divider, HStack, Spacer, Text, useToast, VStack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';

import axios from 'axios';

import { GetContentTokenURIResponse, Token } from 'types/types';

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
				<Box bg="green" px="32px" py="16px" borderRadius="64px" w="75%">
					<Text color="#FFEBEB" fontSize="16px">
						Token valid
					</Text>
				</Box>
			);
		}
		return (
			<Box bg="red" px="32px" py="16px" borderRadius="64px" w="75%">
				<Text color="#FFEBEB" fontSize="16px">
					Token invalid
				</Text>
			</Box>
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
	const toast = useToast();

	useEffect(() => {
		(async () => {
			if (token) {
				axios.get(token.tokenURI).then((res) => setTokenInfos(res.data));
			}
		})();
	}, [token]);

	if (!token || !tokenInfos) {
		return (
			<VStack w="100%" h="50vh" p="32px" ml="128px" borderRadius="32px" bg="rgba(0, 0, 255, 0.1)">
				<Text color="#FFEBEB" fontWeight="700">
					No certificate found for this address!
				</Text>
			</VStack>
		);
	}

	const dateToStringDate = (date: string): string => {
		const newDate = new Date(date);
		return `${newDate.getDay()} / ${newDate.getMonth()} / ${newDate.getFullYear()}`;
	};

	const onClick = (copyText: string) => {
		navigator.clipboard.writeText(copyText);
	};

	return (
		<VStack
			w="100%"
			h="600px"
			p="32px"
			ml="128px"
			borderRadius="32px"
			bg="rgba(0, 0, 255, 0.1)"
			textAlign="center"
			mr="64px"
		>
			<Text color="#FFEBEB" fontSize="24px">
				{token.name}
			</Text>
			<Text color="#FFEBEB" fontSize="20px">
				{token.description}
			</Text>
			<Divider w="75%" />
			<HStack w="100%" pb="8px" pt="32px">
				<Text color="#FFEBEB" fontSize="16px" isTruncated w="100%">
					{token.owner}
				</Text>
				<Spacer />
				<Button
					size="sm"
					variant="inline"
					w="96px"
					onClick={async () => {
						onClick(token.owner);
						toast({
							title: 'Owner address, copied to clipboard',
							status: 'info',
							duration: 5000,
							isClosable: true,
						});
					}}
				>
					<CopyIcon w="16px" h="16px" />
				</Button>
			</HStack>
			<HStack w="100%">
				<Text color="#FFEBEB" fontSize="16px" w="100%">
					IPFS URI
				</Text>
				<Spacer />
				<Button
					size="sm"
					variant="inline"
					w="96px"
					onClick={async () => {
						onClick(token.tokenURI);
						toast({
							title: 'IPFS URI, copied to clipboard',
							status: 'info',
							duration: 5000,
							isClosable: true,
						});
					}}
				>
					<CopyIcon w="16px" h="16px" />
				</Button>
			</HStack>
			<Text color="#FFEBEB" fontSize="16px" py="8px">
				Birth date: {dateToStringDate(tokenInfos.age)}
			</Text>
			<Text color="#FFEBEB" fontSize="16px" py="8px">
				Nationality: {tokenInfos.nationality}
			</Text>
			<Text color="#FFEBEB" fontSize="16px" py="8px">
				Expiration Date: {dateToStringDate(tokenInfos.expirationTime)}
			</Text>
			<Text color="#FFEBEB" fontSize="16px" pt="8px" pb="32px">
				Token ID: {token.id}
			</Text>
			<ValidityTokenCard token={token} />
		</VStack>
	);
};

export default TokenCard;
