import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
}));

export default function DateAndTimePickers(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Data da avaliação"
        type="datetime-local"
        onChange={props.onchange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={props.value}
      />
    </form>
  );
}