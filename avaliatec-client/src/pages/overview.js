import React from 'react'
import { Grid } from '@material-ui/core'

//Components
import UpdateCard from '../components/UpdateCard'

export default function overview(props) {
	console.log(props.title)
	console.log(props.theme)
	return (
		<Grid container>
			<Grid item sm>{props.title.map((title) => <UpdateCard title={title}></UpdateCard>)}</Grid>
			<Grid item sm>{props.theme.map((theme) => <UpdateCard theme={theme}></UpdateCard>)}</Grid>
			<Grid item sm></Grid>
		</Grid>
	)
}