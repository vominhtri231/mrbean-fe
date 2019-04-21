import React from 'react';
import CustomDrawer from "../component/common/CustomDrawer"
import StudentContent from "../component/student/StudentContent";
import ClassApi from "../api/ClassApi";
import {Typography} from "@material-ui/core";
import LessonContent from "../component/lesson/LessonContent";

class Klass extends React.Component {
  state = {
    klass: undefined
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

  render() {
    const {klass} = this.state;
    return (klass ?
      <CustomDrawer pageName={`Class  ${klass.name}`}
                    features={[
                      {
                        name: "Lessons of class",
                        path: "/student",
                        icon: "assessment",
                        content: <LessonContent klass={klass}/>
                      },
                      {
                        name: "Students of class",
                        path: "/student",
                        icon: "supervised_user_circle",
                        content: <StudentContent klass={klass}/>
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
