import React, {useState} from "react";
import {FormControl, Container, TextField, Button} from '@mui/material'
import {useDispatch} from 'react-redux'
import {addTodoList} from "../store/todoSlice";
import * as yup from 'yup';
import {useFormik} from "formik";

const validationSchema = yup.object({
    listTitle: yup
        .string('Write title')
        .email('Write the title for list of task')
        .required('Title is required'),
});

function TodoListForm() {
    const [listName, setListName] = useState("");
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addTodoList(listName))
        setListName("")
    }
    return <Container maxWidth="sm" style={{marginTop: 5}}>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth={true}>
                <TextField label = "My new task list" requiered={true} value={listName} onChange={e => setListName(e.target.value)}/>
               {/* <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />*/}
                <Button variant="contained" color="primary" style = {{marginTop: 5}} type="submit">Add new list</Button>
            </FormControl>
        </form>
    </Container>
}

export default TodoListForm;

