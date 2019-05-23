import * as React from "react";
import SearchBar from "../common/SearchBar";
import PaginationTable from "../common/table/PaginationTable";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import ConfirmDialog from "../common/ConfirmDialog";
import MistakeTypeApi from "../../api/MistakeTypeApi";
import MistakeTypeDataRow from "./MistakeTypeDataRow";
import AddMistakeTypeForm from "./AddMistakeTypeForm";
import EditMistakeTypeForm from "./EditMistakeTypeForm";
import BuildIcon from "@material-ui/icons/Build"
import MistakeRuleContent from "./MistakeRuleContent";

class MistakeTypeContent extends React.Component {
  state = {
    mistakeTypes: [],
    openAddMistakeTypeForm: false,
    openMistakeRuleForm: false,
    deletingMistakeType: undefined,
    editingMistakeType: undefined,
  };

  handleOpenAddMistakeTypeForm = () => {
    this.setState({openAddMistakeTypeForm: true});
  };

  handleCloseAddMistakeTypeForm = () => {
    this.setState({openAddMistakeTypeForm: false});
  };

  handleOpenDeleteMistakeTypeForm = (deletingMistakeType) => {
    this.setState({deletingMistakeType: deletingMistakeType});
  };

  handleCloseDeleteMistakeTypeForm = () => {
    this.setState({deletingMistakeType: undefined});
  };

  handleOpenEditMistakeTypeForm = (editingMistakeType) => {
    this.setState({editingMistakeType: editingMistakeType});
  };

  handleCloseEditMistakeTypeForm = () => {
    this.setState({editingMistakeType: undefined});
  };

  handleOpenMistakeRuleForm = () => {
    this.setState({openMistakeRuleForm: true})
  };

  handleCloseMistakeRuleForm = () => {
    this.setState({openMistakeRuleForm: false})
  };

  search = (keyword) => {
    const {mistakeTypes} = this.state;
    const searchedMistakeType = mistakeTypes.map(mistakeType => {
      mistakeType.hide = !this.contain(mistakeType, keyword);
      return mistakeType
    });
    this.setState({mistakeTypes: searchedMistakeType});
  };

  contain = (mistakeType, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return mistakeType.name.toLowerCase().includes(lowerKeyword) ||
      mistakeType.description.toLowerCase().includes(lowerKeyword);
  };

  createMistakeType = async (name, description) => {
    const mistakeTypeResponse = await MistakeTypeApi.create(name, description);
    const mistakeType = mistakeTypeResponse.data;
    const {mistakeTypes} = this.state;
    const addedMistakeTypes = mistakeTypes.concat(mistakeType);
    this.setState({mistakeTypes: addedMistakeTypes});
  };

  updateMistakeType = async (id, name, description) => {
    const mistakeTypeResponse = await MistakeTypeApi.update(id, name, description);
    const updatedMistakeType = mistakeTypeResponse.data;
    const {mistakeTypes} = this.state;
    const updatedMistakeTypes = mistakeTypes.map(mistakeType => mistakeType.id === id ? updatedMistakeType : mistakeType);
    this.setState({mistakeTypes: updatedMistakeTypes});
  };

  deleteMistakeType = async (id) => {
    await MistakeTypeApi.delete(id);
    const {mistakeTypes} = this.state;
    const deletedMistakeTypes = mistakeTypes.filter(mistakeType => mistakeType.id !== id);
    this.setState({mistakeTypes: deletedMistakeTypes});
  };

  async componentDidMount() {
    await this.init()
  }

  init = async () => {
    const response = await MistakeTypeApi.getAll();
    const mistakeTypes = response.data;
    this.setState({mistakeTypes});
  };

  render() {
    const {
      openAddMistakeTypeForm, deletingMistakeType,
      editingMistakeType, openMistakeRuleForm, mistakeTypes
    } = this.state;
    return <div>
      <SearchBar searchPlaceHolder={"Search by name or description"}
                 onSearch={this.search}
                 onReload={this.init}/>
      <div>
        {this.renderMistakes()}
      </div>
      <Fab style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }} color='primary' onClick={this.handleOpenAddMistakeTypeForm}>
        <AddIcon/>
      </Fab>
      <Fab style={{
        position: 'fixed',
        bottom: 80,
        right: 16,
      }} color='primary' onClick={this.handleOpenMistakeRuleForm}>
        <BuildIcon/>
      </Fab>
      <AddMistakeTypeForm
        open={openAddMistakeTypeForm}
        handleSubmit={this.createMistakeType}
        handleClose={this.handleCloseAddMistakeTypeForm}
      />
      <EditMistakeTypeForm
        mistakeType={editingMistakeType}
        open={!!editingMistakeType}
        mistake={editingMistakeType}
        handleSubmit={this.updateMistakeType}
        handleClose={this.handleCloseEditMistakeTypeForm}
      />
      <MistakeRuleContent
        mistakeTypes={mistakeTypes}
        open={openMistakeRuleForm}
        handleClose={this.handleCloseMistakeRuleForm}
      />
      {!!deletingMistakeType && <ConfirmDialog
        open={!!deletingMistakeType}
        title={`Do you want to delete mistake type name : ${deletingMistakeType.name}`}
        handleSubmit={() => this.deleteMistakeType(deletingMistakeType.id)}
        handleClose={this.handleCloseDeleteMistakeTypeForm}
      />}
    </div>
  }

  renderMistakes() {
    const {mistakeTypes} = this.state;
    if (mistakeTypes.every(mistake => mistake.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no mistakes
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={mistakeTypes.filter(lesson => !lesson.hide)}
        headers={["Name", "Description", ""]}
        renderRow={lesson =>
          <MistakeTypeDataRow
            key={lesson.id}
            data={lesson}
            onDelete={this.handleOpenDeleteMistakeTypeForm}
            onEdit={this.handleOpenEditMistakeTypeForm}
          />
        }
      />
    )
  }
}

export default MistakeTypeContent;
