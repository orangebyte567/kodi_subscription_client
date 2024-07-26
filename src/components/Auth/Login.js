import React, { useState } from 'react';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Link } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem('profile', JSON.stringify(data));
            if(JSON.parse(localStorage.getItem('profile')).isAdmin) {
                history('/admin/dashboard');
            } else {
                history('/profile');
            }
        } catch (error) {
            alert("Wrong email or password!");
            console.error(error);
        }
    };

    const onRegister = (e) => {
        e.preventDefault();
        history('/register');
    }

    const onResetPwd = async (e) => {
        e.preventDefault();
        history('/reset-password');
        console.log("Forget password");
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
                <br/>
                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <Link color="inherit" onClick = {onRegister} href="">Register</Link>
                    <Link color="inherit" onClick = {onResetPwd} href="">Forgot password?</Link>
                </div>
            </form>
        </Container>
    );
};

export default Login;
