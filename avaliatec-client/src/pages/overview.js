import React from 'react'
import { Grid } from '@material-ui/core'

//Components
import UpdateCard from '../components/UpdateCard'

export default function overview(props) {
	return (
		<Grid container>
			<Grid item sm>{props.title.map((form) =>
				<UpdateCard
					title={form.theme}
					id={form.formId}
					members={form.members}
					questions={form.questions}
					teachers={form.teachers}
					course={form.course}>
				</UpdateCard>)}
			</Grid>
			<Grid item sm>{props.theme.map((theme) =>
				<UpdateCard
					theme={theme.theme}
					id={theme.groupId}
					members={theme.members}
					course={theme.course}>
				</UpdateCard>)}
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	)
}