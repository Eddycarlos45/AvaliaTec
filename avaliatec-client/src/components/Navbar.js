import React from 'react';
import { Link } from 'react-router-dom';

//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	keyReturn: {
		marginLeft: 'auto',
		color: 'white'
	},
	link: {
		textDecoration: 'none',
		color: 'black'
	},
	menuIcon: {
		marginRight: '5px'
	}
}));

const handleReturn = () => {
	window.location.replace('http://localhost:3000/home')
}
export default function DenseAppBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar variant="dense">
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon onClick={handleClick} />
					</IconButton>
					<Typography variant="h6" color="inherit">
						INÍCIO
					</Typography>
					<IconButton className={classes.keyReturn} onClick={handleReturn}>
						<KeyboardReturnIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<Link className={classes.link} to="/users"><MenuItem><AddCircleIcon className={classes.menuIcon} color='primary' /> Cadastrar Avaliador</MenuItem></Link>
				<Link className={classes.link} to="/"><MenuItem><ExitToAppIcon className={classes.menuIcon} color='primary' />Logout</MenuItem></Link>
			</Menu>
		</div>
	);
}