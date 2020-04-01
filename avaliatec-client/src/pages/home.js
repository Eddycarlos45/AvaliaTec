import React, { Component, Fragment } from 'react'

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

//Components
import Navbar from '../components/Navbar';
import Card from '../components/Card'

//Pages
import Theme from '../pages/theme';
import Avaluation from '../pages/avaluation';
import File from '../pages/file';

const styles = {
	form: {
		textAlign: 'center',
		marginBottom: '30px'
	}
};

export class home extends Component {

	constructor() {
		super();
		this.state = {
			newFragment: '',
		}
	}

	pageFragment = (page) => {
		this.setState({ newFragment: page })
		this.renderNew(page)
	}

	renderNew = (page) => {
		if (page === 'theme') {
			return (
				<Theme></Theme>
			)
		} if (page === 'avaluation') {
			return (
				<Avaluation></Avaluation>
			)
		} if (page === 'file') {
			return (
				<File></File>
			)
		} else {
			return (
				<h1> Sem fichas</h1>
			)
		}
	}
	render() {

		const { classes } = this.props;

		return (
			<div>
				<Navbar />
				<Grid container className={classes.form}>
					<Grid item sm>
						<Card title='FICHAS' click={(e) => this.pageFragment('file')}></Card>
					</Grid>
					<Grid item sm>
						<Card title='	TEMA' click={(e) => this.pageFragment('theme')}></Card>
					</Grid>
					<Grid item sm>
						{<Card title='AVALIAÇÃO' click={(e) => this.pageFragment('avaluation')}></Card>}
					</Grid>
				</Grid>
				<Fragment>
					{this.renderNew(this.state.newFragment)}
				</Fragment>
			</div>
		)
	}
}

export default withStyles(styles)(home);
