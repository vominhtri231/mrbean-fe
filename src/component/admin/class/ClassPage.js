import React from "react";
import ClassApi from "../../../api/ClassApi";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/styles";
import AddClassForm from "./AddClassForm"
import SearchBar from "../../common/SearchBar";
import List from "@material-ui/core/List";
import ClassListItem from "./ClassListItem";
import Typography from "@material-ui/core/Typography";
import StudentApi from "../../../api/StudentApi";
import TeacherApi from "../../../api/TeacherApi";

const styles = {
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
  contentWrapper: {
    margin: '10px 8px',
  },
  list: {
    width: '100%',
  },
};

class ClassPage extends React.Component {
  state = {
    klasses: [],
    teachers: [],
    openAddClassForm: false,
  };

  handleOpenForm = () => {
    this.setState({openAddClassForm: true});
  };

  handleCloseForm = () => {
    this.setState({openAddClassForm: false});
  };

  search = (keyword) => {
    const {klasses} = this.state;
    const searchedKlasses = klasses.map(klass => {
      klass.hide = !this.contain(klass, keyword);
      return klass
    });
    this.setState({klasses: searchedKlasses});
  };

  contain = (klass, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return klass.name.toLowerCase().includes(lowerKeyword)
      || klass.description.toLowerCase().includes(keyword);
  };

  createClass = async (name, description, teacherId, students) => {
    console.log(teacherId);
    const studentIds = await this.createStudentOfClass(students);
    console.log(studentIds);

    ClassApi.createClass(name, description, teacherId, studentIds).then(response => {
      const {klasses} = this.state;
      const addedKlasses = klasses.concat(response.data);
      this.setState({klasses: addedKlasses})
    })
  };

  createStudentOfClass = async (students) => {
    return await Promise.all(students.map(async (student) => {
      try {
        const responseStudent = await StudentApi.createStudent(student.email, student.name, student.phoneNumber,
          student.dateOfBirth, student.workspace, student.isWorker);
        return responseStudent.data.id;
      } catch (e) {
        console.log(e);
      }
    }));
  };

  getClasses = () => {
    ClassApi.getClasses().then(response => this.setState({klasses: response.data}));
  };

  getTeachers = () => {
    TeacherApi.getAll().then(response => this.setState({teachers: response.data}));
  };

  deleteClass = (id) => {
    ClassApi.deleteClass(id).then(() => {
      const {klasses} = this.state;
      const deletedKlasses = klasses.filter(klass => klass.id !== id);
      this.setState({klasses: deletedKlasses})
    });
  };

  componentDidMount() {
    this.getClasses();
    this.getTeachers();
  };

  render() {
    const {klasses, teachers, openAddClassForm} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <SearchBar searchPlaceHolder={"Search by class name or description"}
                   onSearch={this.search}/>
        <div className={classes.contentWrapper}>
          {this.renderListClasses(klasses)}
        </div>
        <Fab className={classes.fab} color='primary' onClick={this.handleOpenForm}>
          <AddIcon/>
        </Fab>
        <AddClassForm open={openAddClassForm}
                      teachers={teachers}
                      handleClose={this.handleCloseForm}
                      handleSubmit={this.createClass}/>
      </div>
    );
  }

  renderListClasses = (klasses) => {
    if (klasses.every(klass => klass.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          No classes yet
        </Typography>
      )
    }
    return (
      <List>
        {
          klasses.filter(klass => !klass.hide).map(klass => (
            <ClassListItem key={klass.id} klass={klass} onDelete={this.deleteClass}/>
          ))
        }
      </List>
    )
  }
}

export default withStyles(styles)(ClassPage);