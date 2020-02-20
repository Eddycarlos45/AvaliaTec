import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

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


class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			userLogin: '',
			userName: '',
			course: '',
			loading: false,
			errors: {}
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			userLogin: this.state.userLogin,
			userName: this.state.userName,
			course: this.state.course
		}
		axios.post('/signup', newUserData)
			.then(res => {
				console.log(res.data);
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
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

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant="h2" className={classes.pageTitle}>
						Sign Up
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirm Password"
							className={classes.textField}
							helperText={errors.ConfirmPassword}
							error={errors.ConfirmPassword ? true : false}
							value={this.state.ConfirmPassword}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="userLogin"
							name="userLogin"
							type="text"
							label="User Login"
							className={classes.textField}
							helperText={errors.userLogin}
							error={errors.userLogin ? true : false}
							value={this.state.userLogin}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="userName"
							name="userName"
							type="text"
							label="Name"
							className={classes.textField}
							helperText={errors.userName}
							error={errors.userName ? true : false}
							value={this.state.userName}
							onChange={this.handleChange}
							fullWidth />
						<TextField
							id="course"
							name="course"
							type="text"
							label="Course"
							className={classes.textField}
							helperText={errors.course}
							error={errors.course ? true : false}
							value={this.state.course}
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
							Sign Up
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
						<br />
						<small className={classes.small}>already have an account ? login <Link to="/login">here</Link></small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles)(signup);
