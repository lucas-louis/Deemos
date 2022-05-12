import { useEffect, useState } from 'react';
import { Button, HStack, useToast, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import TokenCard from './TokenCard';
import getCertificates from '../utils/getCertificates';
import { useAuthContext } from '../contexts/auth';
import { ResponseMessage, Token } from '../types/types';
import colors from '../theme/foundations/colors';

const TokenCards = (): JSX.Element => {
	const [certificates, setCertificates] = useState<Token[]>([]);
	const [index, setIndex] = useState<number>(0);
	const address = useAuthContext().accountAddress;
	const toast = useToast();

	const MotionButton = motion(Button);
	const MotionVStack = motion(VStack);

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

	useEffect(() => {
		(async () => {
			getCertificates({ address, certificates, setCertificates }).then((res) => printToast(res));
		})();
	}, []);

	return (
		<>
			<TokenCard token={certificates[index]} displayRevoke key={index} />
			<HStack pt="32px">
				<MotionButton
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 1.3 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
					w="128px"
					border={`3px solid ${colors.blue[700]}`}
					bg="transparent"
					color="#FFEBEB"
					onClick={previousIndex}
				>
					Prev
				</MotionButton>
				<MotionButton
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 1.3 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.3 } }}
					variant="inline"
					w="128px"
					onClick={nextIndex}
				>
					Next
				</MotionButton>
			</HStack>
		</>
	);
};

export default TokenCards;
