import { Link, Route, RouteProps } from 'react-router-dom';

import { HStack, Text, VStack } from '@chakra-ui/react';
import Footer from '../components/Footer';

type SearchRouteProps = { children: JSX.Element } & RouteProps;

const SearchRoute = ({ children, ...rest }: SearchRouteProps): JSX.Element => (
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

export default SearchRoute;
