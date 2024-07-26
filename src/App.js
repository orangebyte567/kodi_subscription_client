import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ResetPassword from './components/Auth/ResetPassword';
import ManageSubscription from './components/Subscription/ManageSubscription';
import Dashboard from './components/Admin/Dashboard';
import { Container } from '@mui/material';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/profile" element={<ManageSubscription />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
