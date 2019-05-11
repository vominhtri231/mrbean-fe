import React from 'react';
import CustomDrawer from "../component/common/CustomDrawer"
import ClassContent from "../component/klass/ClassContent";
import App from "../App";
import TemplateContent from "../component/template/TemplateContent";

class Teacher extends React.Component {
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      const defaultPath = App.getDefaultPath(this.props.user);
      if (!!defaultPath && defaultPath !== "/teacher") {
        this.props.history.push(defaultPath);
      }
    }
  }

  render() {
    const {user, editUser, logout} = this.props;
    return (!App.isEmpty(user) ?
        <CustomDrawer
          user={user}
          editUser={editUser}
          logout={logout}
          features={[
            {
              name: "Class manager",
              icon: "class",
              content: <ClassContent teacherId={user.id} {...this.props}/>
            },
            {
              name:"Templates",
              icon:"bookmarks",
              content:<TemplateContent {...this.props}/>
            }
          ]}
          {...this.props}/> : <></>
    )
  }
}

export default Teacher
