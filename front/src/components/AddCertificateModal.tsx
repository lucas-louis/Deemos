import { ChangeEvent, useState } from 'react';

import {
	Box,
	Button,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Radio,
	RadioGroup,
	Select,
	Spacer,
	Stack,
	Text,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import Modal from 'components/Modal';

import uploadCertificate from 'utils/uploadCertificate';
import clearCertificateInfos from 'utils/clearCertificateInfos';
import encryptData from 'utils/encryptData';
import checkCertificateInfos from 'utils/checkCertificateInfos';

import { useAuthContext } from 'contexts/auth';

import { ResponseMessage } from 'types/types';

import colors from 'theme/foundations/colors';

type AddCertificateModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AddCertificateModal = ({ isOpen, onClose }: AddCertificateModalProps): JSX.Element => {
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [sex, setSex] = useState('M');
	const [nationality, setNationality] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [birthPlace, setBirthPlace] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [certificateType, setCertificateType] = useState('');
	const [file, setFile] = useState<File | undefined>(undefined);
	const [password, setPassword] = useState('');
	const [show, setShow] = useState(false);
	const auth = useAuthContext();
	const toast = useToast();

	const printToast = (responseMessage: ResponseMessage): void => {
		toast({
			title: responseMessage.message,
			status: responseMessage.success ? 'success' : 'error',
			duration: 2000,
			isClosable: true,
		});
	};

	const handleClick = () => setShow(!show);

	// TODO: update nationality options
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Add your certificate information"
			CTA={
				<Button
					variant="inline"
					w="100%"
					mb="16px"
					onClick={() => {
						if (
							checkCertificateInfos({
								lastName,
								firstName,
								sex,
								nationality,
								birthDate,
								birthPlace,
								expiryDate,
								file,
								certificateType,
								password,
							})
						) {
							uploadCertificate({
								file,
								lastName,
								firstName,
								sex,
								nationality,
								birthDate,
								birthPlace,
								expiryDate,
								certificateType,
								auth,
								key: encryptData({ auth, data: password }),
							}).then((res) => printToast(res));
							clearCertificateInfos({
								setLastName,
								setFirstName,
								setSex,
								setNationality,
								setBirthDate,
								setBirthPlace,
								setExpiryDate,
								setFile,
								setCertificateType,
								setPassword,
							});
							onClose();
						} else {
							printToast({ success: false, message: 'Please fill all the fields' });
						}
					}}
				>
					Upload certificate
				</Button>
			}
		>
			<VStack spacing="24px">
				<HStack w="100%">
					<Input
						type="text"
						w="100%"
						p="10px"
						my="10px"
						color="#FFEBEB"
						placeholder="Last name"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
					/>
					<Spacer />
					<Input
						type="text"
						w="100%"
						p="10px"
						my="10px"
						color="#FFEBEB"
						placeholder="First name"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
					/>
				</HStack>
				<HStack w="100%">
					<VStack w="50%">
						<Text color="#FFEBEB">Select your sex: </Text>
						<RadioGroup onChange={setSex} value={sex} mt="8px" color="#FFEBEB">
							<Stack direction="row">
								<Radio value="M">Male</Radio>
								<Radio value="F">Female</Radio>
							</Stack>
						</RadioGroup>
					</VStack>
					<Select
						size="md"
						w="50%"
						mt="32px"
						color="#FFEBEB"
						placeholder="Select your nationality"
						onChange={(e: ChangeEvent<HTMLSelectElement>) => setNationality(e.target.value)}
					>
						<option value="AUT">Austrian</option>
						<option value="BEL">Belgian</option>
						<option value="BGR">Bulgarian</option>
						<option value="HRV">Croatian</option>
						<option value="CYP">Cypriot</option>
						<option value="CZE">Czech</option>
						<option value="DNK">Danish</option>
						<option value="NLD">Dutch</option>
						<option value="EST">Estonian</option>
						<option value="FIN">Finnish</option>
						<option value="FRA">French</option>
						<option value="DEU">German</option>
						<option value="GRC">Greek</option>
						<option value="HUN">Hungarian</option>
						<option value="IRL">Irish</option>
						<option value="ITA">Italian</option>
						<option value="LVA">Latvian</option>
						<option value="LTU">Lithuanian</option>
						<option value="LUX">Luxembourgers</option>
						<option value="MLT">Maltese</option>
						<option value="POL">Polish</option>
						<option value="PRT">Portuguese</option>
						<option value="ROU">Romanian</option>
						<option value="SVK">Slovak</option>
						<option value="SVN">Slovenes</option>
						<option value="ESP">Spanish</option>
						<option value="SWE">Swedish</option>
					</Select>
				</HStack>
				<HStack w="100%">
					<VStack w="50%">
						<Text color="#FFEBEB">Birth date</Text>
						<Input
							type="date"
							w="100%"
							p="10px"
							my="10px"
							color="#FFEBEB"
							placeholder="Birth date"
							onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)}
						/>
					</VStack>
					<Spacer />
					<VStack w="50%">
						<Text color="#FFEBEB">Birth place</Text>
						<Input
							type="text"
							w="100%"
							p="10px"
							my="10px"
							color="#FFEBEB"
							placeholder="Birth place"
							onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthPlace(e.target.value)}
						/>
					</VStack>
				</HStack>
				<HStack w="100%">
					<VStack w="100%">
						<Text color="#FFEBEB">Expiration certificate date</Text>
						<Input
							type="date"
							w="100%"
							p="10px"
							my="10px"
							color="#FFEBEB"
							placeholder="Expiry date"
							onChange={(e: ChangeEvent<HTMLInputElement>) => setExpiryDate(e.target.value)}
						/>
					</VStack>
					<VStack w="100%">
						<Select
							size="md"
							w="100%"
							mt="32px"
							color="#FFEBEB"
							placeholder="Select your certificate type"
							onChange={(e: ChangeEvent<HTMLSelectElement>) => setCertificateType(e.target.value)}
						>
							<option value="ID">ID Card</option>
							<option value="Passport">Passport</option>
							<option value="Driver's License">Driver's license</option>
						</Select>
					</VStack>
				</HStack>
				<VStack w="100%">
					<Text color="#FFEBEB">Enter a password</Text>
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
				<VStack w="100%">
					<Text color="#FFEBEB">Upload your ID picture</Text>
					<Input
						type="file"
						w="100%"
						h="52px"
						p="10px"
						my="10px"
						color="#FFEBEB"
						accept=".png,.jpg,.jpeg,.pdf"
						placeholder="Your ID card"
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							if (
								e.target.value.endsWith('.png') ||
								e.target.value.endsWith('.jpg') ||
								e.target.value.endsWith('.jpeg') ||
								e.target.value.endsWith('.pdf')
							)
								setFile(e.target.files?.[0]);
							else {
								printToast({ success: false, message: 'File type not allowed' });
							}
						}}
					/>
				</VStack>
			</VStack>
		</Modal>
	);
};

export default AddCertificateModal;
