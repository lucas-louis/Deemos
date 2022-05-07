import { useEffect } from 'react';
import { Link, Route, RouteProps, useHistory } from 'react-router-dom';

import { Center, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useAuthContext } from '../contexts/auth';
import Footer from '../components/Footer';

type PrivateRouteProps = { children: JSX.Element } & RouteProps;

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps): JSX.Element => {
	const auth = useAuthContext();
	const history = useHistory();

	useEffect(() => {
		if (!auth || !auth.account) history.push('/');
	}, []);

	if (!auth || !auth.account)
		return (
			<Center mt="160px">
				<Spinner w="160px" />
			</Center>
		);

	return (
		<Route {...rest}>
			<HStack h="100vh">
				<VStack spacing="56px" w="50%">
					<VStack spacing="16px">
						<Link to="/">
							<Text
								fontSize={{ base: '32px', md: '56px', lg: '64px' }}
								fontWeight="extrabold"
								color="#FFEBEB"
								id="title"
								textAlign="center"
							>
								Deemos
							</Text>
						</Link>
						<Text
							fontSize={{ base: '6px', '3xs': '10px', '2xs': '12px', xs: '14px', '2sm': '16px' }}
							id="sub-title"
							textAlign="center"
							color="#FFEBEB"
						>
							The first decentralized certification platform
						</Text>
					</VStack>
				</VStack>
				<VStack w="50%">{children}</VStack>
			</HStack>
			<Footer />
		</Route>
	);
};

export default PrivateRoute;
