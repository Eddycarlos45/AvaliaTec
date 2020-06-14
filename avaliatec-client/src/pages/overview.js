import React from 'react'
import { Grid } from '@material-ui/core'

//Components
import UpdateCard from '../components/UpdateCard'
import FilledCard from '../components/FilledCard'

export default function overview(props) {
	return (
		<Grid container>
			<Grid item sm>{props.theme.map((theme) =>
				<UpdateCard
					theme={theme.theme}
					id={theme.groupId}
					members={theme.members}
					course={theme.course}>
				</UpdateCard>)}
			</Grid>
			<Grid item sm>{props.title.map((form) =>
				<UpdateCard
					title={form.theme}
					id={form.formId}
					members={form.members}
					criteria={form.criteria}
					teachers={form.teachers}
					date={form.date}
					time={form.time}
					course={form.course}>
				</UpdateCard>)}
			</Grid>
			<Grid item sm>{props.filled.map((filled) =>
				<FilledCard
					filled={filled.teacher}>
				</FilledCard>)}
			</Grid>
		</Grid >
	)
}