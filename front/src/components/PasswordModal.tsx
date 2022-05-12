import { ChangeEvent, useState } from 'react';

import { Box, Button, Input, InputGroup, InputRightElement, Text, useToast, VStack } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useAuthContext } from 'contexts/auth';

import Modal from 'components/Modal';

import { ResponseMessage, Token } from 'types/types';

import revokeCertificate from 'utils/revokeCertificate';
import encryptData from 'utils/encryptData';

import colors from 'theme/foundations/colors';

type PasswordModalProps = {
	isOpen: boolean;
	onClose: () => void;
	token: Token;
};

const PasswordModal = ({ isOpen, onClose, token }: PasswordModalProps): JSX.Element => {
	const [password, setPassword] = useState('');
	const [show, setShow] = useState(false);
	const auth = useAuthContext();
	const toast = useToast();

	// TODO: add encryption for password
	const handleClick = () => setShow(!show);

	const printToast = (responseMessage: ResponseMessage): void => {
		toast({
			title: responseMessage.message,
			status: responseMessage.success ? 'success' : 'error',
			duration: 2000,
			isClosable: true,
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Revoke certificate's validity"
			CTA={
				<Button
					variant="inline"
					w="100%"
					mb="16px"
					onClick={async () => {
						printToast(await revokeCertificate(token, encryptData({ auth, data: password })));
						onClose();
					}}
				>
					Validate
				</Button>
			}
		>
			<VStack w="100%">
				<Text color="#FFEBEB">Enter the password</Text>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						w="100%"
						p="10px"
						my="10px"
						color="#FFEBEB"
						placeholder="Enter password"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
					<InputRightElement width="15%">
						<Box
							bg={`linear-gradient(90deg, ${colors.blue[700]} 0%, ${colors.red[700]} 100%)`}
							cursor="pointer"
							mt="20px"
							px="16px"
							py="2px"
							borderRadius="6px"
							onClick={handleClick}
						>
							{show ? <ViewOffIcon color="#FFEBEB" /> : <ViewIcon color="#FFEBEB" />}
						</Box>
					</InputRightElement>
				</InputGroup>
			</VStack>
		</Modal>
	);
};

export default PasswordModal;
