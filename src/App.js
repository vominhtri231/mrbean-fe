import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./page/Login"
import Admin from "./page/Admin"
import Teacher from "./page/Teacher"
import Student from "./page/Student"
import './App.css';
import Klass from "./page/Klass";
import ContentEditor from "./component/common/ContentEditor";


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
          <Route path="/class/:klassId" component={Klass}/>
          <Route path="/teacher/:teacherId" component={Teacher}/>
          <Route path="/student/:studentId" component={Student}/>
        </Switch>
      </BrowserRouter>
    );
  }

  wrongRole() {
    return this.state.role !== this.state.wantedRole;
  }
}

export default App
