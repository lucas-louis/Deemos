import { Button, Input, Text } from '@chakra-ui/react';

import Modal from 'components/Modal';
import { ChangeEvent, useState } from 'react';
import uploadCertificate from 'utils/uploadCertificate';
import { useAuthContext } from '../contexts/auth';

type AddCertificateModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AddCertificateModal = ({ isOpen, onClose }: AddCertificateModalProps): JSX.Element => {
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [sex, setSex] = useState('');
	const [nationality, setNationality] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [birthPlace, setBirthPlace] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [file, setFile] = useState<File | undefined>(undefined);
	const auth = useAuthContext();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Upload a file"
			CTA={
				<Button
					variant="inline"
					w="100%"
					mb="16px"
					onClick={() => {
						uploadCertificate({
							file,
							lastName,
							firstName,
							sex,
							nationality,
							birthDate,
							birthPlace,
							expiryDate,
							auth,
						});
						onClose();
					}}
				>
					Upload file
				</Button>
			}
		>
			<>
				<Input
					type="text"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="Last name"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
				/>
				<Input
					type="text"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="First name"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
				/>
				<Input
					type="text"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="Sex"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSex(e.target.value)}
				/>
				<Input
					type="text"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="Nationality"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setNationality(e.target.value)}
				/>
				<Input
					type="text"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="Birth place"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthPlace(e.target.value)}
				/>
				<Text>Birth date</Text>
				<Input
					type="date"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="Birth date"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)}
				/>
				<Text>Expiry date</Text>
				<Input
					type="date"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="Expiry date"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setExpiryDate(e.target.value)}
				/>
				<Input
					type="file"
					h="100%"
					w="100%"
					p="10px"
					my="10px"
					placeholder="Your ID card"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
				/>
			</>
		</Modal>
	);
};

export default AddCertificateModal;
