import { Box, Button, Divider, HStack, Spacer, Text, Tooltip, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';

import axios from 'axios';

import '@fontsource/rubik';

import { GetContentTokenURIResponse, Token } from 'types/types';

import { motion } from 'framer-motion';

import PasswordModal from './PasswordModal';

type TokenCardProps = {
	token: Token | undefined;
	displayRevoke: boolean;
};

type ValidityTokenCardProps = {
	token: Token | undefined;
};

const ValidityTokenCard = ({ token }: ValidityTokenCardProps): JSX.Element => {
	const MotionBox = motion(Box);

	if (token) {
		if (token.isValid) {
			return (
				<MotionBox
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 1.6 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
					bg="green"
					px="32px"
					py="8px"
					borderRadius="64px"
					w="75%"
					mb="16px"
				>
					<Text color="#FFEBEB" fontSize="16px">
						This certificate is valid
					</Text>
				</MotionBox>
			);
		}
		return (
			<MotionBox
				initial={{ opacity: 0 }}
				transition={{ duration: 0.5, delay: 1.6 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				bg="red"
				px="32px"
				py="8px"
				borderRadius="64px"
				w="75%"
				mb="16px"
			>
				<Text color="#FFEBEB" fontSize="16px">
					This certificate is invalid
				</Text>
			</MotionBox>
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

	const MotionBox = motion(Box);
	const MotionDivider = motion(Divider);
	const MotionVStack = motion(VStack);
	const MotionText = motion(Text);

	useEffect(() => {
		(async () => {
			if (token) {
				axios.get(token.tokenURI).then((res) => setTokenInfos(res.data));
			}
		})();
	}, [token]);

	if (!token || !tokenInfos) {
		return (
			<Text color="#FFEBEB" fontWeight="700">
				No certificate found!
			</Text>
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
					<MotionBox
						initial={{ opacity: 0 }}
						transition={{ duration: 0.5, delay: 1.8 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0.3 } }}
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
					</MotionBox>
					<PasswordModal isOpen={isOpenPasswordModal} onClose={onClosePasswordModal} token={token} />
				</>
			);
		return <></>;
	};

	return (
		<>
			<ValidityTokenCard token={token} />
			<MotionText
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 0.6 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				color="#FFEBEB"
				fontSize="24px"
				fontFamily="Rubik"
			>
				{token.name}
			</MotionText>
			<MotionText
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 0.7 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				color="#FFEBEB"
				fontSize="20px"
			>
				{token.description}
			</MotionText>
			<MotionDivider
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 0.7 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				w="75%"
			/>
			<HStack w="100%" pt="24px" pb="16px">
				<MotionVStack
					w="50%"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.3, delay: 0.9 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
				>
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
				</MotionVStack>
				<Spacer />
				<MotionVStack
					w="50%"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.3, delay: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
				>
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
				</MotionVStack>
			</HStack>
			<HStack>
				<MotionText
					initial={{ opacity: 0 }}
					transition={{ duration: 0.3, delay: 1.2 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
					color="#FFEBEB"
					fontSize="16px"
					py="8px"
				>
					Birth date: {dateToStringDate(tokenInfos.age)}
				</MotionText>
				<Spacer />
				<MotionText
					initial={{ opacity: 0 }}
					transition={{ duration: 0.3, delay: 1.2 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
					color="#FFEBEB"
					fontSize="16px"
					py="8px"
				>
					Nationality: {tokenInfos.nationality}
				</MotionText>
			</HStack>
			<MotionText
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 1.2 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				color="#FFEBEB"
				fontSize="16px"
				py="4px"
			>
				Certificate expiration: {dateToStringDate(tokenInfos.expirationTime)}
			</MotionText>
			<MotionText
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 1.3 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				color="#FFEBEB"
				fontSize="16px"
				pt="4px"
			>
				Certificate type: {tokenInfos.type}
			</MotionText>
			<MotionText
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 1.4 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				color="#FFEBEB"
				fontSize="24px"
				pt="8px"
				pb="32px"
			>
				Certificate #{token.id}
			</MotionText>
			<RevokeButton />
		</>
	);
};

export default TokenCard;
