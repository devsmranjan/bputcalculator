import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
    Fab
} from '@material-ui/core';

const AddButton = ({ handleAddSubject }) => {
    return (
        <Fab
            color="primary"
            aria-label="add"
            style={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed'
            }}
            onClick={handleAddSubject}
        >
            <AddIcon />
        </Fab>
    );
};

export default AddButton;