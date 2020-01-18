import React from 'react';
import { Box } from '@material-ui/core';

const TabPanel = ({ children, value, index }) => {
    return (
        <Box component="div" role="tabpanel" hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </Box>
    );
};

export default TabPanel;
