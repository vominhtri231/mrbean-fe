import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

import appConstants from "./util/appConstants"
import Login from "./page/Login"
import Admin from "./page/Admin"
import Teacher from "./page/Teacher"
import Student from "./page/Student"
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      role: "",
      wantedRole: ""
    }
  }

  componentDidMount() {
    //update role and wantedRole here
  }

  render() {
    // if (this.wrongRole()) {
    //   return <Redirect to={this.state.role}/>
    // }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/teacher" component={Teacher}/>
          <Route path="/student" component={Student}/>
        </Switch>
      </BrowserRouter>
    );
  }

  wrongRole() {
    return this.state.role !== this.state.wantedRole;
  }
}

export default App
