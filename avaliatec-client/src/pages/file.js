import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';

import MyTextField from '../components/MyTextField'
import DatePicker from '../components/DatePicker'

const styles = {
  form: {
    textAlign: 'center'
  },
  pageTitle: {
    margin: '0 auto 10px auto',
    display: 'flex',
    justifyContent: 'center'
  },
  textField: {
    margin: '10px auto 20px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  select: {
    width: '300px',
    height: '30px',
    marginTop: '10px',
    marginBottom: '15px'
  },
  slider: {
    marginTop: '20px'
  },
  avatar: {
    marginRight: '15px',
    backgroundColor: '#388e3c'
  },
  container: {
    display: 'flex'
  }
};

let sliderValue = 0
let dateSplit = []
class file extends Component {
  constructor() {
    super();
    this.state = {
      course: '',
      criteria: [''],
      criteria1: '', weight1: 0,
      criteria2: '', weight2: 0,
      criteria3: '', weight3: 0,
      criteria4: '', weight4: 0,
      criteria5: '', weight5: 0,
      criteria6: '', weight6: 0,
      criteria7: '', weight7: 0,
      criteria8: '', weight8: 0,
      criteria9: '', weight9: 0,
      criteria10: '', weight10: 0,
      teachers: [''],
      listTeachers: [''],
      teacher1: '',
      teacher2: '',
      teacher3: '',
      teacher4: '',
      teacher5: '',
      theme: '',
      errors: {},
      classes: {},
      open: false,
      setOpen: false,
      isCriteria: true,
      btnStatus: true,
      value: null,
      themes: [''],
      date: 'AAAA-MM-DDTHH:MM',
      time: ''
    }
  }
  componentDidMount() {
    axios.get('/theme')
      .then(res => {
        this.setState({
          themes: res.data
        })
      })
      .catch(err => console.log(err))
      .then(axios.get('/users')
        .then(res => {
          this.setState({
            listTeachers: res.data
          })
        }))
      .catch(err => console.log(err));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    this.state.teachers.splice(0, 5,
      {
        name: this.state.teacher1,
        filled: false
      },
      {
        name: this.state.teacher2,
        filled: false
      },
      {
        name: this.state.teacher3,
        filled: false
      },
      {
        name: this.state.teacher4,
        filled: false
      },
      {
        name: this.state.teacher5,
        filled: false
      })
    this.state.criteria.splice(0, 10,
      {
        type: this.state.criteria1,
        weight: this.state.weight1
      },
      {
        type: this.state.criteria2,
        weight: this.state.weight2
      },
      {
        type: this.state.criteria3,
        weight: this.state.weight3
      },
      {
        type: this.state.criteria4,
        weight: this.state.weight4
      },
      {
        type: this.state.criteria5,
        weight: this.state.weight5
      },
      {
        type: this.state.criteria6,
        weight: this.state.weight6
      },
      {
        type: this.state.criteria7,
        weight: this.state.weight7
      },
      {
        type: this.state.criteria8,
        weight: this.state.weight8
      },
      {
        type: this.state.criteria9,
        weight: this.state.weight9
      },
      {
        type: this.state.criteria10,
        weight: this.state.weight10
      })

    const findCourse = this.state.themes.find(item => item.theme === this.state.theme)
    dateSplit = this.state.date.split("T");
    const newFile = {
      course: findCourse.course,
      criteria: this.state.criteria,
      teachers: this.state.teachers,
      theme: this.state.theme,
      date: dateSplit[0],
      time: dateSplit[1]
    }

    axios.post('/form', newFile)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false
        });
        alert('Formulário criado com sucesso')
        window.location.reload()
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  minimumCriteria = () => {
    return (
      <div>
        <MyTextField
          id='criteria1'
          name='criteria1'
          errors={this.state.errors}
          error={this.state.errors.criteria}
          value={this.state.criteria1}
          onchange={this.handleChange}
          click={e => this.setState({ weight1: e.target.value })} />
        <MyTextField
          id='criteria2'
          name='criteria2'
          errors={this.state.errors}
          error={this.state.errors.criteria}
          value={this.state.criteria2}
          onchange={this.handleChange}
          click={e => this.setState({ weight2: e.target.value })} />
        <MyTextField
          id='criteria3'
          name='criteria3'
          errors={this.state.errors}
          error={this.state.errors.criteria}
          value={this.state.criteria3}
          onchange={this.handleChange}
          click={e => this.setState({ weight3: e.target.value })} />
      </div>
    )
  }
  newCriteria = (sliderValue) => {

    if (sliderValue === 3) {
      return (
        <div>{this.minimumCriteria()}</div>
      )
    } if (sliderValue === 4) {
      return (
        <div>
          {this.minimumCriteria()}
          <MyTextField
            id='criteria4'
            name='criteria4'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria4}
            onchange={this.handleChange}
            click={e => this.setState({ weight4: e.target.value })} />
        </div>
      )
    } if (sliderValue === 5) {
      return (
        <div>
          {this.minimumCriteria()}
          <MyTextField
            id='criteria4'
            name='criteria4'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria4}
            onchange={this.handleChange}
            click={e => this.setState({ weight4: e.target.value })} />
          <MyTextField
            id='criteria5'
            name='criteria5'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria5}
            onchange={this.handleChange}
            click={e => this.setState({ weight5: e.target.value })} />
        </div>
      )
    } if (sliderValue === 6) {
      return (
        <div>
          {this.minimumCriteria()}
          <MyTextField
            id='criteria4'
            name='criteria4'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria4}
            onchange={this.handleChange}
            click={e => this.setState({ weight4: e.target.value })} />
          <MyTextField
            id='criteria5'
            name='criteria5'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria5}
            onchange={this.handleChange}
            click={e => this.setState({ weight5: e.target.value })} />
          <MyTextField
            id='criteria6'
            name='criteria6'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria6}
            onchange={this.handleChange}
            click={e => this.setState({ weight6: e.target.value })} />
        </div>
      )
    } if (sliderValue === 7) {
      return (
        <div>
          {this.minimumCriteria()}
          <MyTextField
            id='criteria4'
            name='criteria4'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria4}
            onchange={this.handleChange}
            click={e => this.setState({ weight4: e.target.value })} />
          <MyTextField
            id='criteria5'
            name='criteria5'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria5}
            onchange={this.handleChange}
            click={e => this.setState({ weight5: e.target.value })} />
          <MyTextField
            id='criteria6'
            name='criteria6'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria6}
            onchange={this.handleChange}
            click={e => this.setState({ weight6: e.target.value })} />
          <MyTextField
            id='criteria7'
            name='criteria7'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria7}
            onchange={this.handleChange}
            click={e => this.setState({ weight7: e.target.value })} />
        </div>
      )
    } if (sliderValue === 8) {
      return (
        <div>
          {this.minimumCriteria()}
          <MyTextField
            id='criteria4'
            name='criteria4'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria4}
            onchange={this.handleChange}
            click={e => this.setState({ weight4: e.target.value })} />
          <MyTextField
            id='criteria5'
            name='criteria5'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria5}
            onchange={this.handleChange}
            click={e => this.setState({ weight5: e.target.value })} />
          <MyTextField
            id='criteria6'
            name='criteria6'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria6}
            onchange={this.handleChange}
            click={e => this.setState({ weight6: e.target.value })} />
          <MyTextField
            id='criteria7'
            name='criteria7'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria7}
            onchange={this.handleChange}
            click={e => this.setState({ weight7: e.target.value })} />
          <MyTextField
            id='criteria8'
            name='criteria8'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria8}
            onchange={this.handleChange}
            click={e => this.setState({ weight8: e.target.value })} />
        </div>
      )
    } if (sliderValue === 9) {
      return (
        <div>
          {this.minimumCriteria()}
          <MyTextField
            id='criteria4'
            name='criteria4'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria4}
            onchange={this.handleChange}
            click={e => this.setState({ weight4: e.target.value })} />
          <MyTextField
            id='criteria5'
            name='criteria5'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria5}
            onchange={this.handleChange}
            click={e => this.setState({ weight5: e.target.value })} />
          <MyTextField
            id='criteria6'
            name='criteria6'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria6}
            onchange={this.handleChange}
            click={e => this.setState({ weight6: e.target.value })} />
          <MyTextField
            id='criteria7'
            name='criteria7'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria7}
            onchange={this.handleChange}
            click={e => this.setState({ weight7: e.target.value })} />
          <MyTextField
            id='criteria8'
            name='criteria8'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria8}
            onchange={this.handleChange}
            click={e => this.setState({ weight8: e.target.value })} />
          <MyTextField
            id='criteria9'
            name='criteria9'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria9}
            onchange={this.handleChange}
            click={e => this.setState({ weight9: e.target.value })} />
        </div>
      )
    } if (sliderValue === 10) {
      return (
        <div>
          {this.minimumCriteria()}
          <MyTextField
            id='criteria4'
            name='criteria4'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria4}
            onchange={this.handleChange}
            click={e => this.setState({ weight4: e.target.value })} />
          <MyTextField
            id='criteria5'
            name='criteria5'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria5}
            onchange={this.handleChange}
            click={e => this.setState({ weight5: e.target.value })} />
          <MyTextField
            id='criteria6'
            name='criteria6'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria6}
            onchange={this.handleChange}
            click={e => this.setState({ weight6: e.target.value })} />
          <MyTextField
            id='criteria7'
            name='criteria7'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria7}
            onchange={this.handleChange}
            click={e => this.setState({ weight7: e.target.value })} />
          <MyTextField
            id='criteria8'
            name='criteria8'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria8}
            onchange={this.handleChange}
            click={e => this.setState({ weight8: e.target.value })} />
          <MyTextField
            id='criteria9'
            name='criteria9'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria9}
            onchange={this.handleChange}
            click={e => this.setState({ weight9: e.target.value })} />
          <MyTextField
            id='criteria10'
            name='criteria10'
            errors={this.state.errors}
            error={this.state.errors.criteria}
            value={this.state.criteria10}
            onchange={this.handleChange}
            click={e => this.setState({ weight10: e.target.value })} />
        </div>
      )
    }
  }

  valuetext = (value) => {
    sliderValue = value
    return value;
  }
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    let listThemes = this.state.themes;
    let listTeachers = this.state.listTeachers;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h4" className={classes.pageTitle}>
            <Avatar className={classes.avatar}>
              <AddCircleOutlineIcon />
            </Avatar>
						Formulário
					</Typography>
          <small className={classes.small}>SELECIONE O TRABALHO</small>
          <select
            className={classes.select}
            onChange={e => this.setState({ theme: e.target.value, btnStatus: false })}>
            <option value='selecione' >Trabalhos</option>
            {listThemes.map((item) => <option value={item.theme}>{item.theme}</option>)}
          </select>
          <form noValidate onSubmit={this.handleSubmit}>
            <small>
              SELECIONE A QUANTIDADE DE CRITÉRIOS
      					</small>
            <Slider
              className={classes.slider}
              defaultValue={1}
              getAriaValueText={this.valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              onChange={(e) => this.setState({ isCriteria: true })}
              step={1}
              marks
              min={3}
              max={10}
            />
            {this.state.isCriteria ? this.newCriteria(sliderValue) : null}
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={this.state.btnStatus}>
              Adicionar
							{loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm >
          <h2>Avaliadores</h2>
          <select
            className={classes.select}
            onChange={e => this.setState({ teacher1: e.target.value })}>
            <option value=''>Novo Professor</option>
            {listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
          </select>
          <select
            className={classes.select}
            onChange={e => this.setState({ teacher2: e.target.value })}>
            <option value=''>Novo Professor</option>
            {listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
          </select>
          <select
            className={classes.select}
            onChange={e => this.setState({ teacher3: e.target.value })}>
            <option value=''>Novo Professor</option>
            {listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
          </select>
          <select
            className={classes.select}
            onChange={e => this.setState({ teacher4: e.target.value })}>
            <option value=''>Novo Professor</option>
            {listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
          </select>
          <select
            className={classes.select}
            onChange={e => this.setState({ teacher5: e.target.value })}>
            <option value=''>Novo Professor</option>
            {listTeachers.map((item) => <option value={item.userName}>{item.userName}</option>)}
          </select>
          <DatePicker onchange={(e) => this.setState({ date: e.target.value })} value={this.state.date}></DatePicker>
        </Grid>
      </Grid >
    );
  }
}

file.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(file);
