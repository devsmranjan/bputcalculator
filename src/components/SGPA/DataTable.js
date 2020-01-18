import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    IconButton,
    TextField,
    MenuItem
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const DataTable = ({
    subjects,
    handleDeleteSubject,
    handleCreditChange,
    handleGrade,
    handleNewSubject
}) => {
    const [isCreditsEditable, setIsCreditsEditable] = useState(false);

    const handelEditCredits = () => {
        setIsCreditsEditable(true);
    };
    return (
        <div>
            <Box height="48px" />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">DELETE</TableCell>
                            <TableCell>SUBJECTS</TableCell>
                            <TableCell align="center">
                                CREDITS
                                <IconButton
                                    aria-label="lock"
                                    onClick={handelEditCredits}
                                >
                                    {!isCreditsEditable ? (
                                        <LockIcon fontSize="small" />
                                    ) : (
                                        <LockOpenIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">GRADES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map((subject, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="delete"
                                        onClick={e =>
                                            handleDeleteSubject(index)
                                        }
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    {!subject.isNew ? (
                                        subject.subjectName
                                    ) : (
                                        <TextField
                                            fullWidth={true}
                                            variant="outlined"
                                            value={subject.subjectName}
                                            onChange={e => {
                                                handleNewSubject(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="center">
                                        <Box width="50px">
                                            <TextField
                                                value={subject.credits}
                                                className={
                                                    !isCreditsEditable &&
                                                    !subject.isNew
                                                        ? 'credit-field input-style-before'
                                                        : 'credit-field'
                                                }
                                                disabled={
                                                    !isCreditsEditable &&
                                                    !subject.isNew
                                                        ? true
                                                        : false
                                                }
                                                onChange={e =>
                                                    handleCreditChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        select
                                        value={subject.grade}
                                        onChange={e =>
                                            handleGrade(index, e.target.value)
                                        }
                                        variant="outlined"
                                    >
                                        <MenuItem value="O">O</MenuItem>
                                        <MenuItem value="E">E</MenuItem>
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="C">C</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                    </TextField>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataTable;
