import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

//Pages
import home from './pages/home';
import users from './pages/users';
import signin from './pages/signin'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/" component={signin} />
              <Route exact path="/home" component={home} />
              <Route exact path="/users" component={users}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
