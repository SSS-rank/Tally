import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import AccountAdd from "./pages/AccountAdd";
import AccountDetail from "./pages/AccountDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/accountadd" element={<AccountAdd />} />
          <Route
            path="/accountdetail/:accountNumber"
            element={<AccountDetail />}
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
