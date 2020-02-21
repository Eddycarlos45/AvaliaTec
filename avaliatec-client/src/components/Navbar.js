import React, { Component, Fragment } from 'react';
import Link from 'react-router-dom/Link';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import File from '../pages/file'
import Theme from '../pages/theme'

const pageRender = (pageIndex) => {
	if(pageIndex === 1) {return pageIndex } 
	if (pageIndex === 2){return pageIndex}
}

class Navbar extends Component {
	render() {
		return (
			<div>
			<AppBar>
				<Toolbar className="nav">
					<Button color="inherit" onSubmit = {this.pageRender(1)}>Ficha</Button>
					<Button color="inherit" onSubmit = {this.pageRender(2)}>Tema</Button>
					<Button color="inherit" component={Link} to="/evaluation">Avaliação</Button>
				</Toolbar>
			</AppBar>
			<Fragment>
				{pageRender() === "file" ? <File/> : <Theme/>}
			</Fragment>
			</div>
		)
	}
}

export default Navbar;