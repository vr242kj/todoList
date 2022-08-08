import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import TodoCart from "./TodoCart";
import {getListByID} from "../store/todoSlice";

function AboutListOfTask() {
    const listById = useSelector(state => state.todo.listById);
    let {id} = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListByID(id));
    })

    return <>
        {Object.keys(listById).length ? <TodoCart key={listById.id} name={listById.name} idList={listById.id}
                                                  tasks={listById.task}/> : "No list with tis id"}
    </>
}

export default AboutListOfTask;