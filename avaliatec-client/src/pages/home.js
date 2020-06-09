import React, { Component, Fragment } from 'react'
import axios from 'axios';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

//Components
import Navbar from '../components/Navbar';
import Card from '../components/Card'

//Pages
import Work from './work';
import Avaluation from '../pages/avaluation';
import File from '../pages/file';
import OverView from '../pages/overview';

const styles = {
	form: {
		textAlign: 'center',
		marginBottom: '30px'
	},
	permission: {
		textAlign: 'center',
		marginTop: '20%'
	}
};

export class home extends Component {

	constructor() {
		super();
		this.state = {
			newFragment: '',
			listAvaluations: [''],
			listThemes: [''],
			listFilled: ['']
		}
	}

	pageFragment = (page) => {
		this.setState({ newFragment: page })
		this.renderNew(page)
	}

	componentDidMount() {
		axios.get('/form')
			.then(res => {
				this.setState({
					listAvaluations: res.data
				})
			})
			.catch(err => console.log(err))
			.then(axios.get('/theme')
				.then(res => {
					this.setState({
						listThemes: res.data
					})
				})).then(axios.get('/filled')
					.then(res => {
						this.setState({
							listFilled: res.data
						})
					}))
			.catch(err => console.log(err));
	}
	renderNew = (page) => {
		if (page === 'work') {
			return (
				<Work></Work>
			)
		} if (page === 'avaluation') {
			return (
				<Avaluation></Avaluation>
			)
		} if (page === 'file') {
			console.log(localStorage.getItem('token'))
			return (
				<File></File>
			)
		} else {
			return (
				<div>
					<OverView
						title={this.state.listAvaluations}
						theme={this.state.listThemes}
						filled={this.state.listFilled}>
					</OverView>
				</div>
			)
		}
	}

	render() {
		const { classes } = this.props;

		if (localStorage.getItem('token') === null) {
			return (
				<h1 className={classes.permission}>Você não tem permissão para acessar essa página</h1>
			)
		} else {
			return (
				<div>
					<Navbar />
					<Grid container className={classes.form}>
						<Grid item sm>
							<Card title='TRABALHOS' click={(e) => this.pageFragment('work')}></Card>
						</Grid>
						<Grid item sm>
							<Card title='	FICHA' click={(e) => this.pageFragment('file')}></Card>
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
}

export default withStyles(styles)(home);
