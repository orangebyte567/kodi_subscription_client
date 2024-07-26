import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
// import { resetPassword } from '../../services/api';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email);
            // const { data } = await resetPassword(email);
        } catch (error) {
            alert("Wrong email or password!");
            console.error(error);
        }
    };

    const onLogin = (e) => {
        e.preventDefault();
        history('/login');
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Reset Password</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Reset password
                </Button>
                <br/>
                <div style = {{display: 'flex', justifyContent: 'center'}}>
                    <Link color="inherit" onClick = {onLogin} href="">Back to login</Link>
                </div>
            </form>
        </Container>
    );
};

export default ResetPassword;
