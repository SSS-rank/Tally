// src/routes.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';

import AccountAdd from './pages/AccountAdd';
import AccountDetail from './pages/AccountDetail';
import AccountList from './pages/AccountList';
import CallBack from './pages/CallBack';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ShopForm from './pages/Shop/ShopForm';
import ShopList from './pages/Shop/ShopList';
import TransferPage from './pages/TransferPage';

function Routes() {
	const routes = useRoutes([
		{
			path: '/',
			element: <LoginPage />,
		},
		{
			path: '/main',
			element: <MainPage />,
		},
		{
			path: '/list',
			element: <AccountList />,
		},
		{
			path: '/shop',
			element: <ShopList />,
		},
		{
			path: '/shop/form',
			element: <ShopForm />,
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
		{
			path: '/oauth/kakao/callback',
			element: <CallBack />,
		},
	]);

	return routes;
}
export default Routes;
