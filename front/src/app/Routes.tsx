import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import HomeView from 'views/HomeView';
import AccountProfileView from 'views/AccountProfileView';
import DashboardView from 'views/DashboardView';
import SearchView from 'views/SearchView';

import HomeRoute from 'app/HomeRoute';
import PrivateRoute from 'app/PrivateRoute';
import SearchRoute from 'app/SearchRoute';

const Routes = (): JSX.Element => (
	<BrowserRouter>
		<Switch>
			<HomeRoute exact path="/" children={<HomeView />} />
			<SearchRoute path="/search" children={<SearchView />} />
			<PrivateRoute path="/dashboard" children={<DashboardView />} />
			<PrivateRoute path="/account" children={<AccountProfileView />} />
			<Redirect push to="/" />
		</Switch>
	</BrowserRouter>
);

export default Routes;
