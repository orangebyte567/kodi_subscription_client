import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ManageSubscription from './Subscription/ManageSubscription';
import Dashboard from './Admin/Dashboard';

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('profile')) {
            setUserInfo(JSON.parse(localStorage.getItem('profile')).isAdmin);
        }
    }, [userInfo])

    return (
        userInfo === null ?
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Welcome to Subscription Management System</Typography>
            <Button variant="contained" color="primary" component={Link} to="/register" fullWidth>
                Register
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/login" fullWidth>
                Login
            </Button>
        </Container>
        : userInfo === true ?
        <Dashboard /> : <ManageSubscription />
    );
};

export default Home;
