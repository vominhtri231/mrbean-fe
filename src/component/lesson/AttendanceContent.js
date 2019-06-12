import React from "react";
import KlassStudentApi from "../../api/KlassStudentApi";
import LessonApi from "../../api/LessonApi";
import LessonAttendanceApi from "../../api/LessonAttendanceApi";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

class AttendanceContent extends React.Component {
  state = {
    students: [],
    lessons: [],
    lessonAttendances: [],
  };

  componentDidMount() {
    const {klass} = this.props;
    this.init(klass);
  };

  init = (klass) => {
    KlassStudentApi.getStudentsOfKlass(klass.id).then(response => {
      this.setState({students: response.data});
    });
    LessonApi.getAllOfClass(klass.id).then(response => {
      this.setState({lessons: response.data});
    });
    LessonAttendanceApi.getAllOfKlass(klass.id).then(response => {
      this.setState({lessonAttendances: response.data});
    })
  };

  render() {
    const {lessons, students, lessonAttendances} = this.state;
    const lessonAttendanceMap = lessonAttendances.reduce((map, current) => {
      map[this.getStudentLessonKey(current)] = current.attend;
      return map;
    }, {});

    console.log(lessonAttendanceMap);
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {lessons.map(lesson => <TableCell key={lesson.id}>
                {lesson.lessonNumber}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => <TableRow key={student.id}>
            <TableCell key={student.id}>
              {student.name}
            </TableCell>
            {lessons.map(lesson => <TableCell key={lesson.id}>
                <div>
                  {this.renderAttendanceStatus(
                    lessonAttendanceMap[student.id + "-" + lesson.id])}
                </div>
              </TableCell>
            )}
          </TableRow>)}
        </TableBody>
      </Table>
    );
  }

  getStudentLessonKey = (lessonAttendance) => {
    return lessonAttendance.student.id + "-" + lessonAttendance.lesson.id;
  };

  renderAttendanceStatus = (status) => {
    const backgroundColor = status === undefined ? "white" : status ? "blue" : "red";
    return <div style={{
      height: '40px',
      width: '40px',
      backgroundColor: backgroundColor
    }}>
    </div>
  }
}

export default AttendanceContent;
