import Web3 from 'web3';

import { Button, useToast } from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

import { useAuthContext } from 'contexts/auth';

import { motion } from 'framer-motion';

const HomeView = (): JSX.Element => {
	const auth = useAuthContext();
	const history = useHistory();
	const toast = useToast();

	const MotionButton = motion(Button);

	const initWeb3 = async () => {
		let web3Provider;
		// eslint-disable-next-line
		if ((window as any).ethereum) {
			// eslint-disable-next-line
			web3Provider = (window as any).ethereum;
			try {
				// Request account access
				// eslint-disable-next-line
				await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
			} catch (error) {
				// User denied account access...
				console.error('User denied account access');
				web3Provider = undefined;
				toast({
					title: 'User denied account access',
					status: 'error',
					duration: 2500,
					isClosable: true,
				});
			}
		}
		// Legacy dApp browsers...
		// eslint-disable-next-line
		else if ((window as any).web3) {
			// eslint-disable-next-line
			web3Provider = (window as any).web3.currentProvider;
		}
		// If not injected web3 instance is detected, fall back to Ganache
		else {
			web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
		}
		if (web3Provider !== undefined) {
			await auth.login(new Web3(web3Provider));
			if (web3Provider) {
				history.push('/dashboard');
			}
		}
	};

	return (
		<>
			<MotionButton
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 0.1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				variant="inline"
				w="100%"
				onClick={initWeb3}
				cursor="pointer"
				mb="64px"
			>
				Log in with MetaMask
			</MotionButton>
			<MotionButton
				initial={{ opacity: 0 }}
				transition={{ duration: 0.3, delay: 0.1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0.3 } }}
				variant="inline"
				w="100%"
				onClick={() => {
					history.push('/search');
				}}
				cursor="pointer"
			>
				Search a certificate
			</MotionButton>
		</>
	);
};

export default HomeView;
