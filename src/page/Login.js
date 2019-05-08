import React from 'react';
import LoginDialog from "../component/login/LoginDialog";
import OauthApi from "../api/OauthApi";
import LocalStorageManager from "../util/LocalStorageManager";
import {Redirect} from "react-router";

class Login extends React.Component {
  state = {
    error: undefined,
    loginSuccess: undefined,
  };

  handleLogin = async (email, password) => {
    try {
      const response = await OauthApi.login(email, password);
      const {initUser} = this.props;
      const token = response.data;
      const access_token = token.access_token;
      LocalStorageManager.setAccessToken(access_token);
      await initUser();
      this.setState({loginSuccess: true})
    } catch (e) {
      this.setState({error: "Username or password is incorrect"})
    }
  };

  render() {
    const {error, loginSuccess} = this.state;
    if (!!loginSuccess || !!LocalStorageManager.getAccessToken()) {
      return <Redirect to={"/forwarder"}/>
    }
    return (<div>
      <LoginDialog handleSubmit={this.handleLogin} error={error}/>
    </div>)
  }
}

export default Login
