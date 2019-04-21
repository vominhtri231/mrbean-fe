import * as React from "react";
import SearchBar from "../common/SearchBar";
import StudentApi from "../../api/StudentApi";
import PaginationTable from "../common/table/PaginationTable";
import StudentDataRow from "./StudentDataRow";
import Typography from "@material-ui/core/Typography";


class StudentContent extends React.Component {
  state = {
    students: [],
  };

  removeFromClass = (studentId) => {

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
    const {klass} = this.props;
    const response = await StudentApi.getAllOfClass(klass.id);
    this.setState({students: response.data});
  }

  render() {
    const {students} = this.state;
    return <div>
      <SearchBar searchPlaceHolder={"Search by name "}
                 onSearch={this.search}/>
      <div>
        {this.renderStudents(students)}
      </div>
    </div>
  }

  renderStudents(students) {
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
            key={student.id}
            data={student}
            onDelete={this.removeFromClass}
          />
        }
      />
    )
  }
}

export default StudentContent;
