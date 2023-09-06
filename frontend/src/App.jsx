import React from 'react';
import { Login } from './assets/components/pages/Login';
import { Dashboard } from './assets/components/pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fixed import here
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
