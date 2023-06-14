import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPages';


function RoutesFunc() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default RoutesFunc;
