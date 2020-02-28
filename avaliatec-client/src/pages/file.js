import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from '../components/Select'

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
	form: {
		textAlign: 'center'
	},
	pageTitle: {
		margin: '0 auto 10px auto'
	},
	textField: {
		margin: '10px auto 10px auto'
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
};


class file extends Component {
	constructor() {
		super();
		this.state = {
			course: '',
			questions: [],
			comments: [],
			teachers: [],
			theme: '',
			errors: {},
			age: '',
			setAge: '',
			open: false,
			setOpen: false,
			themes: null
		}
	}
	componentDidMount() {
		axios.get('/theme')
			.then(res => {
				console.log(res.data)
				this.setState({
					themes: res.data
				})
			})
			.catch(err => console.log(err));
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const newFile = {
			course: this.state.course,
			questions: this.state.questions,
			comments: this.state.comments,
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

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		let listThemes = this.state.themes ? (
			this.state.themes.map((file) => <p>{file.theme}</p>)
		) : (<p>Loading...</p>)

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant="h2" className={classes.pageTitle}>
						Formulário
					</Typography>
					<Select
						theme={listThemes}
					></Select>
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
						<TextField
							id="questions"
							name="questions"
							type="text"
							label="Questões"
							className={classes.textField}
							helperText={errors.questions}
							error={errors.questions ? true : false}
							value={this.state.questions}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="comments"
							name="comments"
							type="text"
							label="Comentários"
							className={classes.textField}
							helperText={errors.comments}
							error={errors.comments ? true : false}
							value={this.state.comments}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="teachers"
							name="teachers"
							type="text"
							label="Professores"
							className={classes.textField}
							helperText={errors.teachers}
							error={errors.teachers ? true : false}
							value={this.state.teachers} c
							onChange={this.handleChange}
							fullWidth />
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
			</Grid>
		);
	}
}

file.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles)(file);
