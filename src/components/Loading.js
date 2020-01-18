import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

const Loading = () => {
    return (
        <Box align="center">
            <Box height="100px" />
            <CircularProgress />
        </Box>
    );
}

export default Loading;