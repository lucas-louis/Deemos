import { useEffect, useState } from 'react';

import { VStack, Text } from '@chakra-ui/react';

import { Token } from 'types/types';
import TokenCard from '../components/TokenCard';

type DisplayTokenCardsProps = {
	tokens: Token[];
};

const DashboardView = (): JSX.Element => {
	const [certificates, setCertificates] = useState<Token[]>([]);

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
					No certificates found
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
		<VStack w="100%">
			<DisplayTokenCards tokens={certificates} />
		</VStack>
	);
};

export default DashboardView;
