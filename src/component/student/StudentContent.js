import * as React from "react";
import SearchBar from "../common/SearchBar";
import PaginationTable from "../common/table/PaginationTable";
import StudentDataRow from "./StudentDataRow";
import Typography from "@material-ui/core/Typography";
import ConfirmDialog from "../common/ConfirmDialog";
import appConstants from "../../util/appConstants";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddStudentToClassForm from "./AddStudentToClassForm";
import Announce from "../common/Annouce";
import KlassStudentApi from "../../api/KlassStudentApi";
import StudentApi from "../../api/StudentApi";

class StudentContent extends React.Component {
  state = {
    students: [],
    notInKlassStudent: [],
    addStudent: false,
    removingStudent: undefined,
    announce: undefined,
  };

  handleOpenRemoveFromClassDialog = (student) => {
    this.setState({removingStudent: student})
  };

  handleCloseRemoveFormClassDialog = () => {
    this.setState({removingStudent: undefined});
  };

  handleOpenAddForm = () => {
    this.setState({addStudent: true});
  };

  handleCloseAddForm = () => {
    this.setState({addStudent: false});
  };

  handleCloseAnnounce = () => {
    this.setState({announce: undefined});
  };

  removeFromClass = (studentId) => {
    const {klass} = this.props;
    KlassStudentApi.unregisterStudents(klass.id, [studentId]).then(() => {
      const {students, notInKlassStudent} = this.state;
      const removedStudents = students.filter(student => student.id !== parseInt(studentId));
      const removingStudent = students.filter(student => student.id === parseInt(studentId));
      const addedNotInKlassStudents = notInKlassStudent.concat(removingStudent);
      const successAnnounce = {message: "Remove student successfully", variant: "success"};
      this.setState({
        students: removedStudents,
        announce: successAnnounce,
        notInKlassStudent: addedNotInKlassStudents
      });
    }).catch(response => {
      const errorAnnounce = {message: "Remove student fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  addToClass = (students) => {
    const {klass} = this.props;
    const addingStudentsId = students.map(student => student.id);
    KlassStudentApi.registerStudents(klass.id, addingStudentsId).then(() => {
      const successAnnounce = {message: "Add student successfully", variant: "success"};
      this.setState({announce: successAnnounce});
      this.init();
    }).catch(response => {
      const errorAnnounce = {message: "Add student fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    });
  };

  search = (keyword) => {
    const {students} = this.state;
    const searchedStudent = students.map(student => {
      student.hide = !this.contain(student, keyword);
      return student
    });
    this.setState({lessons: searchedStudent});
  };

  contain = (student, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return student.name.toLowerCase().includes(lowerKeyword)
      || student.email.toLowerCase().includes(lowerKeyword)
      || student.dateOfBirth.toLowerCase().includes(lowerKeyword)
      || (student.phoneNumber && student.phoneNumber.toLowerCase().includes(lowerKeyword))
      || (student.workspace && student.workspace.toLowerCase().includes(lowerKeyword));
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    const {klass} = this.props;
    const studentResponse = await KlassStudentApi.getStudentsOfKlass(klass.id);
    const allStudentResponse = await StudentApi.getAll(klass.id);
    const students = studentResponse.data;
    const allStudents = allStudentResponse.data;
    const notInKlassStudent = allStudents
      .filter(allStudent => students.every(student => student.id !== allStudent.id));
    this.setState({students, notInKlassStudent});
  };

  render() {
    const {students, announce} = this.state;
    const {mode} = this.props;
    return <div>
      <SearchBar searchPlaceHolder={"Search by name "}
                 onSearch={this.search} onReload={this.init}/>
      <div>
        {this.renderStudents(students)}
      </div>
      {mode === appConstants.modes.Admin ? this.renderAdminGadgets() : <></>}
      {!!announce && <Announce
        message={announce.message} variant={announce.variant}
        onClose={this.handleCloseAnnounce} open
      />}
    </div>
  }

  renderStudents(students) {
    const {mode} = this.props;
    if (students.every(student => student.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no students
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={students.filter(student => !student.hide)}
        headers={["Name", "Email", "Phone number", "Date of birth", "Workspace", ""]}
        renderRow={student =>
          <StudentDataRow
            mode={mode}
            key={student.id}
            data={student}
            onDelete={this.handleOpenRemoveFromClassDialog}
          />
        }
      />
    )
  }

  renderAdminGadgets() {
    const {removingStudent, addStudent, notInKlassStudent} = this.state;
    return <>
      {removingStudent && <ConfirmDialog
        open={!!removingStudent}
        handleClose={this.handleCloseRemoveFormClassDialog}
        handleSubmit={() => this.removeFromClass(removingStudent.id)}
        title={`Do you want to remove student with
            name: ${removingStudent.name} and email:${removingStudent.email} out of class ?`}
      />}
      <Fab style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }} color='primary' onClick={this.handleOpenAddForm}>
        <AddIcon/>
      </Fab>
      <AddStudentToClassForm
        open={addStudent}
        students={notInKlassStudent}
        handleSubmit={this.addToClass}
        handleClose={this.handleCloseAddForm}
      />
    </>
  }
}

export default StudentContent;
