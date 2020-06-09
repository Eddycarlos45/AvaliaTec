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
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';

//My Components
import Navbar from '../components/Navbar'
import UpdateCardUsers from '../components/UpdateCardUsers'

const styles = {
	form: {
		textAlign: 'center',
		marginTop: '5%'
	},
	textField: {
		margin: '10px auto 10px auto',
		width: '395px'
	},
	button: {
		marginTop: 20,
		position: 'relative',
		marginBottom: 10
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progress: {
		position: 'absolute'
	},
	avatar: {
		margin: '5px',
		backgroundColor: '#4caf50',
		display: 'inline-flex'
	},
	permission: {
		textAlign: 'center',
		marginTop: '20%'
	}
};


class users extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			userName: '',
			course: '',
			listUsers: [],
			loading: false,
			errors: {}
		}
	}

	componentDidMount() {
		axios.get('/users')
			.then(res => {
				this.setState({
					listUsers: res.data
				})
			})
			.catch(err => console.log(err));
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
			userName: this.state.userName,
			course: this.state.course,
			isAdmin: false
		}
		axios.post('/signup', newUserData)
			.then(res => {
				console.log(res.data);
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
				this.setState({
					loading: false
				})
				window.location.reload()
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

	handleClickShowPassword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};

	handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;

		if (localStorage.getItem('token') === null) {
			return (
				<h1 className={classes.permission}>Você não tem permissão para acessar essa página</h1>
			)
		} else {
			return (
				<div>
					<Navbar></Navbar>
					<Grid container className={classes.form}>
						<Grid item sm>
							<UpdateCardUsers users={this.state.listUsers}></UpdateCardUsers>
						</Grid>
						<Grid item sm={5}>
							<Avatar className={classes.avatar}>
								<LockOpenIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Novo Avaliador
					</Typography>
							<form noValidate onSubmit={this.handleSubmit}>
								<TextField
									variant="outlined"
									margin="normal"
									required
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
								<FormControl className={classes.textField} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										type={this.state.showPassword ? 'text' : 'password'}
										value={this.state.password}
										name="password"
										onChange={this.handleChange}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={this.handleClickShowPassword}
													onMouseDown={this.handleMouseDownPassword}
													edge="end"
												>
													{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
										labelWidth={70}
									/>
								</FormControl>
								<FormControl className={classes.textField} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password"> Confirm Password</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										type={this.state.showPassword ? 'text' : 'password'}
										value={this.state.confirmPassword}
										name="confirmPassword"
										onChange={this.handleChange}
										helperText={errors.confirmPassword}
										error={errors.confirmPassword ? true : false}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={this.handleClickShowPassword}
													onMouseDown={this.handleMouseDownPassword}
													edge="end"
												>
													{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
										labelWidth={70}
									/>
								</FormControl>
								<TextField
									variant="outlined"
									margin="normal"
									required
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
									variant="outlined"
									margin="normal"
									required
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
									CADASTRAR
							{loading && (
										<CircularProgress size={30} className={classes.progress} />
									)}
								</Button>
							</form>
						</Grid>
					</Grid>
				</div>
			);
		}
	}
}

users.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles)(users);
