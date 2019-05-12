import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./page/Login"
import Admin from "./page/Admin"
import Teacher from "./page/Teacher"
import Student from "./page/Student"
import Klass from "./page/Klass";
import UserProfileApi from "./api/UserProfileApi";
import appConstants from "./util/appConstants";
import LocalStorageManager from "./util/LocalStorageManager";
import AdminApi from "./api/AdminApi";
import TeacherApi from "./api/TeacherApi";
import StudentApi from "./api/StudentApi";
import {Redirect} from "react-router";
import Home from "./page/Home";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      accessToken: "",
    }
  }

  async componentDidMount() {
    try {
      await this.initUser();
    } catch (e) {
      LocalStorageManager.clearAccessToken();
      this.setState({user: undefined, accessToken: ""});
    }
  }

  render() {
    const {user} = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" exact
                 render={(props) => <Login
                   {...props}
                   initUser={this.initUser}/>}/>
          <Route path="/class/:klassId" exact
                 render={(props) => <Klass
                   user={user} {...props}
                   editUser={this.editUser}
                   logout={this.logout}/>}/>
          <Route path="/admin" exact
                 render={(props) => <Admin
                   user={user} {...props}
                   editUser={this.editUser}
                   logout={this.logout}/>}/>
          <Route path="/teacher" exact
                 render={(props) => <Teacher
                   user={user} {...props}
                   editUser={this.editUser}
                   logout={this.logout}/>}/>
          <Route path="/student" exact
                 render={(props) => <Student
                   user={user} {...props}
                   editUser={this.editUser}
                   logout={this.logout}/>}/>
          <Route path="*" exact
                 render={() => App.forwarder(user)}/>
        </Switch>
      </BrowserRouter>
    );
  }

  static forwarder(user) {
    const defaultPath = App.getDefaultPath(user);
    if (!defaultPath) return <></>;
    return <Redirect to={defaultPath}/>
  };

  initUser = async () => {
    const response = await UserProfileApi.getCurrentProfile();
    const user = response.data;
    const accessToken = LocalStorageManager.getAccessToken();
    this.setState({user, accessToken});
  };

  logout = () => {
    LocalStorageManager.clearAccessToken();
  };

  editUser = (role, id, email, name, phoneNumber, dateOfBirth, workspace, isWorker) => {
    const updateUserCallback = response => {
      const updatedUser = response.data;
      this.setState({user: updatedUser});
    };
    switch (role.id) {
      case appConstants.roles.Admin.id:
        AdminApi.updateAdmin(id, email, name)
          .then(updateUserCallback);
        break;
      case appConstants.roles.Teacher.id:
        TeacherApi.updateTeacher(id, email, name, phoneNumber, dateOfBirth)
          .then(updateUserCallback);
        break;
      default:
        StudentApi.updateStudent(id, email, name, phoneNumber, dateOfBirth, workspace, isWorker)
          .then(updateUserCallback);
        break;
    }
  };

  static getDefaultPath(user) {
    if (!user) return "/login";
    if (App.isEmpty(user)) return undefined;
    switch (user.role.id) {
      case appConstants.roles.Admin.id:
        return "/admin";
      case appConstants.roles.Teacher.id:
        return `/teacher`;
      case appConstants.roles.Student.id:
        return `/student`;
      default :
        return "/login";
    }
  };

  static isEmpty(user) {
    return !Object.keys(user).length;
  }
}

export default App
