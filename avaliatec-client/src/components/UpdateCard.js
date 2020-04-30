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
	let [values, setValues] = React.useState({
		title: '',
		theme: '',
		course: '',
		members: [],
		member: '',
		member1: '',
		member2: '',
		member3: '',
		criteria: [],
		criteria1: '',
		criteria2: '',
		criteria3: '',
		criteria4: '',
		criteria5: '',
		criteria6: '',
		criteria7: '',
		criteria8: '',
		criteria9: '',
		criteria10: '',
		weight1: '',
		weight2: '',
		weight3: '',
		weight4: '',
		weight5: '',
		weight6: '',
		weight7: '',
		weight8: '',
		weight9: '',
		weight10: '',
		teachers: [],
		teacher: '',
		teache1: '',
		teacher2: ''
	});
	/*let [title, setTitle] = React.useState('');
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
	let [teacher2, setTeacher2] = React.useState('');*/


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickOpenUpdate = () => {
		setUpdate(true);
		setValues({ ...values, theme: props.theme })
		setValues({ ...values, course: props.course })
		setValues({ ...values, title: props.title })
		if (props.members !== undefined) {
			setValues({ ...values, member: props.members[0] })
			setValues({ ...values, member1: props.members[1] })
			setValues({ ...values, member2: props.members[2] })
			setValues({ ...values, member3: props.members[3] })
		} else {
			setValues({ ...values, criteria1: props.criteria[0].type })
			setValues({ ...values, criteria2: props.criteria[1].type })
			setValues({ ...values, criteria3: props.criteria[2].type })
			setValues({ ...values, criteria4: props.criteria[3].type })
			setValues({ ...values, criteria5: props.criteria[4].type })
			setValues({ ...values, criteria6: props.criteria[5].type })
			setValues({ ...values, criteria7: props.criteria[6].type })
			setValues({ ...values, criteria8: props.criteria[7].type })
			setValues({ ...values, criteria9: props.criteria[8].type })
			setValues({ ...values, criteria10: props.criteria[9].type })
			setValues({ ...values, weight1: props.criteria[0].weight })
			setValues({ ...values, weight2: props.criteria[1].weight })
			setValues({ ...values, weight3: props.criteria[2].weight })
			setValues({ ...values, weight4: props.criteria[3].weight })
			setValues({ ...values, weight5: props.criteria[4].weight })
			setValues({ ...values, weight6: props.criteria[5].weight })
			setValues({ ...values, weight7: props.criteria[6].weight })
			setValues({ ...values, weight8: props.criteria[7].weight })
			setValues({ ...values, weight9: props.criteria[8].weight })
			setValues({ ...values, weight10: props.criteria[9].weight })
			setValues({ ...values, teacher: props.teachers[0] })
			setValues({ ...values, teacher1: props.teachers[1] })
			setValues({ ...values, teacher2: props.teachers[2] })
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
			values.criterions.splice(0, 10,
				{
					type: values.criteria1,
					weight: values.weight1
				},
				{
					type: values.criteria2,
					weight: values.weight2
				},
				{
					type: values.criteria3,
					weight: values.weight3
				},
				{
					type: values.criteria4,
					weight: values.weight4
				},
				{
					type: values.criteria5,
					weight: values.weight5
				},
				{
					type: values.criteria6,
					weight: values.weight6
				},
				{
					type: values.criteria7,
					weight: values.weight7
				},
				{
					type: values.criteria8,
					weight: values.weight8
				},
				{
					type: values.criteria9,
					weight: values.weight9
				},
				{
					type: values.criteria10,
					weight: values.weight10
				}
			)
			values.teachers.splice(0, 3, values.teacher, values.teacher1, values.teacher2)
			const updateFile = {
				theme: values.title,
				course: values.course,
				criterions: values.criterions,
				teachers: values.teachers,
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
			values.members.splice(0, 4, values.member, values.member1, values.member2, values.member3)
			const updateTheme = {
				theme: values.theme,
				course: values.course,
				members: values.members,
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

	const handleChange = (prop) => (event) => {
		setValues({...values,[prop]: event.target.value})
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
							value={values.theme}
							onChange={handleChange('theme')}
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
						<small className={classes.smallForm}>Membros</small>
						<TextField
							id="member"
							name="member"
							type="text"
							className={classes.textField}
							value={values.member}
							onChange={handleChange('member')}
							fullWidth />
						<TextField
							id="member1"
							name="member1"
							type="text"
							className={classes.textField}
							value={values.member1}
							onChange={handleChange('members1')}
							fullWidth />
						<TextField
							id="member2"
							name="member2"
							type="text"
							className={classes.textField}
							value={values.member2}
							onChange={handleChange('members2')}
							fullWidth />
						<TextField
							id="member3"
							name="member3"
							type="text"
							className={classes.textField}
							value={values.member3}
							onChange={handleChange('members3')}
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
							value={values.title}
							onChange={handleChange('title')}
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
						<small className={classes.smallForm}>Questions</small>
						<TextField
							id="criteria1"
							name="criteria1"
							type="text"
							className={classes.textField}
							value={values.criteria1}
							onChange={handleChange('criteria1')}
							fullWidth />
						<small>Peso atual: {values.weight1} </small>
						<small>Novo peso: </small>
						<select name="weight1" onChange={handleChange('weight1')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria2"
							name="criteria2"
							type="text"
							className={classes.textField}
							value={values.criteria2}
							onChange={handleChange('criteria2')}
							fullWidth />
						<small>Peso atual: {values.weight2} </small>
						<small>Novo peso: </small>
						<select name="weight2" onChange={handleChange('weight2')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria3"
							name="criteria3"
							type="text"
							className={classes.textField}
							value={values.criteria3}
							onChange={handleChange('criteria3')}
							fullWidth />
						<small>Peso atual: {values.weight3} </small>
						<small>Novo peso: </small>
						<select name="weight3" onChange={handleChange('weight3')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria4"
							name="criteria4"
							type="text"
							className={classes.textField}
							value={values.criteria4}
							onChange={handleChange('criteria4')}
							fullWidth />
						<small>Peso atual: {values.weight4} </small>
						<small>Novo peso: </small>
						<select name="weight4" onChange={handleChange('weight4')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria5"
							name="criteria5"
							type="text"
							className={classes.textField}
							value={values.criteria5}
							onChange={handleChange('criteria5')}
							fullWidth />
						<small>Peso atual: {values.weight5} </small>
						<small>Novo peso: </small>
						<select name="weight5" onChange={handleChange('weight5')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria6"
							name="criteria6"
							type="text"
							className={classes.textField}
							value={values.criteria6}
							onChange={handleChange('criteria6')}
							fullWidth />
						<small>Peso atual: {values.weight6} </small>
						<small>Novo peso: </small>
						<select name="weight6" onChange={handleChange('weight6')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria7"
							name="criteria7"
							type="text"
							className={classes.textField}
							value={values.criteria7}
							onChange={handleChange('criteria7')}
							fullWidth />
						<small>Peso atual: {values.weight7} </small>
						<small>Novo peso: </small>
						<select name="weight7" onChange={handleChange('weight7')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria8"
							name="criteria8"
							type="text"
							className={classes.textField}
							value={values.criteria8}
							onChange={handleChange('criteria8')}
							fullWidth />
						<small>Peso atual: {values.weight8} </small>
						<small>Novo peso: </small>
						<select name="weight8" onChange={handleChange('weight8')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria9"
							name="criteria9"
							type="text"
							className={classes.textField}
							value={values.criteria9}
							onChange={handleChange('criteria9')}
							fullWidth />
						<small>Peso atual: {values.weight9} </small>
						<small>Novo peso: </small>
						<select name="weight9" onChange={handleChange('weight9')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<TextField
							id="criteria10"
							name="criteria10"
							type="text"
							className={classes.textField}
							value={values.criteria10}
							onChange={handleChange('criteria10')}
							fullWidth />
						<small>Peso atual: {values.weight10} </small>
						<small>Novo peso: </small>
						<select name="weight10" onChange={handleChange('weight10')}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
						<br></br>
						<small className={classes.smallForm}>Professores</small>
						<TextField
							id="teacher"
							name="teacher"
							type="text"
							className={classes.textField}
							value={values.teacher}
							onChange={handleChange('teacher')}
							fullWidth />
						<TextField
							id="teacher1"
							name="teacher1"
							type="text"
							className={classes.textField}
							value={values.teacher1}
							onChange={handleChange('teacher1')}
							fullWidth />
						<TextField
							id="teacher2"
							name="teacher2"
							type="text"
							className={classes.textField}
							value={values.teacher2}
							onChange={handleChange('teacher2')}
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