import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { IconButton, Dialog } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BarChartIcon from '@material-ui/icons/BarChart';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
//Pdf plugins
import jsPDF from 'jspdf'
import 'jspdf-autotable'
//Import axios
import axios from 'axios';

const useStyles = makeStyles({
	root: {
		width: '387px',
		marginLeft: '5px',
		marginTop: '30px',
		display: 'flex',
		justifyContent: 'space-between',
		boxShadow: '0 5px 20px rgba(0,0,0,.25)',
		transition: 'transform 300ms',
		backgroundColor: '#81c784',
		'&:hover': {
			transform: 'scale(1.1)'
		}
	},
	small: {
		fontSize: '15px',
		padding: '18px',

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
	buttonNo: {
		color: 'white',
		backgroundColor: 'red',
		'&:hover': {
			color: 'black',
			backgroundColor: 'red',
		}
	},
	buttonYes: {
		color: 'white',
		backgroundColor: 'green',
		'&:hover': {
			color: 'black',
			backgroundColor: 'green'
		},
		'&:disabled': {
			color: 'black',
			backgroundColor: '#9e9e9e'
		}
	}
});


export default function SimpleCard(props) {
	const classes = useStyles();
	const [work, setWork] = React.useState();
	const [form, setForm] = React.useState();
	const [open, setOpen] = React.useState(false);
	const [btnStatus, setBtnStatus] = React.useState(true)

	const handleClickOpen = (theme) => {
		setOpen(true);
		preparePdf(theme)
	};

	const handleClose = () => {
		setOpen(false);
	};

	const preparePdf = (theme) => {
		const findTheme = {
			theme: theme
		}
		axios.post('/form/find', findTheme)
			.then(res => {
				setForm(res.data)
			})
			.catch(err => console.log(err))
			.then(axios.post('/theme/find', findTheme)
				.then(res => {
					setWork(res.data)
				})
			)
			.then(res => { setBtnStatus(false) })
			.catch(err => console.log(err))
	}

	const createPdf = (theme, score) => {
		console.log(score)
		var scoreLenght = 0;
		score.map((ele) => scoreLenght = scoreLenght + 1)
		for (var i = 0; i < scoreLenght; i++) {
			var doc = new jsPDF('p', 'pt');
			var content = `
        <h2 style="margin-top:50px;margin-left: 150px">Faculdade de Tecnologia de Mogi Mirim</h2>
        <h2 style="margin-top:20px;margin-left: 250px">Arthur de Azevedo</h2>
        <h3 style="margin-top:30px;margin-left: 280px">Ficha de Avaliação</h3>
        <p style="margin-top: 760px; margin-left:100px">________________________________________________________________<br>
		ASSINATURA DO AVALIADOR(A)</p>
		`
			//media
			var sumNote = 0;
			var sumWeight = 0;
			var media = 0;
			sumNote =
				(parseInt(score[i].criteria[0].score) * parseInt(score[0].criteria[0].weight)) +
				(parseInt(score[i].criteria[1].score) * parseInt(score[0].criteria[1].weight)) +
				(parseInt(score[i].criteria[2].score) * parseInt(score[0].criteria[2].weight)) +
				(parseInt(score[i].criteria[3].score) * parseInt(score[0].criteria[3].weight)) +
				(parseInt(score[i].criteria[4].score) * parseInt(score[0].criteria[4].weight)) +
				(parseInt(score[i].criteria[5].score) * parseInt(score[0].criteria[5].weight)) +
				(parseInt(score[i].criteria[6].score) * parseInt(score[0].criteria[6].weight)) +
				(parseInt(score[i].criteria[7].score) * parseInt(score[0].criteria[7].weight)) +
				(parseInt(score[i].criteria[8].score) * parseInt(score[0].criteria[8].weight)) +
				(parseInt(score[i].criteria[9].score) * parseInt(score[0].criteria[9].weight))
			sumWeight =
				parseInt(score[0].criteria[0].weight) + parseInt(score[0].criteria[1].weight) +
				parseInt(score[0].criteria[2].weight) + parseInt(score[0].criteria[3].weight) +
				parseInt(score[0].criteria[4].weight) + parseInt(score[0].criteria[5].weight) +
				parseInt(score[0].criteria[6].weight) + parseInt(score[0].criteria[7].weight) +
				parseInt(score[0].criteria[8].weight) + parseInt(score[0].criteria[9].weight)
			media = (sumNote / sumWeight) * 2
			doc.autoTable({
				theme: 'grid',
				startY: 140,
				body: [
					['ALUNOS', work[0].members[0]],
					['', work[0].members[1]],
					['', work[0].members[2]],
					['', work[0].members[3]],
					['CURSO', form[0].course],
					['TÍTULO', theme],
					['AVALIADOR', score[i].teacher],
					['DATA', form[0].date],
				]
			})
			//media

			doc.autoTable({
				theme: 'grid',
				startY: 360,
				head: [['', '   AVALIAÇÃO', '']],
				body: [
					['CRITÉRIO', 'VALOR', 'AVALIAÇÃO'],
					[form[0].criteria[0].type, score[0].criteria[0].weight, score[i].criteria[0].score],
					[form[0].criteria[1].type, score[0].criteria[1].weight, score[i].criteria[1].score],
					[form[0].criteria[2].type, score[0].criteria[2].weight, score[i].criteria[2].score],
					[form[0].criteria[3].type, score[0].criteria[3].weight, score[i].criteria[3].score],
					[form[0].criteria[4].type, score[0].criteria[4].weight, score[i].criteria[4].score],
					[form[0].criteria[5].type, score[0].criteria[5].weight, score[i].criteria[5].score],
					[form[0].criteria[6].type, score[0].criteria[6].weight, score[i].criteria[6].score],
					[form[0].criteria[7].type, score[0].criteria[7].weight, score[i].criteria[7].score],
					[form[0].criteria[8].type, score[0].criteria[8].weight, score[i].criteria[8].score],
					[form[0].criteria[9].type, score[0].criteria[9].weight, score[i].criteria[9].score],
					['PONTUAÇÃO TOTAL', media.toFixed(1)],
				]
			})
			doc.fromHTML(content)
			doc.save('test.pdf')
		}

	}
	return (
		<div>
			<Card className={classes.root}>
				<small className={classes.small}>{props.theme}</small>
				<CardActions>
					<IconButton aria-label="report">
						<BarChartIcon onClick={(e) => handleClickOpen(props.theme)} />
					</IconButton>
					<IconButton aria-label="delete" >
						<DeleteIcon />
					</IconButton>
				</CardActions>
			</Card>
			<Dialog
				open={open}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{"Gerar arquivo PDF para:"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{props.theme}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} className={classes.buttonNo}>Voltar</Button>
					<Button
						disabled={btnStatus}
						onClick={(e) => createPdf(props.theme, props.score)}
						className={classes.buttonYes}>
						Gerar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}