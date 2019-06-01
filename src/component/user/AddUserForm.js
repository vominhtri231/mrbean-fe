import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import {FormControl} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import appConstants from "../../util/appConstants";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class AddUserForm extends React.Component {
  state = {
    role: appConstants.roles.Admin,
    email: "",
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    workspace: "",
    isWorker: false,
    error: undefined,
  };

  handleSubmitButtonClick = () => {
    const {role, email, name, phoneNumber, dateOfBirth, workspace, isWorker} = this.state;
    const {handleClose, handleSubmit} = this.props;
    const validateResult = Validater.validateUser(role, email, name, phoneNumber, workspace);
    if (validateResult) {
      this.setState({error: validateResult});
      return;
    }
    this.setState({
      role: appConstants.roles.Admin,
      email: "",
      name: "",
      phoneNumber: "",
      dateOfBirth: "",
      workspace: "",
      isWorker: false,
      error: undefined,
    });
    handleSubmit(role, email, name, phoneNumber, dateOfBirth, workspace, isWorker);
    handleClose();
  };

  handleRoleChange = (event) => {
    this.setState({role: event.target.value});
  };

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleDateChange = (event) => {
    this.setState({dateOfBirth: event.target.value});
  };

  handlePhoneNumberChange = (event) => {
    this.setState({phoneNumber: event.target.value})
  };

  handleWorkerChange = (event) => {
    this.setState({isWorker: event.target.checked})
  };

  handleWorkspaceChange = (event) => {
    this.setState({workspace: event.target.value})
  };

  render() {
    const {open, handleClose} = this.props;
    const {role, error} = this.state;
    const roles = [
      appConstants.roles.Admin,
      appConstants.roles.Teacher,
      appConstants.roles.Student];
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Create new user</DialogTitle>
      <DialogContent>
        <FormControl style={{
          minWidth: 120,
        }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={this.handleRoleChange}
          >
            {roles.map(role =>
              <MenuItem value={role} key={role.id}>
                <em>{role.authority}</em>
              </MenuItem>
            )}
          </Select>
        </FormControl>
        {this.renderSpecificRoleForm(role)}
      </DialogContent>
      <DialogActions>
        <FormError errorMessage={error}/>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Create new
        </Button>
      </DialogActions>
    </Dialog>
  }

  renderSpecificRoleForm(role) {
    switch (role.id) {
      case 1:
        return this.renderAdminForm();
      case 2:
        return this.renderTeacherForm();
      default :
        return this.renderStudentForm();
    }
  }

  renderAdminForm() {
    return <>
      <TextField
        autoFocus
        margin="dense"
        id="email"
        label="Email"
        onChange={this.handleEmailChange}
        fullWidth
      />
      <TextField
        margin="dense"
        id="name"
        onChange={this.handleNameChange}
        label="Name"
        fullWidth
      />
    </>;
  }

  renderTeacherForm() {
    return <>
      {this.renderAdminForm()}
      <TextField
        onChange={this.handleDateChange}
        label="Day of Birth"
        type="date"
        id="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        margin="dense"
        type="number"
        id="phoneNumber"
        onChange={this.handlePhoneNumberChange}
        label="Phone number"
        fullWidth
      />
    </>;
  }

  renderStudentForm() {
    return <>
      {this.renderTeacherForm()}
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.isWorker}
            onChange={this.handleWorkerChange}
          />
        }
        label="worker "
      />
      <TextField
        style={{marginTop: 0}}
        margin="dense"
        type="text"
        id="workspace"
        onChange={this.handleWorkspaceChange}
        label="Workspace "
        fullWidth
      />
    </>;
  }
}

export default AddUserForm;