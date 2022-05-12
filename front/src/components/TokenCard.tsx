import { Box, Button, Divider, HStack, Spacer, Text, Tooltip, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';

import axios from 'axios';

import '@fontsource/rubik';

import { GetContentTokenURIResponse, Token } from 'types/types';

import PasswordModal from './PasswordModal';

type TokenCardProps = {
	token: Token | undefined;
	displayRevoke: boolean;
};

type ValidityTokenCardProps = {
	token: Token | undefined;
};

const ValidityTokenCard = ({ token }: ValidityTokenCardProps): JSX.Element => {
	if (token) {
		if (token.isValid) {
			return (
				<Box bg="green" px="32px" py="8px" borderRadius="64px" w="75%" mb="16px">
					<Text color="#FFEBEB" fontSize="16px">
						This certificate is valid
					</Text>
				</Box>
			);
		}
		return (
			<Box bg="red" px="32px" py="8px" borderRadius="64px" w="75%" mb="16px">
				<Text color="#FFEBEB" fontSize="16px">
					This certificate is invalid
				</Text>
			</Box>
		);
	}
	return <></>;
};

const TokenCard = ({ token, displayRevoke }: TokenCardProps): JSX.Element => {
	const [tokenInfos, setTokenInfos] = useState<GetContentTokenURIResponse>({
		age: '',
		nationality: '',
		expirationTime: '',
		type: '',
	});
	const { isOpen: isOpenPasswordModal, onClose: onClosePasswordModal, onOpen: onOpenPasswordModal } = useDisclosure();
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
					No certificate found!
				</Text>
			</VStack>
		);
	}

	const dateToStringDate = (date: string): string => {
		const newDate = new Date(date);
		return `${newDate.toLocaleDateString('en')}`;
	};

	const onClick = (copyText: string) => {
		navigator.clipboard.writeText(copyText);
	};

	const RevokeButton = (): JSX.Element => {
		if (displayRevoke)
			return (
				<>
					<Box
						bg="red"
						px="32px"
						py="4px"
						borderRadius="64px"
						w="100%"
						mt="16px"
						cursor="pointer"
						onClick={onOpenPasswordModal}
					>
						<Text color="#FFEBEB" fontSize="16px">
							Revoke certificate's validity
						</Text>
					</Box>
					<PasswordModal isOpen={isOpenPasswordModal} onClose={onClosePasswordModal} token={token} />
				</>
			);
		return <></>;
	};

	return (
		<VStack
			w="100%"
			px="32px"
			py="16px"
			ml="128px"
			borderRadius="32px"
			bg="rgba(0, 0, 255, 0.1)"
			textAlign="center"
			mr="64px"
		>
			<ValidityTokenCard token={token} />
			<Text color="#FFEBEB" fontSize="24px" fontFamily="Rubik">
				{token.name}
			</Text>
			<Text color="#FFEBEB" fontSize="20px">
				{token.description}
			</Text>
			<Divider w="75%" />
			<HStack w="100%" pt="24px" pb="16px">
				<VStack w="50%">
					<Text color="#FFEBEB" fontSize="16px" isTruncated w="100%">
						{token.owner}
					</Text>
					<Tooltip label="Copy address">
						<Button
							size="sm"
							variant="inline"
							w="128px"
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
					</Tooltip>
				</VStack>
				<Spacer />
				<VStack w="50%">
					<Text color="#FFEBEB" fontSize="16px" w="100%">
						IPFS URI
					</Text>
					<Tooltip label="Copy IPFS URI">
						<Button
							size="sm"
							variant="inline"
							w="128px"
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
					</Tooltip>
				</VStack>
			</HStack>
			<HStack>
				<Text color="#FFEBEB" fontSize="16px" py="8px">
					Birth date: {dateToStringDate(tokenInfos.age)}
				</Text>
				<Spacer />
				<Text color="#FFEBEB" fontSize="16px" py="8px">
					Nationality: {tokenInfos.nationality}
				</Text>
			</HStack>
			<Text color="#FFEBEB" fontSize="16px" py="4px">
				Certificate expiration: {dateToStringDate(tokenInfos.expirationTime)}
			</Text>
			<Text color="#FFEBEB" fontSize="16px" pt="4px">
				Certificate type: {tokenInfos.type}
			</Text>
			<Text color="#FFEBEB" fontSize="24px" pt="8px" pb="32px">
				Certificate #{token.id}
			</Text>

			<RevokeButton />
		</VStack>
	);
};

export default TokenCard;
