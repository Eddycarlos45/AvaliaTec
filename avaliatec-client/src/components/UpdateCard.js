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
		justifyContent: 'space-between',
		boxShadow: '0 5px 20px rgba(0,0,0,.25)',
		transition: 'transform 300ms',
		backgroundColor: '#ffb74d',
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
	let [criterions] = React.useState(['']);
	let [criterion1, setCriterion1] = React.useState('');
	let [criterion2, setCriterion2] = React.useState('');
	let [criterion3, setCriterion3] = React.useState('');
	let [criterion4, setCriterion4] = React.useState('');
	let [criterion5, setCriterion5] = React.useState('');
	let [criterion6, setCriterion6] = React.useState('');
	let [criterion7, setCriterion7] = React.useState('');
	let [criterion8, setCriterion8] = React.useState('');
	let [criterion9, setCriterion9] = React.useState('');
	let [criterion10, setCriterion10] = React.useState('');
	let [weight1, setWeight1] = React.useState('');
	let [weight2, setWeight2] = React.useState('');
	let [weight3, setWeight3] = React.useState('');
	let [weight4, setWeight4] = React.useState('');
	let [weight5, setWeight5] = React.useState('');
	let [weight6, setWeight6] = React.useState('');
	let [weight7, setWeight7] = React.useState('');
	let [weight8, setWeight8] = React.useState('');
	let [weight9, setWeight9] = React.useState('');
	let [weight10, setWeight10] = React.useState('');
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
			setCriterion1(props.criterions[0].type)
			setCriterion2(props.criterions[1].type)
			setCriterion3(props.criterions[2].type)
			setCriterion4(props.criterions[3].type)
			setCriterion5(props.criterions[4].type)
			setCriterion6(props.criterions[5].type)
			setCriterion7(props.criterions[6].type)
			setCriterion8(props.criterions[7].type)
			setCriterion9(props.criterions[8].type)
			setCriterion10(props.criterions[9].type)
			setWeight1(props.criterions[0].weight)
			setWeight2(props.criterions[1].weight)
			setWeight3(props.criterions[2].weight)
			setWeight4(props.criterions[3].weight)
			setWeight5(props.criterions[4].weight)
			setWeight6(props.criterions[5].weight)
			setWeight7(props.criterions[6].weight)
			setWeight8(props.criterions[7].weight)
			setWeight9(props.criterions[8].weight)
			setWeight10(props.criterions[9].weight)
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
		let note = parseInt(weight1) + parseInt(weight2) + parseInt(weight3) + parseInt(weight4) + parseInt(weight5)
			+ parseInt(weight6) + parseInt(weight7) + parseInt(weight8) + parseInt(weight9) + parseInt(weight10)
		if (member === undefined) {
			if (note === 10) {
				criterions.splice(0, 10,
					{
						type: criterion1,
						weight: weight1
					},
					{
						type: criterion2,
						weight: weight2
					},
					{
						type: criterion3,
						weight: weight3
					},
					{
						type: criterion4,
						weight: weight4
					},
					{
						type: criterion5,
						weight: weight5
					},
					{
						type: criterion6,
						weight: weight6
					},
					{
						type: criterion7,
						weight: weight7
					},
					{
						type: criterion8,
						weight: weight8
					},
					{
						type: criterion9,
						weight: weight9
					},
					{
						type: criterion10,
						weight: weight10
					}
				)
				teachers.splice(0, 3, teacher, teacher1, teacher2)
				const updateFile = {
					theme: title,
					course: course,
					criterions: criterions,
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
					alert('Atualizado com sucesso')
			} else {
				alert('A soma dos pesos tem que ser igual a 10')
				window.location.reload()
			}
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
			alert('Atualizado com sucesso')
		}
		handleCloseUpdate()
	}

	const handleChange = (event) => {
		console.log(theme)
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
		} if (event.target.name === "criterion1") {
			setCriterion1(event.target.value)
		} if (event.target.name === "criterion2") {
			setCriterion2(event.target.value)
		} if (event.target.name === "criterion3") {
			setCriterion3(event.target.value)
		} if (event.target.name === "criterion4") {
			setCriterion4(event.target.value)
		} if (event.target.name === "criterion5") {
			setCriterion5(event.target.value)
		} if (event.target.name === "criterion6") {
			setCriterion6(event.target.value)
		} if (event.target.name === "criterion7") {
			setCriterion7(event.target.value)
		} if (event.target.name === "criterion8") {
			setCriterion8(event.target.value)
		} if (event.target.name === "criterion9") {
			setCriterion9(event.target.value)
		} if (event.target.name === "criterion10") {
			setCriterion10(event.target.value)
		} if (event.target.name === "weight1") {
			setWeight1(event.target.value)
		} if (event.target.name === "weight2") {
			setWeight2(event.target.value)
		} if (event.target.name === "weight3") {
			setWeight3(event.target.value)
		} if (event.target.name === "weight4") {
			setWeight4(event.target.value)
		} if (event.target.name === "weight5") {
			setWeight5(event.target.value)
		} if (event.target.name === "weight6") {
			setWeight6(event.target.value)
		} if (event.target.name === "weight7") {
			setWeight7(event.target.value)
		} if (event.target.name === "weight8") {
			setWeight8(event.target.value)
		} if (event.target.name === "weight9") {
			setWeight9(event.target.value)
		} if (event.target.name === "weight10") {
			setWeight10(event.target.value)
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
							id="criterion1"
							name="criterion1"
							type="text"
							className={classes.textField}
							value={criterion1}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight1} </small>
						<small>Novo peso: </small>
						<select name="weight1" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion2"
							name="criterion2"
							type="text"
							className={classes.textField}
							value={criterion2}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight2} </small>
						<small>Novo peso: </small>
						<select name="weight2" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion3"
							name="criterion3"
							type="text"
							className={classes.textField}
							value={criterion3}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight3} </small>
						<small>Novo peso: </small>
						<select name="weight3" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion4"
							name="criterion4"
							type="text"
							className={classes.textField}
							value={criterion4}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight4} </small>
						<small>Novo peso: </small>
						<select name="weight4" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion5"
							name="criterion5"
							type="text"
							className={classes.textField}
							value={criterion5}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight5} </small>
						<small>Novo peso: </small>
						<select name="weight5" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion6"
							name="criterion6"
							type="text"
							className={classes.textField}
							value={criterion6}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight6} </small>
						<small>Novo peso: </small>
						<select name="weight6" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion7"
							name="criterion7"
							type="text"
							className={classes.textField}
							value={criterion7}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight7} </small>
						<small>Novo peso: </small>
						<select name="weight7" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion8"
							name="criterion8"
							type="text"
							className={classes.textField}
							value={criterion8}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight8} </small>
						<small>Novo peso: </small>
						<select name="weight8" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion9"
							name="criterion9"
							type="text"
							className={classes.textField}
							value={criterion9}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight9} </small>
						<small>Novo peso: </small>
						<select name="weight9" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<TextField
							id="criterion10"
							name="criterion10"
							type="text"
							className={classes.textField}
							value={criterion10}
							onChange={handleChange}
							fullWidth />
						<small>Peso atual: {weight10} </small>
						<small>Novo peso: </small>
						<select name="weight10" onChange={handleChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<br></br>
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