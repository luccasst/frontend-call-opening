import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesFucn from './helpers/routes';

function App() {
  return (
    <BrowserRouter>
    <RoutesFucn />
    </BrowserRouter>
  )
}

export default App;
