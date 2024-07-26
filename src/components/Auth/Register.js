import React, { useState } from 'react';
import { register } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Link } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await register(formData);
            localStorage.setItem('profile', JSON.stringify(data));
            if(JSON.parse(localStorage.getItem('profile')).isAdmin) {
                history('/admin/dashboard');
            } else {
                history('/profile');
            }
        } catch (error) {
            // console.error(error);
            alert("Register again!");
        }
    };

    const onLogin = (e) => {
        e.preventDefault();
        history('/login');
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Register</Typography>
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
                    Register
                </Button>
                <br/>
                <div style = {{display: 'flex', justifyContent: 'center'}}>
                    <Link color="inherit" onClick = {onLogin} href="">Do you have already account?</Link>
                </div>
            </form>
        </Container>
    );
};

export default Register;
