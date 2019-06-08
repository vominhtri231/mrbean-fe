import * as React from "react";
import SearchBar from "../common/SearchBar";
import MistakeDataRow from "./MistakeDataRow";
import PaginationTable from "../common/table/PaginationTable";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddMistakeForm from "./AddMistakeForm";
import ConfirmDialog from "../common/ConfirmDialog";
import EditMistakeForm from "./EditMistakeForm";
import Announce from "../common/Annouce";
import MistakeApi from "../../api/MistakeApi";
import KlassStudentApi from "../../api/KlassStudentApi";
import LessonApi from "../../api/LessonApi";
import MistakeTypeApi from "../../api/MistakeTypeApi";

class MistakeContent extends React.Component {
  state = {
    students: [],
    lessons: [],
    mistakeTypes: [],
    mistakes: [],
    openAddMistakeForm: false,
    deletingMistake: undefined,
    editingMistake: undefined,
    announce: undefined,
  };

  handleOpenAddMistakeForm = () => {
    this.setState({openAddMistakeForm: true});
  };

  handleCloseAddMistakeForm = () => {
    this.setState({openAddMistakeForm: false});
  };

  handleOpenDeleteMistakeForm = (deletingMistake) => {
    this.setState({deletingMistake: deletingMistake});
  };

  handleCloseDeleteMistakeForm = () => {
    this.setState({deletingMistake: undefined});
  };

  handleOpenEditMistakeForm = (editingMistake) => {
    this.setState({editingMistake: editingMistake});
  };

  handleCloseEditMistakeForm = () => {
    this.setState({editingMistake: undefined});
  };

  handleCloseAnnounce = () => {
    this.setState({announce: undefined});
  };

  search = (keyword) => {
    const {mistakes} = this.state;
    const searchedMistake = mistakes.map(mistake => {
      mistake.hide = !this.contain(mistake, keyword);
      return mistake
    });
    this.setState({mistakeTypes: searchedMistake});
  };

  contain = (mistake, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return mistake.lesson.lessonNumber.toString().toLowerCase().includes(lowerKeyword)
      || mistake.lesson.description.toLowerCase().includes(lowerKeyword)
      || mistake.student.email.toLowerCase().includes(lowerKeyword)
      || mistake.mistakeType.name.toLowerCase().includes(lowerKeyword);
  };

  createMistake = (student, lesson, mistakeType) => {
    MistakeApi.create(student.id, mistakeType.id, lesson.id).then(mistakeResponse => {
      const mistake = mistakeResponse.data;
      const {mistakes} = this.state;
      const addedMistakes = mistakes.concat(mistake);
      const createSuccessAnnounce = {message: "Create mistake successfully", variant: "success"};
      this.setState({mistakes: addedMistakes, announce: createSuccessAnnounce});
    }).catch(response => {
      const createErrorAnnounce = {message: "Create mistake fail :" + response.error, variant: "error"};
      this.setState({announce: createErrorAnnounce})
    })
  };

  updateMistake = (id, student, lesson, mistakeType) => {
    MistakeApi.update(id, student.id, mistakeType.id, lesson.id).then(mistakeResponse => {
      const updatedMistake = mistakeResponse.data;
      const {mistakes} = this.state;
      const updatedMistakes = mistakes.map(mistake => mistake.id === id ? updatedMistake : mistake);
      const updateSuccessAnnounce = {message: "Update mistake successfully", variant: "success"};
      this.setState({mistakes: updatedMistakes, announce: updateSuccessAnnounce});
    }).catch(response => {
      const updateErrorAnnounce = {message: "Update mistake fail :" + response.error, variant: "error"};
      this.setState({announce: updateErrorAnnounce})
    })
  };

  deleteMistake = (id) => {
    MistakeApi.deleteMistake(id).then(() => {
      const {mistakes} = this.state;
      const deletedMistakes = mistakes.filter(mistake => mistake.id !== id);
      const deleteSuccessAnnounce = {message: "Delete mistake successfully", variant: "success"};
      this.setState({mistakes: deletedMistakes, announce: deleteSuccessAnnounce});
    }).catch(response => {
      const deleteErrorAnnounce = {message: "Delete mistake fail :" + response.error, variant: "error"};
      this.setState({announce: deleteErrorAnnounce})
    })
  };

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.klass) !== JSON.stringify(prevProps.klass)) {
      await this.init()
    }
  }

  async componentDidMount() {
    await this.init()
  }

  init = async () => {
    const {klass} = this.props;
    const studentResponse = await KlassStudentApi.getStudentsOfKlass(klass.id);
    const students = studentResponse.data;
    const lessonResponse = await LessonApi.getAllOfClass(klass.id);
    const lessons = lessonResponse.data;
    const mistakeTypeResponse = await MistakeTypeApi.getAll();
    const mistakeTypes = mistakeTypeResponse.data;
    const mistakeResponse = await MistakeApi.getAllOfKlass(klass.id);
    const mistakes = mistakeResponse.data;
    this.setState({students, lessons, mistakeTypes, mistakes});
  };

  render() {
    const {
      openAddMistakeForm, deletingMistake, editingMistake,
      announce, students, lessons, mistakeTypes,
    } = this.state;
    const {klass} = this.props;
    return <div>
      <SearchBar searchPlaceHolder={"Search by lesson's number,lesson's description,mistake type or student'email"}
                 onSearch={this.search}
                 onReload={this.init}/>
      <div>
        {this.renderMistakes()}
      </div>
      <Fab style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }} color='primary' onClick={this.handleOpenAddMistakeForm}>
        <AddIcon/>
      </Fab>
      <AddMistakeForm
        students={students}
        lessons={lessons}
        mistakeTypes={mistakeTypes}
        open={openAddMistakeForm}
        handleSubmit={this.createMistake}
        handleClose={this.handleCloseAddMistakeForm}
      />
      <EditMistakeForm
        students={students}
        lessons={lessons}
        mistakeTypes={mistakeTypes}
        open={!!editingMistake}
        mistake={editingMistake}
        handleSubmit={this.updateMistake}
        handleClose={this.handleCloseEditMistakeForm}
      />
      {!!deletingMistake && <ConfirmDialog
        open={!!deletingMistake}
        title={`Do you want to delete this mistake`}
        handleSubmit={() => this.deleteMistake(deletingMistake.id)}
        handleClose={this.handleCloseDeleteMistakeForm}
      />}
      {!!announce && <Announce
        message={announce.message} variant={announce.variant}
        onClose={this.handleCloseAnnounce} open
      />}
    </div>
  }

  renderMistakes() {
    const {mistakes} = this.state;
    if (mistakes.every(mistake => mistake.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no mistakes
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={mistakes.filter(lesson => !lesson.hide)}
        headers={["Lesson number", "Lesson description", "MistakeType", "Student email", ""]}
        renderRow={lesson =>
          <MistakeDataRow
            key={lesson.id}
            data={lesson}
            onDelete={this.handleOpenDeleteMistakeForm}
            onEdit={this.handleOpenEditMistakeForm}
          />
        }
      />
    )
  }
}

export default MistakeContent;
