import React from 'react';
import CustomDrawer from "../component/common/CustomDrawer"
import StudentContent from "../component/student/StudentContent";
import ClassApi from "../api/ClassApi";
import {Typography} from "@material-ui/core";
import LessonContent from "../component/lesson/LessonContent";
import appConstants from "../util/appConstants";

class Klass extends React.Component {
  state = {
    klass: undefined,
    mode: appConstants.modes.Teacher,
  };

  async getClass(klassId) {
    try {
      const response = await ClassApi.getClass(klassId);
      return response.data;
    } catch (e) {

    }
  }

  async componentDidMount() {
    const klassId = this.props.match.params.klassId;
    const klass = await this.getClass(klassId);
    this.setState({klass})
  }

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      if (this.props.user.role.id === appConstants.roles.Student.id) {
        this.props.history.push("/student");
      }
      switch (this.props.user.role.id) {
        case appConstants.roles.Student.id:
          this.props.history.push("/student");
          return;
        case appConstants.roles.Admin:
          this.setState({mode: appConstants.modes.Teacher});
          return;
        case appConstants.roles.Teacher:
          const pathKlassId = this.props.match.params.klassId;
          const klasses = await ClassApi.getClassesOfTeacher();
          const klassIds = klasses.map(klass => klass.id);
          if (!klassIds.some(klassId => klassId === pathKlassId)) {
            this.props.history.push("/teacher");
          }
          return;
        default:
          this.props.history.push("/login");
      }
    }
  }

  render() {
    const {klass, mode} = this.state;
    const {user, editUser, logout} = this.props;
    return (klass ?
      <CustomDrawer
        pageName={`Class  ${klass.name}`}
        user={user}
        editUser={editUser}
        logout={logout}
        features={[
          {
            name: "Lessons of class",
            path: "/student",
            icon: "assessment",
            content: <LessonContent
              mode={mode}
              klass={klass}/>
          },
          {
            name: "Students of class",
            path: "/student",
            icon: "supervised_user_circle",
            content: <StudentContent
              mode={mode}
              klass={klass}/>
          },
        ]}
        {...this.props}
      /> :
      <>
        <Typography color="textSecondary" align="center">There no class </Typography>
      </>)
  }
}

export default Klass
