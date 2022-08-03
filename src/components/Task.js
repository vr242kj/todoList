import React, {useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    Container,
    IconButton
} from '@mui/material'
import {Check, Delete} from '@mui/icons-material'
import {useSelector, useDispatch} from 'react-redux'
import {deleteTask, changeTaskStatus} from "../store/todoSlice";

function Task({id, title, text, date, time, isComplete}){
    //const taskTitle = useSelector(state => state.todo.taskTitle);
    //const taskText = useSelector(state => state.todo.taskText);
    //const taskDeadLine = useSelector(state => state.todo.taskDeadLine);
    //const task = useSelector(state => state.todo.task);
    const dispatch = useDispatch()

    function changeStatusOfItem() {
        console.log(title)
        dispatch(changeTaskStatus(id));
    };

    function deleteItem() {
        dispatch(deleteTask(id));
    };

    const taskStyle = isComplete ? {textDecoration: "line-through"} : {textDecoration: "none"};

    return <div>
        <Container style={{marginTop: 10}}>
            <Card variant="outlined" style={{marginTop: 35, background: "lightgray"}}>
                <CardContent>
                    <Typography variant="h5" component="h2" style={taskStyle}>
                        <IconButton onClick={changeStatusOfItem}>
                            <Check style={{color: "green"}}/>
                        </IconButton>
                        {title}<br/>
                        Description: {text}<br/>
                        Deadline: {date} {time}
                        <IconButton style={{float: "right"}} onClick={deleteItem}>
                            <Delete style={{color: "red"}}/>
                        </IconButton>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    </div>
}

export default Task;

