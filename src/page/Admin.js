import React from 'react';
import CustomDrawer from "../component/common/CustomDrawer"
import ClassContent from "../component/klass/ClassContent";
import UserContent from "../component/user/UserContent";
import App from "../App"

class Admin extends React.Component {
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      const defaultPath = App.getDefaultPath(this.props.user);
      if (!!defaultPath && defaultPath !== "/admin") {
        this.props.history.push(defaultPath);
      }
    }
  }

  render() {
    const {user, editUser,logout} = this.props;
    return (user&&!App.isEmpty(user) ?
      <CustomDrawer
        pageName={"Administrator page"}
        user={user}
        logout={logout}
        editUser={editUser}
        features={[
          {
            name: "Class manager",
            path: "/admin/class",
            icon: "class",
            content: <ClassContent {...this.props}/>
          },
          {
            name: "User manager",
            path: "/admin/user",
            icon: "supervised_user_circle",
            content: <UserContent/>
          }
        ]}
        {...this.props}/> :
      <></>)
  }
}

export default Admin
