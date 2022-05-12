import { useEffect, useState } from 'react';

import { VStack, Button, HStack, Divider, useDisclosure, useToast } from '@chakra-ui/react';

import { ResponseMessage, Token } from 'types/types';

import TokenCard from 'components/TokenCard';
import AddCertificateModal from 'components/AddCertificateModal';

import getCertificates from 'utils/getCertificates';

import { useAuthContext } from 'contexts/auth';
import colors from 'theme/foundations/colors';

const DashboardView = (): JSX.Element => {
	const [certificates, setCertificates] = useState<Token[]>([]);
	const [index, setIndex] = useState<number>(0);
	const {
		isOpen: isOpenCertificateModal,
		onClose: onCloseCertificateModal,
		onOpen: onOpenCertificateModal,
	} = useDisclosure();
	const address = useAuthContext().accountAddress;
	const toast = useToast();

	useEffect(() => {
		(async () => {
			getCertificates({ address, certificates, setCertificates }).then((res) => printToast(res));
		})();
	}, []);

	const previousIndex = () => {
		if (index - 1 < 0) {
			setIndex(certificates.length - 1);
		} else {
			setIndex(index - 1);
		}
	};

	const nextIndex = () => {
		if (index + 1 > certificates.length - 1) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
	};

	const printToast = (responseMessage: ResponseMessage): void => {
		toast({
			title: responseMessage.message,
			status: responseMessage.success ? 'success' : 'error',
			duration: 2000,
			isClosable: true,
		});
	};

	return (
		<VStack w="100%" h="100%" spacing="64px" pt="64px">
			<VStack w="50%" spacing="16px">
				<Button variant="inline" w="50%" cursor="pointer" onClick={onOpenCertificateModal}>
					Add Certificate
				</Button>
				<Divider w="75%" />
				<TokenCard token={certificates[index]} displayRevoke />
			</VStack>
			<HStack>
				<Button
					w="128px"
					border={`3px solid ${colors.blue[700]}`}
					bg="transparent"
					color="#FFEBEB"
					onClick={previousIndex}
				>
					Prev
				</Button>
				<Button variant="inline" w="128px" onClick={nextIndex}>
					Next
				</Button>
			</HStack>
			<AddCertificateModal isOpen={isOpenCertificateModal} onClose={onCloseCertificateModal} />
		</VStack>
	);
};

export default DashboardView;
