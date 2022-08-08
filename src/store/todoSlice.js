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
        listById: {},
        templeForTask: [],
        tasksForDisplay: null
    },
    reducers: {
        setTodoLists: (state, data) => {
            state.todoLists = data.payload;
        },
        addTodoList: (state, data) => {
            let newToDo = {
                id: uuid(),
                name: data.payload,
                task: []
            }
            state.todoLists = [...state.todoLists, newToDo];
        },
        addTask: (state, data) => {
            //state.isSearchTaskFound = true;
            state.taskForSearch = []
            state.valueForSearch = ""
            state.selectedStatus = "all"
            let newTask = {
                id: uuid(),
                title: data.payload.taskTitle,
                text: data.payload.taskText,
                deadlineDate: data.payload.taskDeadLine.toLocaleDateString(),
                deadlineTime: data.payload.taskDeadLine.toLocaleTimeString(),
                isComplete: false
            }
            state.todoLists = state.todoLists.map(list => {
                if (list.id === data.payload.idList) {
                    list.task.push(newTask)
                }
                return list;
            })
            console.log(state.todoLists);
        },
        deleteTask: (state, id) => {
            state.taskForSearch = [];
            state.todoLists = state.todoLists.map((item, index) => {
                item.task.map((sItem, sIndex) => {
                    if (sItem.id === id.payload) {
                        item.task.splice(sIndex, 1)
                    }
                    return sItem;
                })
                return item;
            })
            state.valueForSearch = "";
            state.selectedStatus = "all";
        },
        changeTaskStatus: (state, id) => {
            state.taskForSearch = [];
            state.todoLists = state.todoLists.map((item, index) => {
                item.task.map((sItem, sIndex) => {
                    if (sItem.id === id.payload) {
                        sItem.isComplete = !sItem.isComplete
                    }
                    return sItem;
                })
                return item;
            })
        },
        searchTask: (state, event) => {
            state.valueForSearch = event.payload.target.value
            let search = event.payload.currentTarget.value.toLowerCase();
            let foundProduct = [];
            state.todoLists.forEach((item, index) => {
                item.task.forEach((sItem, sIndex) => {
                    if (sItem.title.toLowerCase().includes(search) || sItem.text.toLowerCase().includes(search))
                        foundProduct.push(sItem)
                })
            })
            state.taskForSearch = foundProduct;

            if (!foundProduct.length) {
                state.isSearchTaskFound = false;
                return;
            }
            state.isSearchTaskFound = true;
        },
        findAllTaskWithThisStatus: (state, status) => {
            //state.isSearchTaskFound = true;
            state.taskForSearch = []
            state.selectedStatus = status.payload;
            if (status.payload === "all") {
                state.isSearchTaskFound = true;
                state.taskForSearch = [];
                state.valueForSearch = ""
                return;
            }
            let foundProduct = [];
            state.todoLists.forEach((item, index) => {
                item.task.forEach((sItem, sIndex) => {
                    if (sItem.isComplete === status.payload)
                        foundProduct.push(sItem)
                })
            })
            state.taskForSearch = foundProduct;

            if (!foundProduct.length) {
                state.isSearchTaskFound = false;
                return;
            }
        },
        getListByID: (state, id) => {
            state.listById = state.todoLists.filter(list => list.id === id.payload)[0];
        }
    }
})

export const {
    setTodoLists, addTodoList, addTask, deleteTask, changeTaskStatus,
    searchTask, findAllTaskWithThisStatus, getListByID
} = todoSlice.actions

export default todoSlice.reducer