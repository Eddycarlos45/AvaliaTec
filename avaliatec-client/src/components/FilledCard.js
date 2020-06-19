import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BarChartIcon from '@material-ui/icons/BarChart';

const useStyles = makeStyles({
    root: {
        width: '387px',
        marginLeft: '5px',
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '0 5px 20px rgba(0,0,0,.25)',
        transition: 'transform 300ms',
        backgroundColor: '#81c784',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    small: {
        fontSize: '15px',
        padding: '18px',

    },
    button: {
        fontSize: '17px',
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
            color: 'black',
            backgroundColor: '#4caf50'
        }
    },
    avatar: {
        margin: '7px 0 5px 5px',
        backgroundColor: '#2196f3'
    }
});

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <small className={classes.small}>{props.theme}</small>
            <CardActions>
                <IconButton aria-label="report">
                    <BarChartIcon />
                </IconButton>
                <IconButton aria-label="delete" >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}