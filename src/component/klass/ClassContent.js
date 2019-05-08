import React from "react";
import ClassApi from "../../api/ClassApi";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/styles";
import AddClassForm from "./AddClassForm"
import SearchBar from "../common/SearchBar";
import Typography from "@material-ui/core/Typography";
import StudentApi from "../../api/StudentApi";
import TeacherApi from "../../api/TeacherApi";
import PaginationTable from "../common/table/PaginationTable";
import ClassDataRow from "./ClassDataRow";
import ConfirmDialog from "../common/ConfirmDialog";
import EditClassForm from "./EditClassForm";

const styles = {
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
  list: {
    width: '100%',
  },
};

class ClassContent extends React.Component {
  state = {
    klasses: [],
    teachers: [],
    openAddClassForm: false,
    deletingKlass: undefined,
    editingKlass: undefined,
  };

  handleOpenForm = () => {
    this.setState({openAddClassForm: true});
  };

  handleCloseForm = () => {
    this.setState({openAddClassForm: false});
  };

  handleOpenClassSpecific = (klassId) => {
    this.props.history.push(`/class/${klassId}`);
  };

  handleOpenDeleteClassDialog = (klass) => {
    this.setState({deletingKlass: klass});
  };

  handleCloseDeleteClassDialog = () => {
    this.setState({deletingKlass: undefined});
  };

  handleOpenEditDialog = (klass) => {
    this.setState({editingKlass: klass});
  };

  handleCloseEditDialog = () => {
    this.setState({editingKlass: undefined});
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
      || klass.description.toLowerCase().includes(lowerKeyword);
  };

  createClass = async (name, description, teacherId, students) => {
    const studentIds = await this.createStudentOfClass(students);

    ClassApi.createClass(name, description, teacherId, studentIds).then(response => {
      const {klasses} = this.state;
      const addedKlasses = klasses.concat(response.data);
      this.setState({klasses: addedKlasses})
    })
  };

  updateClass = async (id, name, description, teacherId) => {
    const response = await ClassApi.updateClass(id, name, description, teacherId);
    const updatedKlass = response.data;
    const {klasses} = this.state;
    const updatedKlasses = klasses.map(klass => {
      if (klass.id === updatedKlass.id) {
        return updatedKlass;
      }
      return klass;
    });
    this.setState({klasses: updatedKlasses});
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

  getClasses = async (teacherId) => {
    const response = teacherId ?
      await ClassApi.getClassesOfTeacher(teacherId) :
      await ClassApi.getClasses();
    this.setState({klasses: response.data})
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
    const {teacherId} = this.props;
    this.getClasses(teacherId);
    this.getTeachers();
  };

  render() {
    const {
      klasses, teachers, openAddClassForm,
      deletingKlass, editingKlass
    } = this.state;
    const {classes, teacherId} = this.props;
    const watchMode = !!teacherId;
    return (
      <div>
        <SearchBar searchPlaceHolder={"Search by class name or description"}
                   onSearch={this.search}/>
        <div>
          {this.renderListClasses(klasses)}
        </div>
        {!watchMode && <>
          <Fab className={classes.fab} color='primary' onClick={this.handleOpenForm}>
            <AddIcon/>
          </Fab>
          <AddClassForm open={openAddClassForm}
                        teachers={teachers}
                        handleClose={this.handleCloseForm}
                        handleSubmit={this.createClass}/></>}
        {!!deletingKlass && <ConfirmDialog
          open={!!deletingKlass}
          title={`Do you want to delete class : ${deletingKlass.name}`}
          handleSubmit={() => this.deleteClass(deletingKlass.id)}
          handleClose={this.handleCloseDeleteClassDialog}
        />}
        <EditClassForm
          open={!!editingKlass}
          teachers={teachers}
          klass={editingKlass}
          handleClose={this.handleCloseEditDialog}
          handleSubmit={this.updateClass}/>
      </div>
    );
  }

  renderListClasses = (klasses) => {
    const {teacherId} = this.props;
    const watchMode = !!teacherId;
    if (klasses.every(klass => klass.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no classes
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={klasses.filter(klass => !klass.hide)}
        headers={["Name", "Description", "Teacher", ""]}
        renderRow={klass =>
          <ClassDataRow
            watchMode={watchMode}
            key={klass.id}
            data={klass}
            onDelete={this.handleOpenDeleteClassDialog}
            onOpenClassSpecific={this.handleOpenClassSpecific}
            onEdit={this.handleOpenEditDialog}
          />}
      />
    )
  }
}

export default withStyles(styles)(ClassContent);
