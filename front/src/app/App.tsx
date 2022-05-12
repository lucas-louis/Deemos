import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Center, Spinner } from '@chakra-ui/react';

import Routes from 'app/Routes';

import AuthContext from 'contexts/auth';

import Auth from 'lib/auth';

const App = (): JSX.Element => {
	const [auth, setAuth] = useState<Auth | undefined>(undefined);
	const [error, setError] = useState<Error | unknown>(undefined);

	useEffect(() => {
		if (!auth && !error) {
			try {
				setAuth(new Auth());
			} catch (e) {
				setError(e);
			}
		}
	}, []);

	if (!auth) {
		return (
			<Center mt="160px">
				<Spinner w="160px" />
			</Center>
		);
	}

	return (
		<>
			<AuthContext.Provider value={auth}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</AuthContext.Provider>
		</>
	);
};

export default App;
