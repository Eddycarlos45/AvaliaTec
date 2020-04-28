import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

export default function MyTextField(props) {
	return (
		<div>
			<TextField
				id={props.id}
				name={props.name}
				type="text"
				label="Critério"
				className={props.className}
				helperText={props.erros}
				error={props.error ? true : false}
				value={props.value}
				onChange={props.onchange}
				fullWidth />
			<small>Peso: </small>
			<select onChange={props.click}>
				<option value={0}>0</option>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
			</select>
		</div>
	)
}
