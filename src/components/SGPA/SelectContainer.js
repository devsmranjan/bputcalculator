import React, { useEffect } from 'react';
import { Box, Grid, TextField, MenuItem, Button } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const SelectContainer = ({
    branches,
    selectedBranch,
    semesters,
    selectedSemester,
    handleBranch,
    handleSemester,
    handleConfirm
}) => {
    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    select
                    label="Select Branch"
                    value={selectedBranch.index}
                    onChange={e => handleBranch(e.target.value)}
                    fullWidth={true}
                    variant="outlined"
                >
                    {branches.map((branch, index) => (
                        <MenuItem key={index} value={index}>
                            {branch.branchName}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
                <TextField
                    select
                    label="Select Semester"
                    value={selectedSemester.index}
                    onChange={e => handleSemester(e.target.value)}
                    fullWidth={true}
                    variant="outlined"
                    disabled={semesters.length !== 0 ? null : true}
                >
                    {semesters.map((semester, index) => (
                        <MenuItem key={index} value={index}>
                            {semester.semesterName}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} align="center">
                <Box height="14px" />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DoneAllIcon />}
                    size="large"
                    disabled={
                        selectedSemester.semesterName !== '' ? null : true
                    }
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </Grid>
        </Grid>
    );
};

export default SelectContainer;
