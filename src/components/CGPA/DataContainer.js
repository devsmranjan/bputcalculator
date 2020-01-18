import React from 'react';
import { Grid, TextField, Typography, Box, Container } from '@material-ui/core';

const DataContainer = ({ allSemesters, handleSemester }) => {
    return (
        <Container>
            <Typography variant="h6" align="center">
                Put your SGPAs of each semester
            </Typography>
            <Box height="36px" />
            <Grid container spacing={2} justify="center">
                {allSemesters.map((semester, index) => {
                    return (
                        <Grid item xs={6} sm={3} key={index}>
                            <TextField
                                label={semester.semester}
                                variant="outlined"
                                fullWidth={true}
                                value={semester.sgpa}
                                type="number"
                                onChange={e => {
                                    handleSemester(index, e.target.value);
                                }}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default DataContainer;
