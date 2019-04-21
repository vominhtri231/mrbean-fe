import React from 'react';
import CustomDrawer from "../component/common/CustomDrawer"
import ClassContent from "../component/klass/ClassContent";

class Teacher extends React.Component {

  render() {
    const teacherId = this.props.match.params.teacherId;
    return (<CustomDrawer pageName={"Teacher page"}
                          features={[
                            {
                              name: "Class manager",
                              path: "/admin/class",
                              icon: "class",
                              content: <ClassContent teacherId={teacherId}/>
                            },
                          ]}
                          {...this.props}/>
    )
  }
}

export default Teacher
