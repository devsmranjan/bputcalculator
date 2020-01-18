import React, { useState } from 'react';
import SelectContainer from './SelectContainer';
import {
    Typography,
    Box,
    Divider,
    Snackbar,
    Slide,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DataContainer from './DataContainer';
import CalculationButton from './CalculationButton';

const TransitionUp = props => {
    return <Slide {...props} direction="up" />;
};

const Body = () => {
    const [fromSemester, setFromSemester] = useState(0);
    const [toSemester, setToSemester] = useState(0);
    const [allSemesters, setAllSemesters] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarTransition, setSnackbarTransition] = useState(undefined);

    const [totalCGPA, setTotalCGPA] = useState('');

    const handleFromSemester = value => {
        setFromSemester(isNaN(parseInt(value)) ? 0 : parseInt(value));
    };

    const handleToSemester = value => {
        setToSemester(isNaN(parseInt(value)) ? 0 : parseInt(value));
    };

    const handleConfirm = () => {
        const semestersList = [];
        let suffixText = '';
        for (let i = fromSemester; i <= toSemester; i++) {
            switch (i) {
                case 1:
                    suffixText = 'st Semester';
                    break;
                case 2:
                    suffixText = 'nd Semester';
                    break;
                case 3:
                    suffixText = 'rd Semester';
                    break;

                default:
                    suffixText = 'th Semester';
                    break;
            }

            semestersList.push({
                semester: `${i}${suffixText}`,
                sgpa: 0
            });
        }

        setAllSemesters(semestersList);
    };

    const handleSemester = (index, value) => {
        const semestersList = [...allSemesters];

        semestersList[index].sgpa = value !== '' ?  parseFloat(value) : 0;

        setAllSemesters(semestersList);
    };

    const handelCalculate = () => {
        const semestersList = [...allSemesters];

        const totalSGPA = semestersList.reduce((prev, curr) => {
            return prev + curr.sgpa;
        }, 0);

        const CGPA = (totalSGPA / semestersList.length).toFixed(2);

        setTotalCGPA(CGPA);

        setSnackbarTransition(() => TransitionUp);
        setSnackbarOpen(true);

        localStorage.setItem('cgpa', CGPA);
    };

    return (
        <div>
            <Typography variant="h6" align="center">
                {localStorage.getItem('cgpa') !== null
                    ? `Your last CGPA is ${localStorage.getItem(
                          'cgpa'
                      )}`
                    : 'Hey! You are calculating for the first time.'}
            </Typography>
            <Box height="24px" />
            <SelectContainer
                fromSemester={fromSemester}
                toSemester={toSemester}
                handleFromSemester={handleFromSemester}
                handleToSemester={handleToSemester}
                handleConfirm={handleConfirm}
            />
            <Box height="24px" />
            {allSemesters.length !== 0 ? <div>
                <Divider />
                <Box height="24px" />
                <DataContainer
                    allSemesters={allSemesters}
                    handleSemester={handleSemester}
                />
                <Box height="36px" />

                <Box align="center">
                    <CalculationButton handelCalculate={handelCalculate} />
                </Box>
                <Box height="60px" />
            </div> : <div></div>}

            <Snackbar
                open={snackbarOpen}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
                TransitionComponent={snackbarTransition}
                autoHideDuration={6000}
                message={`You have ${totalCGPA} CGPA`}
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
