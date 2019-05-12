import React from 'react';
import ClassApi from "../api/ClassApi";
import {Button, Typography} from "@material-ui/core";
import LessonContent from "../component/lesson/LessonContent";
import CustomDrawer from "../component/common/CustomDrawer";
import ChooseClassForm from "../component/common/ChooseClassForm";
import appConstants from "../util/appConstants";
import App from "../App";

class Student extends React.Component {
  state = {
    klasses: [],
    selectedKlass: undefined,
    openChangeKlass: false,
  };

  handleChangeClassOpen = () => {
    this.setState({openChangeKlass: true})
  };

  handleChangeClassClose = () => {
    this.setState({openChangeKlass: false})
  };

  changeClass = (klassId) => {
    const {klasses} = this.state;
    const newSelectedKlass = klasses.filter(klass => klass.id.toString() === klassId);
    this.setState({selectedKlass: newSelectedKlass[0]})
  };

  async getClassesOfStudent(studentId) {
    try {
      const response = await ClassApi.getClassesOfStudent(studentId);
      return response.data;
    } catch (e) {

    }
  }

  async componentDidMount() {
    const studentId = this.props.user.id;
    const klasses = await this.getClassesOfStudent(studentId);
    const selectedKlass = klasses.length > 0 ? klasses[0] : undefined;
    this.setState({klasses, selectedKlass})
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      const defaultPath = App.getDefaultPath(this.props.user);
      if (!!defaultPath && defaultPath !== "/student") {
        this.props.history.push(defaultPath);
      }
    }
  }

  render() {
    const {user, editUser, logout} = this.props;
    const {klasses, openChangeKlass, selectedKlass} = this.state;
    return (selectedKlass && user && !App.isEmpty(user) ?
      <>
        <CustomDrawer
          pageName={`${selectedKlass.name}`}
          user={user}
          editUser={editUser}
          logout={logout}
          features={[
            {
              name: "Lessons of class",
              path: "/student",
              icon: "assessment",
              content: <LessonContent
                klass={selectedKlass}
                mode={appConstants.modes.Student}
                studentId={user.id}/>
            },
          ]}
          {...this.props}
        >
          <Button
            style={{marginLeft: 30}}
            variant="contained" color="secondary"
            onClick={this.handleChangeClassOpen}>
            Change class
          </Button>
        </CustomDrawer>
        <ChooseClassForm
          open={openChangeKlass}
          handleClose={this.handleChangeClassClose}
          klasses={klasses}
          handleSubmit={this.changeClass}
        />
      </> :
      <>
        <Typography color="textSecondary" align="center">There are no classes </Typography>
      </>)
  }
}

export default Student
