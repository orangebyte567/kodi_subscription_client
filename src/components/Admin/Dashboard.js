import React, { useEffect, useState } from 'react';
import { getAllUsers, getReports } from '../../services/api';
import { Container, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState({});
    const [flag, setFlag] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if(JSON.parse(localStorage.getItem('profile')).isAdmin) {
                    const { data } = await getAllUsers();
                    setUsers(data);
                    setFlag(true);
                } else if(!JSON.parse(localStorage.getItem('profile')).isAdmin) {
                    history('/profile');
                } else {
                    history('/login');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    });

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const { data } = await getReports();
                setReports(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReports();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            {!flag ? 
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress /> 
                </div>
                :
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Reports</Typography>
                                <Typography variant="body1">Active Subscriptions: {reports.activeSubscriptions}</Typography>
                                <Typography variant="body1">Cancelled Subscriptions: {reports.cancelledSubscriptions}</Typography>
                                <Typography variant="body1">Expired Subscriptions: {reports.expiredSubscriptions}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">All Users</Typography>
                                <List>
                                    {users.map((user) => (
                                        <ListItem key={user._id}>
                                            <ListItemText primary={user.email} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }
        </Container>
    );
};

export default Dashboard;
