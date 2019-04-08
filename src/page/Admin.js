import React from 'react';
import CustomDrawer from "../component/common/Drawer"
import ClassContent from "../component/admin/class/ClassContent";
import UserContent from "../component/admin/UserContent";

class Admin extends React.Component {
  render() {
    return (<CustomDrawer pageName={"Administrator page"}
                          features={[
                            {
                              name: "Class manager",
                              icon: "class",
                              content: ClassContent
                            },
                            {
                              name: "User manager",
                              icon: "supervised_user_circle",
                              content: UserContent
                            }
                          ]}
    />)
  }
}

export default Admin
