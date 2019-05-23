import React from 'react';
import CustomDrawer from "../component/common/CustomDrawer"
import ClassContent from "../component/klass/ClassContent";
import UserContent from "../component/user/UserContent";
import App from "../App"
import MistakeTypeContent from "../component/mistakeType/MistakeTypeContent";

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
    const {user, editUser, logout} = this.props;
    return (user && !App.isEmpty(user) ?
      <CustomDrawer
        user={user}
        logout={logout}
        editUser={editUser}
        features={[
          {
            name: "Classes",
            icon: "class",
            content: <ClassContent {...this.props}/>
          },
          {
            name: "Users",
            icon: "supervised_user_circle",
            content: <UserContent/>
          },
          {
            name: "Mistake types",
            icon: "warning",
            content: <MistakeTypeContent/>
          }
        ]}
        {...this.props}/> :
      <></>)
  }
}

export default Admin
