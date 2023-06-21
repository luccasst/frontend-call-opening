import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPages';
import CallPage from '../pages/callPage';


function RoutesFunc() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/call" element={<CallPage />} />
    </Routes>
  );
}

export default RoutesFunc;
