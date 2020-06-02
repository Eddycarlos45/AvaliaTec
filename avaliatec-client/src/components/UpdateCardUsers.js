import React from 'react';
import axios from 'axios';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		width: '550px',
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
		fontSize: '20px',
		padding: '13px',
	},
	smallForm: {
		color: 'blue'
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
	},
	title: {
		textAlign: 'left',
		marginLeft: '5px'
	}
});
let updatePerson = {};
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleCard(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [update, setUpdate] = React.useState(false);
	const [values, setValues] = React.useState({
		course: '',
		userName: '',
	});

	const handleClickOpen = (user) => {
		updatePerson = user;
		setOpen(true);
	};

	const handleClickOpenUpdate = (user) => {
		updatePerson = user;
		setUpdate(true);
		setValues({
			...values,
			course: user.course,
			userName: user.userName
		})
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseUpdate = () => {
		setUpdate(false);
	};

	const handleDelete = () => {

		axios.delete('/users', { data: { userId: updatePerson.userId } }).then(res => {
			alert('Avaliador excluído com sucesso')
			window.location.reload()
		})
			.catch(err => {
				console.log(err.response.data)
			})

		handleClose()
	}
	const handleUpdate = () => {
		const updateUser = {
			course: values.course,
			userName: values.userName,
			userId: updatePerson.userId
		}
		axios.put('/users', updateUser)
			.then(res => {
				window.location.reload()
			})
			.catch(err => {
				console.log(err.response.data)
			})
		alert('Atualizado com sucesso')
		handleCloseUpdate()
	}

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const renderUpdate = () => {
		return (
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					<small className={classes.smallForm}>Nome</small>
					<TextField
						id="userName"
						name="userName"
						type="text"
						className={classes.textField}
						value={values.userName}
						onChange={handleChange('userName')}
						fullWidth />
					<small className={classes.smallForm}>Curso</small>
					<TextField
						id="course"
						name="course"
						type="text"
						className={classes.textField}
						value={values.course}
						onChange={handleChange('course')}
						fullWidth />
				</DialogContentText>
			</DialogContent>
		);
	}
	return (
		<div>
			<h3 className={classes.title}>AVALIADORES ADICIONADOS</h3>
			{props.users.map((user) =>
				<Card className={classes.root}>
					<small className={classes.small}>{user.userName}</small>
					<CardActions className={classes.card}>
						<IconButton aria-label="edit" onClick={(e) => handleClickOpenUpdate(user)}>
							<EditIcon />
						</IconButton>
						<IconButton aria-label="delete" onClick={(e) => handleClickOpen(user)}>
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
								{updatePerson.userName}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} className={classes.buttonNo}>Não</Button>
							<Button onClick={(e) => handleDelete(user.userId)} className={classes.buttonYes}>Sim</Button>
						</DialogActions>
					</Dialog>
					<Dialog
						open={update}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleCloseUpdate}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja atualizar?"}</DialogTitle>
						{renderUpdate()}
						<DialogActions>
							<Button onClick={handleCloseUpdate} className={classes.buttonNo}>Voltar</Button>
							<Button onClick={(e) => handleUpdate(user)} className={classes.buttonYes}>Atualizar</Button>
						</DialogActions>
					</Dialog>
				</Card>)}
		</div>
	);
}