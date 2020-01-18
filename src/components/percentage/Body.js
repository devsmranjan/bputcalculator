import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Box,
    Button,
    Typography,
    Snackbar,
    Slide,
    IconButton
} from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import CloseIcon from '@material-ui/icons/Close';

const TransitionUp = props => {
    return <Slide {...props} direction="up" />;
};

const Body = () => {
    const [cgpaValue, setCgpaValue] = useState(0);
    const [percentageValue, setPercentageValue] = useState(0);


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarTransition, setSnackbarTransition] = useState(undefined);

    useEffect(() => {
        let cgpa = localStorage.getItem('cgpa');
        setCgpaValue(cgpa != null ? cgpa : 0);
    }, []);

    const handleCGPA = (value)  => {
        setCgpaValue(value === '' ? 0 : value);
    }

    const handleCalculation = () => {
        const percentage = ((cgpaValue - 0.5) * 10).toFixed(2);
        setPercentageValue(percentage);

        setSnackbarTransition(() => TransitionUp);
        setSnackbarOpen(true);
        localStorage.setItem('perecntage', `${percentage}`);
    }



    return (
        <div>
            <Typography variant="h6" align="center">
                {localStorage.getItem('perecntage') !== null
                    ? `Your last Percentage is ${localStorage.getItem(
                          'perecntage'
                      )}%`
                    : 'Hey! You are calculating for the first time.'}
            </Typography>
            <Box height="24px" />
            <Grid container spacing={1} justify="center">
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="What's your CGPA?"
                        variant="outlined"
                        fullWidth={true}
                        type="number"
                        value={cgpaValue}
                        onChange={e => {
                            handleCGPA(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Box height="14px" />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DoneAllIcon />}
                        size="large"
                        disabled={cgpaValue !== 0 ? null : true}
                        onClick={handleCalculation}
                    >
                        Calculate
                    </Button>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
                TransitionComponent={snackbarTransition}
                autoHideDuration={6000}
                message={`You have ${percentageValue}%`}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => {
                            setSnackbarOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    );
};

export default Body;
