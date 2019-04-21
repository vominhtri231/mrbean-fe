import React from 'react';
import CustomDrawer from "../component/common/CustomDrawer"
import ClassContent from "../component/klass/ClassContent";
import UserContent from "../component/user/UserContent";

class Admin extends React.Component {

  render() {
    return (<CustomDrawer pageName={"Administrator page"}
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
                          {...this.props}
    />)
  }
}

export default Admin
