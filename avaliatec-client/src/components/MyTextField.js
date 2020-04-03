import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

export default function MyTextField(props) {
	return (
		<TextField
			id={props.id}
			name={props.name}
			type="text"
			label="Questões"
			className={props.className}
			helperText={props.erros}
			error={props.error ? true : false}
			value={props.value}
			onChange={props.onchange}
			fullWidth />
	)
}
