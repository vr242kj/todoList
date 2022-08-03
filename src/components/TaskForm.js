import React, {useState} from "react";
import {
    FormControl,
    Container, TextField,
    Button, Box,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

import {useSelector, useDispatch} from 'react-redux'
import {addTask, searchTask, findAllTaskWithThisStatus} from "../store/todoSlice";

function TaskForm({idList}) {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskText, setTaskText] = useState("");
    const [taskDeadLine, setTaskDeadLine] = useState(new Date());
    const selectedStatus = useSelector(state => state.todo.selectedStatus);
    const valueForSearch = useSelector(state => state.todo.valueForSearch);
    const dispatch = useDispatch()

    function handleSelect(event) {
        dispatch(findAllTaskWithThisStatus(event.target.value));
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addTask({idList: idList, taskTitle: taskTitle, taskText: taskText, taskDeadLine: taskDeadLine}))
        setTaskTitle("");
        setTaskText("");
        setTaskDeadLine(new Date());
    }

    function handleFindTask(event) {
        dispatch(searchTask(event));
    };

    return <Container maxWidth="sm" style={{marginTop: 10}}>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth={true}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Title"
                            multiline
                            value={taskTitle}
                            rows={1.5}
                            onChange={e => setTaskTitle(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Text"
                            multiline
                            value={taskText}
                            rows={1.5}
                            onChange={e => setTaskText(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Deadline"
                                value={taskDeadLine}
                                onChange={e => setTaskDeadLine(e)}
                                minDateTime={new Date()}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </Box>
                <Button variant="contained" color="primary" style={{marginTop: 5}} type="submit">Add Todo</Button>
            </FormControl>
        </form>
        <FormControl sx={{m: 1.5, minWidth: 120}} size="small">
            <InputLabel id="demo-select-small">Select status of task</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={selectedStatus}
                label="Age"
                onChange={handleSelect}
            >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={false}>Active</MenuItem>
                <MenuItem value={true}>Completed</MenuItem>
            </Select>
        </FormControl>
        <TextField fullWidth margin="normal" label="Search todos" value={valueForSearch} onChange={handleFindTask}/>
    </Container>
}

export default TaskForm;

