import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 500,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [theme, setTheme] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setTheme(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (

    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Selecione o Tema</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={theme}
          onChange={handleChange}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>{props.theme}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}