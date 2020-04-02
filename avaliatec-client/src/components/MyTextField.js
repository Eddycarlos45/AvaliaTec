import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

export default class MyTextField extends Component {
    render() {
        return (
               <TextField
					id="questions"
					name="questions"
					type="text"
					label="Questões"
					fullWidth /> 
        )
    }
}
