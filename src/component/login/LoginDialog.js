import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class LoginDialog extends React.Component {
  state = {
    email: "",
    password: "",
    validateError: undefined,
  };

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  };

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit} = this.props;
    const {email, password} = this.state;
    const validateResult = Validater.validateLogin(email, password);
    if (validateResult) {
      this.setState({validateError: validateResult,});
      return;
    }
    handleSubmit(email, password);
  };

  render() {
    const {error} = this.props;
    const {validateError} = this.state;
    return <Dialog open>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            onChange={this.handleEmailChange}
            placeholder="email"
            fullWidth
          />
          <TextField
            margin="dense"
            onChange={this.handlePasswordChange}
            placeholder="password"
            label="Password"
            type={"password"}
            fullWidth
          />
        </form>
        <Typography style={{color: '#d6194b'}}>{error}</Typography>
      </DialogContent>
      <DialogActions>
        <FormError errorMessage={validateError}/>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default LoginDialog;