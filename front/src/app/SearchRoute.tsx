import { Link, Route, RouteProps } from 'react-router-dom';

import { HStack, Text, VStack } from '@chakra-ui/react';

import Footer from 'components/Footer';

import { motion } from 'framer-motion';

type SearchRouteProps = { children: JSX.Element } & RouteProps;

const SearchRoute = ({ children, ...rest }: SearchRouteProps): JSX.Element => {
	const MotionText = motion(Text);

	return (
		<Route {...rest}>
			<HStack h="100vh">
				<VStack spacing="56px" w="50%">
					<VStack spacing="16px">
						<Link to="/">
							<MotionText
								initial={{ opacity: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0, transition: { delay: 0.3 } }}
								fontSize={{ base: '32px', md: '56px', lg: '64px' }}
								fontWeight="extrabold"
								color="#FFEBEB"
								id="title"
								textAlign="center"
							>
								Deemos
							</MotionText>
						</Link>
						<MotionText
							initial={{ opacity: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { delay: 0.3 } }}
							fontSize={{ base: '6px', '3xs': '10px', '2xs': '12px', xs: '14px', '2sm': '16px' }}
							id="sub-title"
							textAlign="center"
							color="#FFEBEB"
						>
							The first decentralized certification platform
						</MotionText>
					</VStack>
				</VStack>
				<VStack w="50%">{children}</VStack>
				<Footer />
			</HStack>
		</Route>
	);
};

export default SearchRoute;
