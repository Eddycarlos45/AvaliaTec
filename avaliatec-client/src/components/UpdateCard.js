import React from 'react';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '387px',
        marginLeft: '5px',
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    small: {
        fontSize: '20px',
        padding: '13px',

    },
    button: {
        fontSize: '17px',
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
            color: 'black',
            backgroundColor: '#4caf50'
        }
    }
});

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <small className={classes.small}>{props.title}{props.theme}</small>
            <CardActions className={classes.card}>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}