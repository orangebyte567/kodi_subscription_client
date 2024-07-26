import React, { useEffect, useState } from 'react';
import { getSubscription, createSubscription, cancelSubscription } from '../../services/api';
import { Container, Button, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManageSubscription = () => {
    const [subscription, setSubscription] = useState(null);
    const [flag, setFlag] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                if(!JSON.parse(localStorage.getItem('profile')).isAdmin) {
                    const id = JSON.parse(localStorage.getItem('profile'))._id;
                    const { data } = await getSubscription(id);
                    setSubscription(data);
                    setFlag(true);
                } else if(JSON.parse(localStorage.getItem('profile')).isAdmin) {
                    history('/admin/dashboard');
                } else {
                    history('/login');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSubscription();
    });

    const handleCreateSubscription = async () => {
        try {
            const subscriptionData = {
                type: 'Premium',
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            };
            await createSubscription(subscriptionData);
            setSubscription(subscriptionData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelSubscription = async () => {
        try {
            await cancelSubscription();
            setSubscription(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Manage Subscription</Typography>
            {!flag ? 
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress /> 
                </div>
                : 
                subscription ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6">Type: {subscription.type}</Typography>
                        <Typography variant="body1">End Date: {new Date(subscription.endDate).toLocaleDateString()}</Typography>
                        <Button onClick={handleCancelSubscription} variant="contained" color="secondary" fullWidth>
                            Cancel Subscription
                        </Button>
                    </CardContent>
                </Card>
                ) : (
                    <Button onClick={handleCreateSubscription} variant="contained" color="primary" fullWidth>
                        Create Subscription
                    </Button>
                )}
        </Container>
    );
};

export default ManageSubscription;
