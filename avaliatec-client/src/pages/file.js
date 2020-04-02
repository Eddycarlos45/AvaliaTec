import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';

import MyTextField from '../components/MyTextField'

const styles = {
	form: {
		textAlign: 'center'
	},
	pageTitle: {
		margin: '0 auto 10px auto'
	},
	textField: {
		margin: '10px auto 20px auto'
	},
	button: {
		marginTop: 20,
		position: 'relative'
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progress: {
		position: 'absolute'
	},
	select: {
		width: '300px',
		height: '30px',
		marginTop: '10px'
	},
	slider: {
		marginTop: '20px'
	}
};

let sliderValue = 0
class file extends Component {
	constructor() {
		super();
		this.state = {
			course: '',
			questions: [''],
			teachers: [''],
			listTeachers: [''],
			teacher1: '',
			teacher2: '',
			teacher3: '',
			theme: '',
			errors: {},
			age: '',
			setAge: '',
			open: false,
			setOpen: false,
			question: true,
			value: null,
			themes: ['']
		}
	}
	componentDidMount() {
		axios.get('/theme')
			.then(res => {
				this.setState({
					themes: res.data
				})
			})
			.catch(err => console.log(err))
			.then(axios.get('/users')
				.then(res => {
					this.setState({
						listTeachers: res.data
					})
				}))
			.catch(err => console.log(err));
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		if (this.state.teacher1 === '') {
			this.state.teachers[0] = '';
		} else {
			this.state.teachers.unshift(
				this.state.teacher1,
				this.state.teacher2,
				this.state.teacher3)
			if (this.state.members[3] === '') {
				this.state.members.pop();
			}
		}
		const newFile = {
			course: this.state.course,
			questions: this.state.questions,
			teachers: this.state.teachers,
			theme: this.state.theme
		}
		axios.post('/form', newFile)
			.then(res => {
				console.log(res.data);
				this.setState({
					loading: false
				});
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({
					errors: err.response.data,
					loading: false
				})
			})
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	newQuestion = (sliderValue) => {
		if (sliderValue === 1) {
			return (<MyTextField />)
		} if (sliderValue === 2) {
			return (
				<div>
					<MyTextField />
					<MyTextField />
				</div>
			)
		} if (sliderValue === 3) {
			return (
				<div>
					<MyTextField />
					<MyTextField />
					<MyTextField />
				</div>
			)
		} if (sliderValue === 4) {
			return (
				<div>
					<MyTextField />
					<MyTextField />
					<MyTextField />
					<MyTextField />
				</div>
			)
		} if (sliderValue === 5) {
			return (
				<div>
					<MyTextField />
					<MyTextField />
					<MyTextField />
					<MyTextField />
					<MyTextField />
				</div>
			)
		}
	}

	valuetext = (value) => {
		sliderValue = value
		return value;
	}

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		let listThemes = this.state.themes;
		let listTeachers = this.state.listTeachers;

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant="h2" className={classes.pageTitle}>
						Formulário
					</Typography>
					<small className={classes.small}>SELECIONE O TEMA</small>
					<select
						className={classes.select}
						onChange={e => this.setState({ theme: e.target.value })}>
						<option value='selecione'>Novo Tema</option>
						{listThemes.map((item) => <option value={item.theme}>{item.theme}</option>)}
					</select>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="course"
							name="course"
							type="text"
							label="Nome do Curso"
							className={classes.textField}
							helperText={errors.course}
							error={errors.course ? true : false}
							value={this.state.course}
							onChange={this.handleChange}
							fullWidth />
						{/* 						<TextField
							id="questions"
							name="questions"
							type="text"
							label="Questões"
							className={classes.textField}
							helperText={errors.questions}
							error={errors.questions ? true : false}
							value={this.state.questions}
							onChange={this.handleChange}
							fullWidth /> */}
						<small>
							SELECIONE A QUANTIDADE DE QUESTÕES
      					</small>
						<Slider
							className={classes.slider}
							defaultValue={1}
							getAriaValueText={this.valuetext}
							aria-labelledby="discrete-slider"
							valueLabelDisplay="auto"
							onChange={(e) => this.setState({ question: true })}
							step={1}
							marks
							min={1}
							max={5}
						/>
						{this.state.question ? this.newQuestion(sliderValue) : null}
						<h2>Avaliadores</h2>
						<select
							className={classes.select}
							onChange={e => this.setState({ teacher1: e.target.value })}>
							<option value='selecione'>Novo Professor</option>
							{listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
						</select>
						<select
							className={classes.select}
							onChange={e => this.setState({ teacher2: e.target.value })}>
							<option value='selecione'>Novo Professor</option>
							{listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
						</select>
						<select
							className={classes.select}
							onChange={e => this.setState({ teacher3: e.target.value })}>
							<option value='selecione'>Novo Professor</option>
							{listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
						</select>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}>
							Adicionar
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
					</form>
				</Grid>
				<Grid item sm />
			</Grid >
		);
	}
}

file.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles)(file);
