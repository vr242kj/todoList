import './App.css';
import TodoList from "./components/TodoList";
import {
    Routes,
    Route,
    Link,
    Navigate
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useState} from "react";
import NotFound from "./components/NotFound";
import AboutListOfTask from "./components/AboutListOfTask";

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

function App() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>
        <Box sx={{width: '100%'}}>
            <Tabs onChange={LinkTab} value={value}>
                <Tab label="All lists of tasks" component={Link} to="/lists"/>
            </Tabs>;
        </Box>
        <Routes>
            <Route path="/lists" element={<TodoList/>}/>
            <Route path="/" element={<Navigate to="/lists"/>}/>
            <Route path="/*" element={<NotFound/>}/>
            <Route path="lists/list/:id" element={<AboutListOfTask/>}/>
        </Routes>
    </>
}

export default App;
