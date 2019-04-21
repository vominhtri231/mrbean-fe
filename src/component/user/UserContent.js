import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import UserApi from "../../api/UserApi";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add"
import withStyles from "@material-ui/core/styles/withStyles";
import UserListItem from "./UserListItem";
import AddUserForm from "./AddUserForm";
import AdminApi from "../../api/AdminApi";
import TeacherApi from "../../api/TeacherApi";
import StudentApi from "../../api/StudentApi";
import UserPageSearchBar from "./UserPageSearchBar";

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
  };

  handleOpenForm = () => {
    this.setState({openAddUserForm: true});
  };

  handleCloseForm = () => {
    this.setState({openAddUserForm: false});
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
      case 1:
        AdminApi.createAdmin(email, name)
          .then(addUserCallback);
        break;
      case 2:
        TeacherApi.createTeacher(email, name, phoneNumber, dateOfBirth)
          .then(addUserCallback);
        break;
      default:
        StudentApi.createTeacher(email, name, phoneNumber, dateOfBirth, workspace, isWorker)
          .then(addUserCallback);
        break;
    }
  };

  deleteUser = (id) => {
    //TODO:create delete api
  };

  componentDidMount() {
    this.getUsers();
  };

  render() {
    const {classes} = this.props;
    const {users, openAddUserForm} = this.state;
    return <div>
      <UserPageSearchBar
        searchPlaceHolder={'Search by email'}
        onSearch={this.search}/>
      <div className={classes.contentWrapper}>
        {this.renderUsers(users)}
      </div>
      <Fab className={classes.fab} color='primary' onClick={this.handleOpenForm}>
        <AddIcon/>
      </Fab>
      <AddUserForm open={openAddUserForm}
                   handleClose={this.handleCloseForm}
                   handleSubmit={this.createUser}/>
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
            <UserListItem key={user.id} user={user} onDelete={this.deleteUser}/>
          ))
        }
      </List>
    )
  }

}

export default withStyles(styles)(UserContent);