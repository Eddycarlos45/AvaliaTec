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


const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	keyReturn: {
		marginLeft: 'auto',
		color: 'white'
	}
}));

const handleReturn = () => {
	window.location.reload()
}
export default function DenseAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar variant="dense">
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit">
						INÍCIO
					</Typography>
					<IconButton className={classes.keyReturn} onClick={handleReturn}>
						<KeyboardReturnIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}