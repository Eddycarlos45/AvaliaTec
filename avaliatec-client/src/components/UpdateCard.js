import React from 'react';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

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
    },
    buttonNo: {
        color: 'white',
        backgroundColor: 'red',
        '&:hover': {
            color: 'black',
            backgroundColor: 'red',
        }
    },
    buttonYes: {
        color: 'white',
        backgroundColor: 'green',
        '&:hover': {
            color: 'black',
            backgroundColor: 'green'
        }
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.root}>
            <small className={classes.small}>{props.title}{props.theme}</small>
            <CardActions className={classes.card}>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja excluir?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.title}{props.theme}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.buttonNo}>Não</Button>
                    <Button onClick={handleClose} className={classes.buttonYes}>Sim</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}