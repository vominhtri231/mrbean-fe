import * as React from "react";
import SearchBar from "../common/SearchBar";
import StudentApi from "../../api/StudentApi";
import PaginationTable from "../common/table/PaginationTable";
import StudentDataRow from "./StudentDataRow";
import Typography from "@material-ui/core/Typography";
import ConfirmDialog from "../common/ConfirmDialog";
import appConstants from "../../util/appConstants";
import ClassApi from "../../api/ClassApi";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddStudentToClassForm from "./AddStudentToClassForm";

class StudentContent extends React.Component {
  state = {
    students: [],
    addStudent: false,
    removingStudent: undefined
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

  removeFromClass = async (studentId) => {
    const {klass} = this.props;
    await ClassApi.removeStudents(klass.id, [studentId]);
    const {students} = this.state;
    const removedStudents = students.filter(student => student.id !== parseInt(studentId));
    this.setState({students: removedStudents});
  };

  addToClass = async (students) => {
    const {klass} = this.props;
    const addingStudentsId = students.map(student => student.id);
    await ClassApi.addStudents(klass.id, addingStudentsId);
    const response = await StudentApi.getAllOfClass(klass.id);
    this.setState({students: response.data});
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
    const response = await StudentApi.getAllOfClass(klass.id);
    this.setState({students: response.data});
  };

  render() {
    const {students} = this.state;
    const {mode} = this.props;
    return <div>
      <SearchBar searchPlaceHolder={"Search by name "}
                 onSearch={this.search} onReload={this.init}/>
      <div>
        {this.renderStudents(students)}
      </div>
      {mode === appConstants.modes.Admin ? this.renderAdminGadgets() : <></>}
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
    const {removingStudent, addStudent} = this.state;
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
        handleSubmit={this.addToClass}
        handleClose={this.handleCloseAddForm}
      />
    </>
  }
}

export default StudentContent;
