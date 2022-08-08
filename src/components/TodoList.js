import TodoListForm from "./TodoListForm";
import TodoCart from "./TodoCart";
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from "react";
import {setTodoLists} from "../store/todoSlice";

function TodoList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const todoLists = useSelector(state => state.todo.todoLists);
    const dispatch = useDispatch()

    useEffect(() => {
        fetch("https://62f0cd85e2bca93cd23d3c68.mockapi.io/list")
            .then(res => res.json())
            .then(
                (data) => {
                    dispatch(setTodoLists(data))
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return <>
        <TodoListForm />
        {todoLists.map((todoList) => (
            <TodoCart key={todoList.id} name={todoList.name} idList={todoList.id} tasks={todoList.task}/>
        ))}
    </>
}

export default TodoList;
