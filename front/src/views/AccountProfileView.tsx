import { VStack, Text, HStack, Divider, TabList, Tabs, Tab, TabPanel, TabPanels } from '@chakra-ui/react';

import { useEffect } from 'react';

import { useAuthContext } from 'contexts/auth';

import TopBar from 'components/TopBar';

const AccountProfileView = (): JSX.Element => {
	const auth = useAuthContext();

	useEffect(() => {
		(async () => {
			await getArts();
		})();
	}, []);

	const getArts = async () => {
		// TODO GET to API and fill setArts
	};

	return (
		<VStack>
			<TopBar />
			<HStack>
				<Text color="#FFEBEB" fontSize="32px">
					Welcome {auth.accountName} 👋
				</Text>
			</HStack>
			<Divider w="75%" pt="16px" />
			<Tabs variant="soft-rounded" align="center">
				<TabList w="15%">
					<Tab color="white">My pictures</Tab>
					<Tab color="white">Pictures liked</Tab>
				</TabList>

				<TabPanels>
					<TabPanel />
					<TabPanel />
				</TabPanels>
			</Tabs>
		</VStack>
	);
};

export default AccountProfileView;
