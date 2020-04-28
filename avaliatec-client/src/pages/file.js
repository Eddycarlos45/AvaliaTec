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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';

import MyTextField from '../components/MyTextField'

const styles = {
	form: {
		textAlign: 'center'
	},
	pageTitle: {
		margin: '0 auto 10px auto',
		display: 'flex',
		justifyContent: 'center'
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
	},
	avatar: {
		marginRight: '15px',
		backgroundColor: '#388e3c'
	},
	container: {
		display: 'flex'
	}
};

let sliderValue = 0
class file extends Component {
	constructor() {
		super();
		this.state = {
			course: '',
			criterions: [],
			criterion1: '', weight1: 0,
			criterion2: '', weight2: 0,
			criterion3: '', weight3: 0,
			criterion4: '', weight4: 0,
			criterion5: '', weight5: 0,
			criterion6: '', weight6: 0,
			criterion7: '', weight7: 0,
			criterion8: '', weight8: 0,
			criterion9: '', weight9: 0,
			criterion10: '', weight10: 0,
			teachers: [''],
			listTeachers: [''],
			teacher1: '',
			teacher2: '',
			teacher3: '',
			theme: '',
			errors: {},
			classes: {},
			open: false,
			setOpen: false,
			criterion: true,
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
			this.state.teachers.splice(0, 3,
				this.state.teacher1,
				this.state.teacher2,
				this.state.teacher3)
		}
		let total = parseInt(this.state.weight1) + parseInt(this.state.weight2) + parseInt(this.state.weight3)
			+ parseInt(this.state.weight4) + parseInt(this.state.weight5) + parseInt(this.state.weight6)
			+ parseInt(this.state.weight7) + parseInt(this.state.weight8) + parseInt(this.state.weight9)
			+ parseInt(this.state.weight10)

		if (total === 10) {
			this.state.criterions.splice(0, 10,
				{
					type: this.state.criterion1,
					weight: this.state.weight1
				},
				{
					type: this.state.criterion2,
					weight: this.state.weight2
				},
				{
					type: this.state.criterion3,
					weight: this.state.weight3
				},
				{
					type: this.state.criterion4,
					weight: this.state.weight4
				},
				{
					type: this.state.criterion5,
					weight: this.state.weight5
				},
				{
					type: this.state.criterion6,
					weight: this.state.weight6
				},
				{
					type: this.state.criterion7,
					weight: this.state.weight7
				},
				{
					type: this.state.criterion8,
					weight: this.state.weight8
				},
				{
					type: this.state.criterion9,
					weight: this.state.weight9
				},
				{
					type: this.state.criterion10,
					weight: this.state.weight10
				})

			const newFile = {
				course: this.state.course,
				criterions: this.state.criterions,
				teachers: this.state.teachers,
				theme: this.state.theme
			}

			axios.post('/form', newFile)
				.then(res => {
					console.log(res.data);
					this.setState({
						loading: false
					});
					alert('Formulário criado com sucesso')
					window.location.reload()
				})
				.catch(err => {
					this.setState({
						errors: err.response.data,
						loading: false
					})
				})
		} else {
			alert('A soma dos pesos tem que ser igual a 10')
			window.location.reload()
		}

	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	minimumCriterion = () => {
		return (
			<div>
				<MyTextField
					id='criterion1'
					name='criterion1'
					errors={this.state.errors}
					error={this.state.errors.questions}
					value={this.state.criterion1}
					onchange={this.handleChange}
					click={e => this.setState({ weight1: e.target.value })} />
				<MyTextField
					id='criterion2'
					name='criterion2'
					errors={this.state.errors}
					error={this.state.errors.criterions}
					value={this.state.criterion2}
					onchange={this.handleChange}
					click={e => this.setState({ weight2: e.target.value })} />
				<MyTextField
					id='criterion3'
					name='criterion3'
					errors={this.state.errors}
					error={this.state.errors.criterions}
					value={this.state.criterion3}
					onchange={this.handleChange}
					click={e => this.setState({ weight3: e.target.value })} />
			</div>
		)
	}
	newCriterion = (sliderValue) => {

		if (sliderValue === 3) {
			return (
				<div>{this.minimumCriterion()}</div>
			)
		} if (sliderValue === 4) {
			return (
				<div>
					{this.minimumCriterion()}
					<MyTextField
						id='criterion4'
						name='criterion4'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion4}
						onchange={this.handleChange}
						click={e => this.setState({ weight4: e.target.value })} />
				</div>
			)
		} if (sliderValue === 5) {
			return (
				<div>
					{this.minimumCriterion()}
					<MyTextField
						id='criterion4'
						name='criterion4'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion4}
						onchange={this.handleChange}
						click={e => this.setState({ weight4: e.target.value })} />
					<MyTextField
						id='criterion5'
						name='criterion5'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion5}
						onchange={this.handleChange}
						click={e => this.setState({ weight5: e.target.value })} />
				</div>
			)
		} if (sliderValue === 6) {
			return (
				<div>
					{this.minimumCriterion()}
					<MyTextField
						id='criterion4'
						name='criterion4'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion4}
						onchange={this.handleChange}
						click={e => this.setState({ weight4: e.target.value })} />
					<MyTextField
						id='criterion5'
						name='criterion5'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion5}
						onchange={this.handleChange}
						click={e => this.setState({ weight5: e.target.value })} />
					<MyTextField
						id='criterion6'
						name='criterion6'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion6}
						onchange={this.handleChange}
						click={e => this.setState({ weight6: e.target.value })} />
				</div>
			)
		} if (sliderValue === 7) {
			return (
				<div>
					{this.minimumCriterion()}
					<MyTextField
						id='criterion4'
						name='criterion4'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion4}
						onchange={this.handleChange}
						click={e => this.setState({ weight4: e.target.value })} />
					<MyTextField
						id='criterion5'
						name='criterion5'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion5}
						onchange={this.handleChange}
						click={e => this.setState({ weight5: e.target.value })} />
					<MyTextField
						id='criterion6'
						name='criterion6'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion6}
						onchange={this.handleChange}
						click={e => this.setState({ weight6: e.target.value })} />
					<MyTextField
						id='criterion7'
						name='criterion7'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion7}
						onchange={this.handleChange}
						click={e => this.setState({ weight7: e.target.value })} />
				</div>
			)
		} if (sliderValue === 8) {
			return (
				<div>
					{this.minimumCriterion()}
					<MyTextField
						id='criterion4'
						name='criterion4'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion4}
						onchange={this.handleChange}
						click={e => this.setState({ weight4: e.target.value })} />
					<MyTextField
						id='criterion5'
						name='criterion5'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion5}
						onchange={this.handleChange}
						click={e => this.setState({ weight5: e.target.value })} />
					<MyTextField
						id='criterion6'
						name='criterion6'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion6}
						onchange={this.handleChange}
						click={e => this.setState({ weight6: e.target.value })} />
					<MyTextField
						id='criterion7'
						name='criterion7'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion7}
						onchange={this.handleChange}
						click={e => this.setState({ weight7: e.target.value })} />
					<MyTextField
						id='criterion8'
						name='criterion8'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion8}
						onchange={this.handleChange}
						click={e => this.setState({ weight8: e.target.value })} />
				</div>
			)
		} if (sliderValue === 9) {
			return (
				<div>
					{this.minimumCriterion()}
					<MyTextField
						id='criterion4'
						name='criterion4'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion4}
						onchange={this.handleChange}
						click={e => this.setState({ weight4: e.target.value })} />
					<MyTextField
						id='criterion5'
						name='criterion5'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion5}
						onchange={this.handleChange}
						click={e => this.setState({ weight5: e.target.value })} />
					<MyTextField
						id='criterion6'
						name='criterion6'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion6}
						onchange={this.handleChange}
						click={e => this.setState({ weight6: e.target.value })} />
					<MyTextField
						id='criterion7'
						name='criterion7'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion7}
						onchange={this.handleChange}
						click={e => this.setState({ weight7: e.target.value })} />
					<MyTextField
						id='criterion8'
						name='criterion8'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion8}
						onchange={this.handleChange}
						click={e => this.setState({ weight8: e.target.value })} />
					<MyTextField
						id='criterion9'
						name='criterion9'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion9}
						onchange={this.handleChange}
						click={e => this.setState({ weight9: e.target.value })} />
				</div>
			)
		} if (sliderValue === 10) {
			return (
				<div>
					{this.minimumCriterion()}
					<MyTextField
						id='criterion4'
						name='criterion4'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion4}
						onchange={this.handleChange}
						click={e => this.setState({ weight4: e.target.value })} />
					<MyTextField
						id='criterion5'
						name='criterion5'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion5}
						onchange={this.handleChange}
						click={e => this.setState({ weight5: e.target.value })} />
					<MyTextField
						id='criterion6'
						name='criterion6'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion6}
						onchange={this.handleChange}
						click={e => this.setState({ weight6: e.target.value })} />
					<MyTextField
						id='criterion7'
						name='criterion7'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion7}
						onchange={this.handleChange}
						click={e => this.setState({ weight7: e.target.value })} />
					<MyTextField
						id='criterion8'
						name='criterion8'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion8}
						onchange={this.handleChange}
						click={e => this.setState({ weight8: e.target.value })} />
					<MyTextField
						id='criterion9'
						name='criterion9'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion9}
						onchange={this.handleChange}
						click={e => this.setState({ weight9: e.target.value })} />
					<MyTextField
						id='criterion10'
						name='criterion10'
						errors={this.state.errors}
						error={this.state.errors.criterions}
						value={this.state.criterion10}
						onchange={this.handleChange}
						click={e => this.setState({ weight10: e.target.value })} />
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
					<Typography variant="h4" className={classes.pageTitle}>
						<Avatar className={classes.avatar}>
							<AddCircleOutlineIcon />
						</Avatar>
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
							variant="outlined"
							margin="normal"
							required
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
						<small>
							SELECIONE A QUANTIDADE DE CRITÉRIOS
      					</small>
						<Slider
							className={classes.slider}
							defaultValue={1}
							getAriaValueText={this.valuetext}
							aria-labelledby="discrete-slider"
							valueLabelDisplay="auto"
							onChange={(e) => this.setState({ criterion: true })}
							step={1}
							marks
							min={3}
							max={10}
						/>
						{this.state.criterion ? this.newCriterion(sliderValue) : null}
						<h2>Avaliadores</h2>
						<select
							className={classes.select}
							onChange={e => this.setState({ teacher1: e.target.value })}>
							<option value=''>Novo Professor</option>
							{listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
						</select>
						<select
							className={classes.select}
							onChange={e => this.setState({ teacher2: e.target.value })}>
							<option value=''>Novo Professor</option>
							{listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
						</select>
						<select
							className={classes.select}
							onChange={e => this.setState({ teacher3: e.target.value })}>
							<option value=''>Novo Professor</option>
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
