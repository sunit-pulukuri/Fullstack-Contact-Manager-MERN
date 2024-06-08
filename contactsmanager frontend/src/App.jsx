import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Contacts from './components/Contacts';
import { Navbar } from 'react-bootstrap';
const App = () => {
  // Check if authToken is present
  const authToken = localStorage.getItem('authToken');

  return (<>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        {/* Redirect to login if authToken is not present */}
        {<Route path="/" element={<Main />} />}
        {/* Redirect to main page if authToken is present */}
        {/* {authToken && <Navigate to="/main" />} */}
        {/* Define routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
