import React, {useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    Container,
    IconButton,
    Paper,
    CardActions,
    Collapse
} from '@mui/material'
import {styled} from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskForm from "./TaskForm";
import Task from "./Task";
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function TodoCart({idList, name, tasks}) {
    const [expanded, setExpanded] = useState(false);
    const taskForSearch = useSelector(state => state.todo.taskForSearch);
    const isSearchTaskFound = useSelector(state => state.todo.isSearchTaskFound);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <div>
        <Container style={{marginTop: 10}}>
            <Card variant="outlined" style={{marginTop: 10, marginBottom: 5, background: "lightgray"}}>
                <CardContent>
                    <Typography variant="h5" component="h2" align="center">
                        <Link to={'list/' + idList}>
                            {name}
                        </Link>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <TaskForm idList={idList}/>
                    <CardContent>
                        {isSearchTaskFound ? (taskForSearch.length ? taskForSearch : tasks).map(todo =>
                            <Task key={todo.id} id={todo.id} title={todo.title}
                                  text={todo.text} date={todo.deadlineDate}
                                  time={todo.deadlineTime} isComplete={todo.isComplete}
                            />) : <Typography variant="h5" component="h2" align="center"> Not found </Typography>
                        }
                    </CardContent>
                </Collapse>
            </Card>
        </Container>
    </div>
}

export default TodoCart;