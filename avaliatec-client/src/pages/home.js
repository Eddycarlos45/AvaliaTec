import React, { Component } from 'react'

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

//Components
import Navbar from '../components/Navbar'
import Card from '../components/Card'


const styles = {
    form: {
        textAlign: 'center'
    }
};

export class home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Navbar />
                <Grid container className={classes.form}>
                    <Grid item sm>
                        <Card title='TEMAS'></Card>
                    </Grid>
                    <Grid item sm>
                        <Card title='AVALIAÇÃO'></Card>
                    </Grid>
                    <Grid item sm>
                        <Card title='FICHAS'></Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(home);
