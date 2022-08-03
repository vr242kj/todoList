import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuid} from "uuid";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoLists: [],
        task: [],
        taskForSearch: [],
        isSearchTaskFound: true,
        valueForSearch: "",
        selectedStatus: "all",
        listById: {}
    },
    reducers: {
        setTodoLists: (state, data) => {
            state.todoLists = data.payload;
        },
        addTodoList: (state, data) => {
            let newToDo = {
                id: uuid(),
                name: data.payload,
                isComplete: false,
                task:[]
            }
            state.todoLists = [...state.todoLists, newToDo];
        },
        addTask: (state, data) => {
            let newToDo = {
                id: uuid(),
                title: data.payload.taskTitle,
                text: data.payload.taskText,
                deadlineDate: data.payload.taskDeadLine.toLocaleDateString(),
                deadlineTime: data.payload.taskDeadLine.toLocaleTimeString(),
                isComplete: false
            }
            state.task = [...state.task, newToDo];
        },
        deleteTask: (state, id) => {
            state.taskForSearch = [];
            state.task = state.task.filter(todo => {
                return todo.id !== id.payload;
            })
            state.valueForSearch = "";
            state.selectedStatus = "all";
        },
        changeTaskStatus: (state, id) => {
            state.taskForSearch = [];
            state.task = state.task.map(todo => {
                if (todo.id === id.payload) {
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            })
        },
        searchTask: (state, e) => {
            console.log(e.payload)
            state.valueForSearch = e.payload.target.value
            let search = e.payload.currentTarget.value.toLowerCase();
            let foundProduct = state.task.filter(todo => todo.title.toLowerCase().includes(search) || todo.text.toLowerCase().includes(search));
            state.taskForSearch = foundProduct;
            if (!foundProduct.length) {
                state.isSearchTaskFound = false;
                return;
            }
            state.isSearchTaskFound = true;
        },
        findAllTaskWithThisStatus: (state, status) => {
            state.selectedStatus = status.payload;
            state.isSearchTaskFound = true;
            if (status.payload === "all") {
                state.taskForSearch = [];
                return;
            }
            let foundProduct = state.task.filter(todo => {
                return todo.isComplete === status.payload;
            })
            state.taskForSearch = foundProduct;
            if (!foundProduct.length) {
                state.isSearchTaskFound = false;
                return;
            }
        },
        getListByID: (state, id) => {
            state.listById = state.todoLists.filter(list => list.id == id.payload)[0];
        }
    }
})

export const {
    setTodoLists, addTodoList, addTask, deleteTask, changeTaskStatus,
    searchTask, findAllTaskWithThisStatus, getListByID
} = todoSlice.actions

export default todoSlice.reducer