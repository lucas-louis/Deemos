import { useEffect, useState } from 'react';

import { VStack, Text, Button, HStack, Divider, useDisclosure } from '@chakra-ui/react';

import { Token } from 'types/types';

import TokenCard from 'components/TokenCard';
import AddCertificateModal from 'components/AddCertificateModal';

type DisplayTokenCardsProps = {
	tokens: Token[];
};

const DashboardView = (): JSX.Element => {
	const [certificates, setCertificates] = useState<Token[]>([]);
	const {
		isOpen: isOpenCertificateModal,
		onClose: onCloseCertificateModal,
		onOpen: onOpenCertificateModal,
	} = useDisclosure();

	useEffect(() => {
		(async () => {
			await getCertificates();
		})();
	}, []);

	const getCertificates = async (): Promise<Token[]> => [];

	// TODO improve "no certificates" message
	const DisplayTokenCards = ({ tokens }: DisplayTokenCardsProps): JSX.Element => {
		if (tokens.length === 0)
			return (
				<Text fontSize="32px" color="#FFEBEB" fontWeight="700">
					No certificates founded
				</Text>
			);
		return (
			<>
				{certificates.map((certificate) => (
					<TokenCard token={certificate} />
				))}
			</>
		);
	};

	return (
		<HStack h="100vh" w="100%">
			<VStack w="100%" h="50%" spacing="64px">
				<VStack w="50%" spacing="16px">
					<Button variant="inline" w="50%" cursor="pointer" onClick={onOpenCertificateModal}>
						Add Certificate
					</Button>
					<Divider w="75%" />
				</VStack>
				<DisplayTokenCards tokens={certificates} />
			</VStack>
			<AddCertificateModal isOpen={isOpenCertificateModal} onClose={onCloseCertificateModal} />
		</HStack>
	);
};

export default DashboardView;
