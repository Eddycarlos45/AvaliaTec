import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
	root: {
		width: '387px',
		marginLeft: '5px',
		marginTop: '30px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	small: {
		fontSize: '20px',
		padding: '13px',

	},
	button: {
		fontSize: '17px',
		backgroundColor: 'blue',
		color: 'white',
		'&:hover': {
			color: 'black',
			backgroundColor: '#4caf50'
		}
	},
	avatar: {
		margin: '7px 0 5px 5px',
		backgroundColor: '#2196f3'
	},
	smallAvaluation: {
		margin: 'auto',
		fontSize: '20px',
		padding: '15px'
	}
});

export default function SimpleCard(props) {
	const classes = useStyles();

	if (props.title === "AVALIAÇÃO") {

		return (
			<Card className={classes.root}>
				<Avatar className={classes.avatar}>
					<DescriptionIcon />
				</Avatar>
				<small className={classes.smallAvaluation}>{props.title}</small>
			</Card>
		)

	} else {

		return (
			<Card className={classes.root}>
				<Avatar className={classes.avatar}>
					<DescriptionIcon />
				</Avatar>
				<small className={classes.small}>{props.title}</small>
				<CardActions className={classes.card}>
					<Button onClick={props.click} className={classes.button}>NOVO</Button>
				</CardActions>
			</Card>
		);
	}
}