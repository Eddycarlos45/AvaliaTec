import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class Navbar extends Component {
	render() {
		return (
			<AppBar>
				<Toolbar className="nav">
					<Button color="inherit" component={Link} to="/file">Ficha</Button>
					<Button color="inherit" component={Link} to="/theme">Tema</Button>
					<Button color="inherit" component={Link} to="/evaluation">Avaliação</Button>
				</Toolbar>
			</AppBar>
		)
	}
}

export default Navbar;