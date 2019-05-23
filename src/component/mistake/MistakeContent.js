import * as React from "react";
import SearchBar from "../common/SearchBar";
import MistakeDataRow from "./MistakeDataRow";
import PaginationTable from "../common/table/PaginationTable";
import Typography from "@material-ui/core/Typography";
import MistakeApi from "../../api/MistakeApi";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddMistakeForm from "./AddMistakeForm";
import ConfirmDialog from "../common/ConfirmDialog";
import EditMistakeForm from "./EditMistakeForm";

class MistakeContent extends React.Component {
  state = {
    mistakes: [],
    openAddMistakeForm: false,
    deletingMistake: undefined,
    editingMistake: undefined,
  };

  handleOpenAddMistakeForm = () => {
    this.setState({openAddMistakeTypeForm: true});
  };

  handleCloseAddMistakeForm = () => {
    this.setState({openAddMistakeTypeForm: false});
  };

  handleOpenDeleteMistakeForm = (deletingMistake) => {
    this.setState({deletingMistake: deletingMistake});
  };

  handleCloseDeleteMistakeForm = () => {
    this.setState({deletingMistakeType: undefined});
  };

  handleOpenEditMistakeForm = (editingMistake) => {
    this.setState({editingMistake: editingMistake});
  };

  handleCloseEditMistakeForm = () => {
    this.setState({editingMistakeType: undefined});
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

  createMistake = async (student, lesson, mistakeType) => {
    const mistakeResponse = await MistakeApi.create(student.id, mistakeType.id, lesson.id);
    const mistake = mistakeResponse.data;
    const {mistakes} = this.state;
    const addedMistakes = mistakes.concat(mistake);
    this.setState({mistakeTypes: addedMistakes});
  };

  updateMistake = async (id, student, lesson, mistakeType) => {
    const mistakeResponse = await MistakeApi.update(id, student.id, mistakeType.id, lesson.id);
    const updatedMistake = mistakeResponse.data;
    const {mistakes} = this.state;
    const updatedMistakes = mistakes.map(mistake => mistake.id === id ? updatedMistake : mistake);
    this.setState({mistakeTypes: updatedMistakes});
  };

  deleteMistake = async (id) => {
    await MistakeApi.delete(id);
    const {mistakes} = this.state;
    const deletedMistakes = mistakes.filter(mistake => mistake.id !== id);
    this.setState({mistakeTypes: deletedMistakes});
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
    const response = await MistakeApi.getAllOfKlass(klass.id);
    const mistakes = response.data;
    this.setState({mistakes});
  };

  render() {
    const {openAddMistakeForm, deletingMistake, editingMistake} = this.state;
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
        klassId={klass.id}
        open={openAddMistakeForm}
        handleSubmit={this.createMistake}
        handleClose={this.handleCloseAddMistakeForm}
      />
      <EditMistakeForm
        klassId={klass.id}
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
