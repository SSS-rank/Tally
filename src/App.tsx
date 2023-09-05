import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import AccountAdd from './pages/AccountAdd';
import AccountDetail from './pages/AccountDetail';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/accountadd" element={<AccountAdd />} />
        <Route path="/accountdetail/:accountNumber" element={<AccountDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
