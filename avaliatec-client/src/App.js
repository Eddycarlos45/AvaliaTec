import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import theme from './pages/theme';
import file from './pages/file';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/" component={login} />
              <Route exact path="/home" component={home} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/theme" component={theme} />
              <Route exact path="/file" component={file} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
