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
	}
};


class theme extends Component {
	constructor() {
		super();
		this.state = {
			theme: '',
			course: '',
			member: '',
			member1: '',
			member2: '',
			member3: '',
			members: [],
			loading: false,
			errors: {}
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		if (this.state.member == '') {
			this.state.members[0] = '';
		} else {
			this.state.members.unshift(
				this.state.member,
				this.state.member1,
				this.state.member2,
				this.state.member3)
			if (this.state.members[4] == '') {
				this.state.members.pop();
			}
		}
		const newTheme = {
			theme: this.state.theme,
			course: this.state.course,
			members: this.state.members,
		}
		axios.post('/theme', newTheme)
			.then(res => {
				console.log(res.data);
				this.setState({
					loading: false
				});
				console.log(newTheme)
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
		})
	}
	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant="h2" className={classes.pageTitle}>
						Novo Tema
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="theme"
							name="theme"
							type="text"
							label="Nome do Tema"
							className={classes.textField}
							helperText={errors.themeName}
							error={errors.theme ? true : false}
							value={this.state.theme}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="course"
							name="course"
							type="text"
							label="Curso"
							className={classes.textField}
							helperText={errors.course}
							error={errors.course ? true : false}
							value={this.state.course}
							onChange={this.handleChange}
							fullWidth />
						<small>MEMBROS</small>
						<TextField
							id="member"
							name="member"
							type="text"
							label="Primeiro membro"
							className={classes.textField}
							helperText={errors.members}
							error={errors.members ? true : false}
							value={this.state.member}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="member1"
							name="member1"
							type="text"
							label="Segundo membro"
							className={classes.textField}
							helperText={errors.member}
							error={errors.member ? true : false}
							value={this.state.member1}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="member2"
							name="member2"
							type="text"
							label="Terceiro membro"
							className={classes.textField}
							helperText={errors.member}
							error={errors.member ? true : false}
							value={this.state.member2}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="member3"
							name="member3"
							type="text"
							label="Quarto membro"
							className={classes.textField}
							helperText={errors.member}
							error={errors.member ? true : false}
							value={this.state.member3}
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

theme.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles)(theme);
