// src/routes.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';

import AccountAdd from './pages/AccountAdd';
import AccountDetail from './pages/AccountDetail';
import AccountList from './pages/AccountList';
import MainPage from './pages/MainPage';
import TransferPage from './pages/TransferPage';

function Routes() {
	const routes = useRoutes([
		{
			path: '/',
			element: <MainPage />,
		},
		{
			path: '/list',
			element: <AccountList />,
		},
		{
			path: '/add',
			element: <AccountAdd />,
		},
		{
			path: '/accountdetail/:accountNumber',
			element: <AccountDetail />,
		},

		{
			path: '/transfer',
			element: <TransferPage />,
		},
	]);

	return routes;
}
export default Routes;
