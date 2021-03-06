import React, { Component } from 'react';
import axios from 'axios';

import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinkM from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<LinkM color="inherit" href="https://material-ui.com/">
				Fatec Mogi Mirim
      </LinkM>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const styles = {
	paper: {
		marginTop: '25%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: '5px',
		backgroundColor: '#dc004e',
	},
	form: {
		width: '100%',
		marginTop: '5px',
	},
	submit: {
		margin: '5% 0',
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	textField: {
		width: '397px'
	}
}

class signIn extends Component {

	constructor() {
		localStorage.clear();
		super();
		this.state = {
			email: '',
			password: '',
			loading: false,
			errors: {},
			showPassword: false,
			listTeachers: ['']
		}
	}
	componentDidMount() {
		axios.get('/users')
			.then(res => {
				this.setState({
					listTeachers: res.data
				})
			})
			.catch(err => console.log(err));

	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const userData = {
			email: this.state.email,
			password: this.state.password
		}

		let userAdmin = this.state.listTeachers.find(user => user.email === userData.email)

		axios.post('/login', userData)
			.then(res => {
				this.setState({
					loading: false
				});
				localStorage.setItem('token', res.data.token)
				if (userAdmin.isAdmin === true) {
					this.props.history.push('/home');
				} else {
					alert("Você não tem permissão de administrador")
				}

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

		return (
			<Container component="main" maxWidth="xs" >
				<CssBaseline />
				<div className={classes.paper}>
					<h1>Welcome to Avaliatec</h1>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
        			</Typography>
					<form className={classes.form} noValidate onSubmit={this.handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							autoFocus
						/>
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
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
						<Grid container>
							<Grid item xs>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={1}>
					<Copyright />
				</Box>
			</Container>
		);
	}
}

export default withStyles(styles)(signIn);