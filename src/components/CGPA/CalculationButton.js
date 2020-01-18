import React from 'react';
import { Fab, Box } from '@material-ui/core';

const CalculationButton = ({ handelCalculate }) => {
    return (
        <Fab variant="extended" onClick={handelCalculate}>
            <Box width="4px" />
            Calculate Now
        </Fab>
    );
};

export default CalculationButton;
