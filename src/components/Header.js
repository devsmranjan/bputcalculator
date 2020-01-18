import React from 'react';
import {
    Container,
    Paper,
    Tabs,
    Tab,
    Typography,
    Box
} from '@material-ui/core';
import Logo from '../assets/bput_logo.jpeg';
import Developer from '../components/Developer';

const Header = ({ tabValue, handleTabChange }) => {
    return (
        <Container maxWidth="sm">
            <Box height="36px" />
            <Box align="center">
                <img src={Logo} alt="" height="100" />
            </Box>
            <Box height="24px" />
            <Typography
                variant="h4"
                component="h5"
                align="center"
                style={{
                    fontFamily: 'Special Elite'
                }}
            >
                BPUT Calculator (B.Tech)
            </Typography>
            <Box height="14px" />
            <Typography
                variant="subtitle2"
                component="h6"
                align="center"
                style={{
                    fontFamily: 'Special Elite',
                    color: '#A0A0A0'
                }}
            >
                Developed by
                <Developer />
            </Typography>
            <Box height="36px" />
            <Paper square elevation={0}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Sgpa" />
                    <Tab label="Cgpa" />
                    <Tab label="Percentage" />
                </Tabs>
            </Paper>
        </Container>
    );
};

export default Header;
