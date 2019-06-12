import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import appConstants from "../../util/appConstants";
import AdminApi from "../../api/AdminApi";
import TeacherApi from "../../api/TeacherApi";
import StudentApi from "../../api/StudentApi";
import DateUtils from "../../util/DateUtils";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class EditUserForm extends React.Component {
  state = {
    email: "",
    name: "",
    phoneNumber: "",
    dateOfBirth: DateUtils.getCurrentDate(),
    workspace: "",
    isWorker: false,
  };

  handleSubmitButtonClick = () => {
    const {email, name, phoneNumber, dateOfBirth, workspace, isWorker} = this.state;
    const {user, handleClose, handleSubmit} = this.props;
    // const validateResult = Validater.validateUser(user.role, email, name, phoneNumber, workspace);
    // if (validateResult) {
    //   this.setState({error: validateResult});
    //   return;
    // }
    this.setState({
      error: undefined,
    });
    handleSubmit(user.role, user.id, email, name, phoneNumber, dateOfBirth, workspace, isWorker);
    handleClose();
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

  async componentDidMount() {
    await this.init();
  }

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.user) !== JSON.stringify(prevProps.user) && this.props.user) {
      await this.init();
    }
  }

  async init() {
    const user = this.props.user;
    if (!user) return;
    const response = await EditUserForm.getFullUserInfo(user);
    const fullUser = response.data;
    this.setState({
      email: fullUser.email,
      name: fullUser.name,
      phoneNumber: fullUser.phoneNumber ? fullUser.phoneNumber : this.state.phoneNumber,
      dateOfBirth: fullUser.dateOfBirth ? fullUser.dateOfBirth : this.state.dateOfBirth,
      workspace: fullUser.workspace ? fullUser.workspace : this.state.workspace,
      isWorker: fullUser.isWorker ? fullUser.isWorker : this.state.isWorker,
    })
  }

  static async getFullUserInfo(user) {
    switch (user.role.id) {
      case appConstants.roles.Admin.id:
        return AdminApi.getAdmin(user.id);
      case appConstants.roles.Teacher.id:
        return TeacherApi.getTeacher(user.id);
      default :
        return StudentApi.getStudent(user.id);
    }
  }

  render() {
    const {open, handleClose} = this.props;
    const {error} = this.state;
    const user = this.props.user;
    if (!user) return <></>;
    const role = user.role;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Role"
          value={role.authority}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        {this.renderSpecificRoleForm(role)}
      </DialogContent>
      <DialogActions>
        <FormError errorMessage={error}/>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  }

  renderSpecificRoleForm(role) {
    switch (role.id) {
      case appConstants.roles.Admin.id:
        return this.renderAdminForm();
      case appConstants.roles.Teacher.id:
        return this.renderTeacherForm();
      default :
        return this.renderStudentForm();
    }
  }

  renderAdminForm() {
    const {email, name} = this.state;
    return <>
      <TextField
        margin="dense"
        label="Email"
        value={email}
        onChange={this.handleEmailChange}
        fullWidth
      />
      <TextField
        margin="dense"
        value={name}
        onChange={this.handleNameChange}
        label="Name"
        fullWidth
      />
    </>;
  }

  renderTeacherForm() {
    const {dateOfBirth, phoneNumber} = this.state;
    return <>
      {this.renderAdminForm()}
      <TextField
        onChange={this.handleDateChange}
        label="Day of Birth"
        type="date"
        value={dateOfBirth}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        type="number"
        value={phoneNumber}
        onChange={this.handlePhoneNumberChange}
        label="Phone number"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>;
  }

  renderStudentForm() {
    const {isWorker, workspace} = this.state;
    return <>
      {this.renderTeacherForm()}
      <FormControlLabel
        control={
          <Checkbox
            checked={!!isWorker}
            onChange={this.handleWorkerChange}
          />
        }
        label="worker"
      />
      <TextField
        style={{marginTop: 0}}
        margin="dense"
        type="text"
        value={workspace}
        onChange={this.handleWorkspaceChange}
        label="Workspace"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>;
  }
}

export default EditUserForm;