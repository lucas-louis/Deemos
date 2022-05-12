import { Redirect, Switch, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import HomeView from '../views/HomeView';
import DashboardView from '../views/DashboardView';
import SearchView from '../views/SearchView';

import HomeRoute from './HomeRoute';
import PrivateRoute from './PrivateRoute';
import SearchRoute from './SearchRoute';

// eslint-disable-next-line
const Routes = () => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.pathname}>
				<HomeRoute exact path="/" children={<HomeView />} />
				<SearchRoute path="/search" children={<SearchView />} />
				<PrivateRoute path="/dashboard" children={<DashboardView />} />
				<Redirect push to="/" />
			</Switch>
		</AnimatePresence>
	);
};

export default Routes;
