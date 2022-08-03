import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import {reducer as formReducer} from 'redux-form';

export default configureStore({
    reducer: {
        todo: todoReducer,
        form: formReducer
    }
})