import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesFucn from './helpers/routes';
import CallProvider from './context/provider';

function App() {
  return (
    <BrowserRouter>
    <CallProvider>
    <RoutesFucn />
    </CallProvider>
    </BrowserRouter>
  )
}

export default App;
