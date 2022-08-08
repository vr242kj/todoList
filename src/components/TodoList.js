import TodoListForm from "./TodoListForm";
import TodoCart from "./TodoCart";
import {useSelector, useDispatch} from 'react-redux'

function TodoList() {
    const todoLists = useSelector(state => state.todo.todoLists);

    return <>
        <TodoListForm />
        {todoLists.map((todoList) => (
            <TodoCart key={todoList.id} name={todoList.name} idList={todoList.id} tasks={todoList.task}/>
        ))}
    </>
}

export default TodoList;
