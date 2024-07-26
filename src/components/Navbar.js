import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('profile')) {
            setUserInfo(JSON.parse(localStorage.getItem('profile')).isAdmin);
        }
    })

    const onSignOut = () => {
        localStorage.removeItem('profile');
        history('/');
        window.location.reload();
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Button color="inherit" component={Link} to="/">
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Subscription Management
                        </Typography>
                    </Button>
                </Typography>
                {userInfo !== null ? <Button color="inherit" onClick={onSignOut}>Sign Out</Button> : <></>}
                {/* <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/profile">Profile</Button>
                <Button color="inherit" component={Link} to="/admin/dashboard">Admin Dashboard</Button> */}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
