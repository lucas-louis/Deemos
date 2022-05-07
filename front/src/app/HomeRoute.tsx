import { Route, RouteProps } from 'react-router-dom';

import { HStack, Text, VStack } from '@chakra-ui/react';
import Footer from '../components/Footer';

type HomeRouteProps = { children: JSX.Element } & RouteProps;

const HomeRoute = ({ children, ...rest }: HomeRouteProps): JSX.Element => (
	<Route {...rest}>
		<HStack h="100vh">
			<VStack spacing="56px" w="50%">
				<VStack spacing="16px">
					<Text
						fontSize={{ base: '32px', md: '56px', lg: '64px' }}
						fontWeight="extrabold"
						color="#FFEBEB"
						id="title"
						textAlign="center"
					>
						Deemos
					</Text>
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
			<VStack w={{ base: '90%', md: '496px' }}>{children}</VStack>
		</HStack>
		<Footer />
	</Route>
);

export default HomeRoute;
