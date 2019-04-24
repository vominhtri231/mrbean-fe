import React from 'react';
import ClassApi from "../api/ClassApi";
import {Typography} from "@material-ui/core";
import LessonContent from "../component/lesson/LessonContent";
import CustomDrawer from "../component/common/CustomDrawer";
import IconButton from "@material-ui/core/IconButton";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory"
import ChooseClassForm from "../component/common/ChooseClassForm";

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
    const studentId = this.props.match.params.studentId;
    const klasses = await this.getClassesOfStudent(studentId);
    const selectedKlass = klasses.length > 0 ? klasses[0] : undefined;
    this.setState({klasses, selectedKlass})
  }

  render() {
    const {klasses, openChangeKlass, selectedKlass} = this.state;
    return (selectedKlass ?
      <>
        <CustomDrawer pageName={`${selectedKlass.name}`}
                      features={[
                        {
                          name: "Lessons of class",
                          path: "/student",
                          icon: "assessment",
                          content: <LessonContent klass={selectedKlass} watchMode/>
                        },
                      ]}
                      {...this.props}
        >
          <IconButton
            color="inherit"
            onClick={this.handleChangeClassOpen}
          >
            <ChangeHistoryIcon/>
          </IconButton>
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
