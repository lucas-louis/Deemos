import { Route, RouteProps, useHistory } from 'react-router-dom';

import { HStack, Text, VStack, Image } from '@chakra-ui/react';

import Footer from 'components/Footer';

import { motion } from 'framer-motion';

type SearchRouteProps = { children: JSX.Element } & RouteProps;

const SearchRoute = ({ children, ...rest }: SearchRouteProps): JSX.Element => {
	const history = useHistory();

	const MotionText = motion(Text);
	const MotionImage = motion(Image);

	return (
		<Route {...rest}>
			<HStack h="100vh">
				<VStack spacing="56px" w="50%">
					<VStack spacing="16px">
						<MotionImage
							initial={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { delay: 0.3 } }}
							onClick={() => {
								history.push('/');
							}}
							cursor="pointer"
							src="https://raw.githubusercontent.com/lucas-louis/Deemos/5abfea3b46d07a1dcff21bed9262dd1a6268f849/front/public/deemos-white-logo.svg"
						/>
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
