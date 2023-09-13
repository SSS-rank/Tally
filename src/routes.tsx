// src/routes.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';

import AccountAdd from './pages/AccountAdd';
import AccountDetail from './pages/AccountDetail';
import CallBack from './pages/CallBack';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Payment from './pages/Payment/Payment';
import ShopForm from './pages/Shop/ShopForm';
import ShopList from './pages/Shop/ShopList';
import TransferPage from './pages/Transfer/TransferPage';

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
			path: '/shop',
			element: <ShopList />,
		},
		{
			path: '/shop/form',
			element: <ShopForm />,
		},
		{
			path: '/payment',
			element: <Payment />,
		},
		{
			path: '/add',
			element: <AccountAdd />,
		},
		{
			path: '/accountdetail',
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
