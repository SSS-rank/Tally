import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AccountAdd from './pages/AccountAdd';
import AccountDetail from './pages/AccountDetail';
import MainPage from './pages/MainPage';
import TransferPage from './pages/TransferPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/accountadd" element={<AccountAdd />} />
				<Route path="/accountdetail/:accountNumber" element={<AccountDetail />} />
				<Route path="/transfer" element={<TransferPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
