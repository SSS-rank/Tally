import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import AccountAdd from './pages/AccountAdd';
import AccountDetail from './pages/AccountDetail';
import TransferPage from "./pages/TransferPage";
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
        <Route path="/transfer" element={<TransferPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
