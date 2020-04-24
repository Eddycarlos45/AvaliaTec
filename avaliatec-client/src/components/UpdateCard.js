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
	let [members] = React.useState(['']);
	let [member0, setMember0] = React.useState('');
	let [member1, setMember1] = React.useState('');
	let [member2, setMember2] = React.useState('');
	let [member3, setMember3] = React.useState('');
	let [questions] = React.useState(['']);
	let [question, setQuestion] = React.useState('');
	let [question1, setQuestion1] = React.useState('');
	let [question2, setQuestion2] = React.useState('');
	let [question3, setQuestion3] = React.useState('');
	let [question4, setQuestion4] = React.useState('');
	let [teachers] = React.useState(['']);
	let [teacher, setTeacher] = React.useState('');
	let [teacher1, setTeacher1] = React.useState('');
	let [teacher2, setTeacher2] = React.useState('');


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickOpenUpdate = () => {
		setUpdate(true);
		setTheme(props.theme)
		setCourse(props.course)
		setTitle(props.title)
		if (props.members !== undefined) {
			setMember0(props.members[0])
			setMember1(props.members[1])
			setMember2(props.members[2])
			setMember3(props.members[3])
		} else {
			setQuestion(props.questions[0])
			setQuestion1(props.questions[1])
			setQuestion2(props.questions[2])
			setQuestion3(props.questions[3])
			setQuestion4(props.questions[4])
			setTeacher(props.teachers[0])
			setTeacher1(props.teachers[1])
			setTeacher2(props.teachers[2])
		}

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
			questions.splice(0, 5, question, question1, question2, question3, question4)
			teachers.splice(0, 3, teacher, teacher1, teacher2)
			const updateFile = {
				theme: title,
				course: course,
				questions: questions,
				teachers: teachers,
				formId: id
			}
			axios.put('/form', updateFile)
				.then(res => {
					console.log(res.data);
					window.location.reload()
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
					window.location.reload()
				})
				.catch(err => {
					console.log(err.response.data)
				})
		}
		handleCloseUpdate()
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
		} if (event.target.name === "question") {
			setQuestion(event.target.value)
		} if (event.target.name === "question1") {
			setQuestion1(event.target.value)
		} if (event.target.name === "question2") {
			setQuestion2(event.target.value)
		} if (event.target.name === "question3") {
			setQuestion3(event.target.value)
		} if (event.target.name === "question4") {
			setQuestion4(event.target.value)
		} if (event.target.name === "teacher") {
			setTeacher(event.target.value)
		} if (event.target.name === "teacher1") {
			setTeacher1(event.target.value)
		} if (event.target.name === "teacher2") {
			setTeacher2(event.target.value)
		} if (event.target.name === "title") {
			setTitle(event.target.value)
		}
	}
	const renderUpdate = () => {
		if (props.members !== undefined) {
			return (
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<small className={classes.smallForm}>Tema</small>
						<TextField
							id="theme"
							name="theme"
							type="text"
							className={classes.textField}
							value={theme}
							onChange={handleChange}
							fullWidth />
						<small className={classes.smallForm}>Curso</small>
						<TextField
							id="course"
							name="course"
							type="text"
							className={classes.textField}
							value={course}
							onChange={handleChange}
							fullWidth />
						<small className={classes.smallForm}>Membros</small>
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
						<small className={classes.smallForm}>Título</small>
						<TextField
							id="title"
							name="title"
							type="text"
							className={classes.textField}
							value={title}
							onChange={handleChange}
							fullWidth />
						<small className={classes.smallForm}>Curso</small>
						<TextField
							id="course"
							name="course"
							type="text"
							className={classes.textField}
							value={course}
							onChange={handleChange}
							fullWidth />
						<small className={classes.smallForm}>Questions</small>
						<TextField
							id="question"
							name="question"
							type="text"
							className={classes.textField}
							value={question}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="question1"
							name="question1"
							type="text"
							className={classes.textField}
							value={question1}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="question2"
							name="question2"
							type="text"
							className={classes.textField}
							value={question2}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="question3"
							name="question3"
							type="text"
							className={classes.textField}
							value={question3}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="question4"
							name="question4"
							type="text"
							className={classes.textField}
							value={question4}
							onChange={handleChange}
							fullWidth />
						<small className={classes.smallForm}>Professores</small>
						<TextField
							id="teacher"
							name="teacher"
							type="text"
							className={classes.textField}
							value={teacher}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="teacher1"
							name="teacher1"
							type="text"
							className={classes.textField}
							value={teacher1}
							onChange={handleChange}
							fullWidth />
						<TextField
							id="teacher2"
							name="teacher2"
							type="text"
							className={classes.textField}
							value={teacher2}
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