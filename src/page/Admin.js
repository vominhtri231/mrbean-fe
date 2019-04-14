import React from 'react';
import CustomDrawer from "../component/common/Drawer"
import ClassContent from "../component/admin/class/ClassPage";
import UserPage from "../component/admin/user/UserPage";

class Admin extends React.Component {
  render() {
    return (<CustomDrawer pageName={"Administrator page"}
                          features={[
                            {
                              name: "Class manager",
                              path: "/admin/class",
                              icon: "class",
                              content: ClassContent
                            },
                            {
                              name: "User manager",
                              path: "/admin/user",
                              icon: "supervised_user_circle",
                              content: UserPage
                            }
                          ]}
                          {...this.props}
    />)
  }
}

export default Admin
