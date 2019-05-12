import React from "react";
import UserApi from "../../api/UserApi";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add"
import UserListItem from "./UserListItem";
import AddUserForm from "./AddUserForm";
import AdminApi from "../../api/AdminApi";
import TeacherApi from "../../api/TeacherApi";
import StudentApi from "../../api/StudentApi";
import UserPageSearchBar from "./UserPageSearchBar";
import ConfirmDialog from "../common/ConfirmDialog";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Announce from "../common/Annouce";
import EditUserForm from "./EditUserForm";
import withStyles from "@material-ui/core/styles/withStyles";
import appConstants from "../../util/appConstants";

const styles = {
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
  contentWrapper: {
    margin: '10px 8px',
  },
  list: {
    width: '100%',
  },
};

class UserContent extends React.Component {
  state = {
    users: [],
    openAddUserForm: false,
    deletingUser: undefined,
    editingUser: undefined,
    announce: undefined,
  };

  handleOpenAddUserForm = () => {
    this.setState({openAddUserForm: true});
  };

  handleCloseAddUserForm = () => {
    this.setState({openAddUserForm: false});
  };

  handleOpenDeleteUserDialog = (user) => {
    this.setState({deletingUser: user});
  };

  handleCloseDeleteUserDialog = () => {
    this.setState({deletingUser: undefined});
  };

  handleOpenEditUserDialog = (user) => {
    this.setState({editingUser: user});
  };

  handleCloseEditUserDialog = () => {
    this.setState({editingUser: undefined});
  };

  handleCloseAnnounce = () => {
    this.setState({announce: undefined});
  };

  search = (keyword, roles) => {
    const {users} = this.state;
    const searchedUsers = users.map(user => {
      user.hide = !this.contain(user, keyword) || !this.hasRole(user, roles);
      return user
    });
    this.setState({users: searchedUsers});
  };

  contain = (user, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return user.email.toLowerCase().includes(lowerKeyword);
  };

  hasRole = (user, roles) => {
    return roles.some(role => user.role.id === role.id);
  };

  getUsers = () => {
    UserApi.getUser().then(response => {
      this.setState({users: response.data})
    });
  };

  createUser = (role, email, name, phoneNumber, dateOfBirth, workspace, isWorker) => {
    const addUserCallback = response => {
      const {users} = this.state;
      const addedUsers = users.concat(response.data);
      this.setState({users: addedUsers});
    };
    switch (role.id) {
      case appConstants.roles.Admin.id:
        AdminApi.createAdmin(email, name)
          .then(addUserCallback);
        break;
      case appConstants.roles.Teacher.id:
        TeacherApi.createTeacher(email, name, phoneNumber, dateOfBirth)
          .then(addUserCallback);
        break;
      default:
        StudentApi.createStudent(email, name, phoneNumber, dateOfBirth, workspace, isWorker)
          .then(addUserCallback);
        break;
    }
  };

  editUser = (role, id, email, name, phoneNumber, dateOfBirth, workspace, isWorker) => {
    const updateUserCallback = response => {
      const {users} = this.state;
      const updatedUser = response.data;
      const updatedUsers = users.map(user => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });
      this.setState({users: updatedUsers});
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

  deleteUser = async (id) => {
    try {
      await UserApi.deleteUser(id);
      const {users} = this.state;
      const deletedUsers = users.filter(user => user.id !== id);
      const deleteSuccessAnnounce = {message: "Delete successfully", variant: "success"};
      this.setState({users: deletedUsers, announce: deleteSuccessAnnounce})
    } catch (e) {
      const deleteStudentErrorAnnounce = {message: "Student is in some class", variant: "error"};
      this.setState({announce: deleteStudentErrorAnnounce})
    }
  };

  componentDidMount() {
    this.getUsers();
  };

  render() {
    const {classes} = this.props;
    const {
      users, openAddUserForm, deletingUser,
      announce, editingUser
    } = this.state;
    return <div>
      <UserPageSearchBar
        searchPlaceHolder={'Search by email'}
        onSearch={this.search} onReload={this.getUsers}/>
      <div className={classes.contentWrapper}>
        {this.renderUsers(users)}
      </div>
      <Fab className={classes.fab} color='primary' onClick={this.handleOpenAddUserForm}>
        <AddIcon/>
      </Fab>
      <AddUserForm open={openAddUserForm}
                   handleClose={this.handleCloseAddUserForm}
                   handleSubmit={this.createUser}/>
      <EditUserForm open={!!editingUser}
                    user={editingUser}
                    handleClose={this.handleCloseEditUserDialog}
                    handleSubmit={this.editUser}/>
      {!!announce && <Announce
        message={announce.message} variant={announce.variant}
        onClose={this.handleCloseAnnounce} open
      />}
      {!!deletingUser && <ConfirmDialog
        open={!!deletingUser}
        title={`Do you want to delete user with email : ${deletingUser.email}`}
        handleSubmit={() => this.deleteUser(deletingUser.id)}
        handleClose={this.handleCloseDeleteUserDialog}
      />}
    </div>
  }

  renderUsers = (users) => {
    if (users.every(user => user.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          No users yet
        </Typography>
      )
    }
    return (
      <List>
        {
          users.filter(user => !user.hide).map(user => (
            <UserListItem key={user.id} user={user}
                          onDelete={this.handleOpenDeleteUserDialog}
                          onEdit={this.handleOpenEditUserDialog}/>
          ))
        }
      </List>
    )
  }

}

export default withStyles(styles)(UserContent);