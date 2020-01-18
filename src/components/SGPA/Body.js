import React, { useState, useEffect } from 'react';
import {
    Box,
    Snackbar,
    Slide,
    IconButton,
    Typography
} from '@material-ui/core';
import SelectContainer from './SelectContainer';
import DataTable from './DataTable';
import AddButton from './AddButton';
import CalculationButton from './CalculationButton';
import CloseIcon from '@material-ui/icons/Close';

const TransitionUp = props => {
    return <Slide {...props} direction="up" />;
};

const Body = ({ dataFromAPI }) => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState({
        branchName: '',
        index: ''
    });
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState({
        semesterName: '',
        index: ''
    });

    const [subjects, setSubjects] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarTransition, setSnackbarTransition] = useState(undefined);

    const [totalSGPA, setTotalSGPA] = useState('');

    useEffect(() => {
        const branches = [];
        dataFromAPI.forEach((branchData, b_index) => {
            branches.push({
                branchName: branchData.branchName,
                index: b_index
            });
        });
        setBranches(branches);
    }, [dataFromAPI]);

    const handleBranch = index => {
        setSelectedBranch({
            branchName: branches[index].branchName,
            index: index
        });

        // update selectedSemesters
        const semesters = [];
        dataFromAPI[index].semesters.forEach((semesterData, s_index) => {
            semesters.push({
                semesterName: semesterData.semesterName,
                index: s_index
            });
        });

        setSemesters(semesters);
    };

    const handleSemester = index => {
        setSelectedSemester({
            semesterName: semesters[index].semesterName,
            index: index
        });
    };

    const handleConfirm = () => {
        const initialSubjects = [];
        dataFromAPI[selectedBranch.index].semesters[
            selectedSemester.index
        ].subjects.forEach(subjectData => {
            initialSubjects.push({
                subjectName: subjectData.subjectName,
                credits: subjectData.credits,
                grade: 'O'
            });
        });

        setSubjects(initialSubjects);
    };

    const handleDeleteSubject = index => {
        const subjectList = [...subjects];
        subjectList.splice(index, 1);

        setSubjects(subjectList);
    };

    const handleCreditChange = (index, credit) => {
        const subjectList = [...subjects];

        subjectList[index].credits = isNaN(parseInt(credit))
            ? 0
            : parseInt(credit);

        setSubjects(subjectList);
    };

    const handleGrade = (index, grade) => {
        const subjectList = [...subjects];
        subjectList[index].grade = grade;

        setSubjects(subjectList);
    };

    const handleAddSubject = () => {
        const subjectList = [...subjects];
        subjectList.push({
            subjectName: 'New Subject',
            credits: 0,
            grade: 'O',
            isNew: true
        });

        setSubjects(subjectList);
    };

    const handleNewSubject = (index, name) => {
        const subjectList = [...subjects];

        subjectList[index].subjectName = name;

        setSubjects(subjectList);
    };

    const handelCalculate = () => {
        // console.table(subjects);

        let creditPoints = 0;
        let gradePoint = 0;

        const totalCredits = subjects.reduce((prev, cur) => {
            return prev + cur.credits;
        }, 0);

        console.log(totalCredits);

        subjects.map(subject => {
            let gradeValue = 0;

            switch (subject.grade) {
                case 'O':
                    gradeValue = 10;
                    break;
                case 'E':
                    gradeValue = 9;
                    break;
                case 'A':
                    gradeValue = 8;
                    break;
                case 'B':
                    gradeValue = 7;
                    break;
                case 'C':
                    gradeValue = 6;
                    break;
                case 'D':
                    gradeValue = 5;
                    break;
                case 'F':
                    gradeValue = 2;
                    break;

                default:
                    gradeValue = 0;
                    break;
            }

            return creditPoints += gradeValue * subject.credits;
        });

        gradePoint = (creditPoints / totalCredits).toFixed(2);

        setTotalSGPA(gradePoint);

        console.log({ totalCredits, creditPoints, gradePoint });

        setSnackbarTransition(() => TransitionUp);
        setSnackbarOpen(true);

        localStorage.setItem('sgpa', gradePoint);

        return;
    };

    return (
        <div>
            <Typography variant="h6" align="center">
                {localStorage.getItem('sgpa') !== null
                    ? `Your last SGPA is ${localStorage.getItem(
                          'sgpa'
                      )}`
                    : 'Hey! You are calculating for the first time'}
            </Typography>
            <Box height="24px" />
            <SelectContainer
                branches={branches}
                selectedBranch={selectedBranch}
                semesters={semesters}
                selectedSemester={selectedSemester}
                handleBranch={handleBranch}
                handleSemester={handleSemester}
                handleConfirm={handleConfirm}
            />

            {subjects.length !== 0 ? (
                <div>
                    <DataTable
                        subjects={subjects}
                        handleDeleteSubject={handleDeleteSubject}
                        handleCreditChange={handleCreditChange}
                        handleGrade={handleGrade}
                        handleNewSubject={handleNewSubject}
                    />
                    <Box height="36px" />

                    <AddButton handleAddSubject={handleAddSubject} />

                    <Box align="center">
                        <CalculationButton handelCalculate={handelCalculate} />
                    </Box>
                    <Box height="60px" />
                </div>
            ) : (
                <div></div>
            )}

            <Snackbar
                open={snackbarOpen}
                onClose={() => {
                    setSnackbarOpen(false);
                }}
                TransitionComponent={snackbarTransition}
                autoHideDuration={6000}
                message={`You have ${totalSGPA} SGPA`}
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
