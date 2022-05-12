import { VStack, Button, Divider, useDisclosure } from '@chakra-ui/react';

import AddCertificateModal from 'components/AddCertificateModal';
import TokenCards from 'components/TokenCards';

import { motion } from 'framer-motion';

const DashboardView = (): JSX.Element => {
	const {
		isOpen: isOpenCertificateModal,
		onClose: onCloseCertificateModal,
		onOpen: onOpenCertificateModal,
	} = useDisclosure();
	const MotionButton = motion(Button);
	const MotionVStack = motion(VStack);
	const MotionDivider = motion(Divider);

	return (
		<VStack w="100%" h="100%" spacing="64px" pt="64px">
			<VStack w="50%" spacing="16px">
				<MotionButton
					initial={{ opacity: 0, y: -50 }}
					transition={{ duration: 0.5, delay: 1 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50, transition: { delay: 0.3 } }}
					variant="inline"
					w="50%"
					cursor="pointer"
					onClick={onOpenCertificateModal}
				>
					Add Certificate
				</MotionButton>
				<MotionDivider
					initial={{ opacity: 0, y: -50 }}
					transition={{ duration: 0.5, delay: 1 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
					w="75%"
				/>
				<MotionVStack
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
					w="100%"
					px="32px"
					py="16px"
					ml="128px"
					borderRadius="32px"
					bg="rgba(0, 0, 255, 0.1)"
					textAlign="center"
					mr="64px"
				>
					<TokenCards />
				</MotionVStack>
			</VStack>

			<AddCertificateModal isOpen={isOpenCertificateModal} onClose={onCloseCertificateModal} />
		</VStack>
	);
};

export default DashboardView;
