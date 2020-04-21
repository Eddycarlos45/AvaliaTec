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
	const [update, setUpdate] = React.useState(false);
	let [theme, setTheme] = React.useState('');
	let [title, setTitle] = React.useState('');
	let [course, setCourse] = React.useState('');
	let [members, setMembers] = React.useState(['']);
	let [member0, setMember0] = React.useState('');
	let [member1, setMember1] = React.useState('');
	let [member2, setMember2] = React.useState('');
	let [member3, setMember3] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickOpenUpdate = () => {
		setUpdate(true);
		setTheme(props.theme)
		setCourse(props.course)
		setMembers(props.members)
		setMember0(members[0])
		setMember1(members[1])
		setMember2(members[2])
		setMember3(members[3])
		setTitle(props.title)
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseUpdate = () => {
		setUpdate(false);
	};

	const handleDelete = (id, member) => {
		if (member === undefined) {
			axios.delete('/form', { data: { formId: id } }).then(res => {
				alert('Formulário excluído com sucesso')
				window.location.reload()
			})
				.catch(err => {
					console.log(err.response.data)
				})
		} else {
			axios.delete('/theme', { data: { groupId: id } }).then(res => {
				alert('Tema excluído com sucesso')
				window.location.reload()
			})
				.catch(err => {
					console.log(err.response.data)
				})
		}
		handleClose()
	}
	const handleUpdate = (id, member) => {
		if (member === undefined) {
			const updateFile = {
				theme: this.state.theme,
				course: this.state.course,
				members: this.state.members,
			}
			axios.put('/form', updateFile)
				.then(res => {
					console.log(res.data);
				})
				.catch(err => {
					console.log(err.response.data)
				})
		} else {
			members.splice(0, 4, member0, member1, member2, member3)
			const updateTheme = {
				theme: theme,
				course: course,
				members: members,
				groupId: id
			}
			console.log(updateTheme)
			axios.put('/theme', updateTheme)
				.then(res => {
					console.log(res.data);
				})
				.catch(err => {
					console.log(err.response.data)
				})
		}
		handleClose()
		alert('Atualizado com sucesso')
	}

	const handleChange = (event) => {
		if (event.target.name === "theme") {
			setTheme(event.target.value)
		} if (event.target.name === "course") {
			setCourse(event.target.value)
		} if (event.target.name === "member") {
			setMember0(event.target.value)
		} if (event.target.name === "member1") {
			setMember1(event.target.value)
		} if (event.target.name === "member2") {
			setMember2(event.target.value)
		} if (event.target.name === "member3") {
			setMember3(event.target.value)
		}
	}
	const renderUpdate = () => {
		if (props.members !== undefined) {
			return (
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<TextField
							id="theme"
							name="theme"
							type="text"
							className={classes.textField}
							value={theme}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="course"
							name="course"
							type="text"
							className={classes.textField}
							value={course}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="member"
							name="member"
							type="text"
							className={classes.textField}
							value={member0}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="member1"
							name="member1"
							type="text"
							className={classes.textField}
							value={member1}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="member2"
							name="member2"
							type="text"
							className={classes.textField}
							value={member2}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="member3"
							name="member3"
							type="text"
							className={classes.textField}
							value={member3}
							onChange={handleChange}
							fullWidth />
					</DialogContentText>
				</DialogContent>
			);
		} else {
			return (
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<TextField
							id="theme"
							name="theme"
							type="text"
							className={classes.textField}
							value={title}
							onChange={handleChange}
							fullWidth />
					</DialogContentText>
				</DialogContent>
			);
		}
	}
	return (
		<Card className={classes.root}>
			<small className={classes.small}>{props.title}{props.theme}</small>
			<CardActions className={classes.card}>
				<IconButton aria-label="edit" onClick={handleClickOpenUpdate}>
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
					<Button onClick={(e) => handleDelete(props.id, props.members)} className={classes.buttonYes}>Sim</Button>
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
					<Button onClick={(e) => handleUpdate(props.id, props.members)} className={classes.buttonYes}>Atualizar</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}