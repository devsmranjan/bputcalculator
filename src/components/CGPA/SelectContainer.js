import React from 'react';
import { Box, TextField, Grid, Button } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const SelectContainer = ({
    fromSemester,
    toSemester,
    handleFromSemester,
    handleToSemester,
    handleConfirm
}) => {
    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={6} sm={3}>
                <TextField
                    label="From Semester?"
                    variant="outlined"
                    fullWidth={true}
                    value={fromSemester === 0 ? '' : fromSemester}
                    onChange={e => {
                        handleFromSemester(e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={6} sm={3}>
                <TextField
                    label="To Semester?"
                    variant="outlined"
                    fullWidth={true}
                    value={toSemester === 0 ? '' : toSemester}
                    onChange={e => {
                        handleToSemester(e.target.value);
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
                    disabled={fromSemester !== 0 && toSemester !== 0 ? null : true}
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </Grid>
        </Grid>
    );
};

export default SelectContainer;
