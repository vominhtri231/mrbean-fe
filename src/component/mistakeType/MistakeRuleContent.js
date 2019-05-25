import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from "@material-ui/icons/Close";
import {IconButton} from "@material-ui/core";
import MistakeRuleApi from "../../api/MistakeRuleApi";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddMistakeRuleForm from "./AddMistakeRuleForm";
import appConstants from "../../util/appConstants";
import MistakeRuleDataRow from "./MistakeRuleDataRow";
import PaginationTable from "../common/table/PaginationTable";
import ConfirmDialog from "../common/ConfirmDialog";
import Typography from "@material-ui/core/Typography";
import Announce from "../common/Annouce";

class MistakeRuleContent extends React.Component {
  state = {
    mistakeRules: [],
    openAddMistakeRuleForm: false,
    deletingMistakeRule: undefined,
    announce: undefined,
  };

  handleOpenDeleteMistakeRuleForm = (mistakeRule) => {
    this.setState({deletingMistakeRule: mistakeRule})
  };

  handleCloseDeleteMistakeRuleForm = () => {
    this.setState({deletingMistakeRule: undefined})
  };

  handleOpenAddMistakeRuleForm = () => {
    this.setState({openAddMistakeRuleForm: true})
  };

  handleCloseAddMistakeRuleForm = () => {
    this.setState({openAddMistakeRuleForm: false})
  };

  handleCloseAnnounce = () => {
    this.setState({announce: undefined});
  };

  addMistakeRule = (standard, mistakeTypeId, threshold) => {
    MistakeRuleApi.create(standard, mistakeTypeId, threshold).then(response => {
      const {mistakeRules} = this.state;
      const addedMistakeRules = mistakeRules.concat(response.data);
      const successAnnounce = {message: "Create mistake rule successfully", variant: "success"};
      this.setState({mistakeRules: addedMistakeRules, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Create mistake rule fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  editMistakeRule = async (mistakeRule) => {
    const response = await MistakeRuleApi.update(mistakeRule.id, mistakeRule.mistakeStandard,
      mistakeRule.mistakeType.id, mistakeRule.threshold, mistakeRule.number);
    const updatedMistakeRule = response.data;
    const {mistakeRules} = this.state;

    const updatedMistakeRules = mistakeRules.map(mistakeRule =>
      mistakeRule.id === updatedMistakeRule.id ? updatedMistakeRule : mistakeRule)
    this.setState({mistakeRules: updatedMistakeRules});
  };

  deleteMistakeRule = (id) => {
    MistakeRuleApi.delete(id).then(() => {
      const {mistakeRules} = this.state;
      const deletedMistakeRules = mistakeRules.filter(mistakeRule => mistakeRule.id !== id);
      const successAnnounce = {message: "Delete mistake rule successfully", variant: "success"};
      this.setState({mistakeRules: deletedMistakeRules, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Delete mistake rule fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  async componentDidMount() {
    await this.init();
  }

  async init() {
    const response = await MistakeRuleApi.getAll();
    const mistakeRules = response.data;
    this.setState({mistakeRules});
  }

  render() {
    const standards = appConstants.mistakeStandards;
    const {open, handleClose, mistakeTypes} = this.props;
    const {mistakeRules, openAddMistakeRuleForm, deletingMistakeRule, announce} = this.state;
    return <Dialog
      open={open}
      fullScreen
      onClose={handleClose}
    >
      <DialogTitle style={{backgroundColor: '#b7b38d'}}>
        Mistake rule
        <IconButton style={{position: 'absolute', right: 20, top: 10}} onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{marginTop: 20}}>

          {this.renderMistakeRules(mistakeRules, standards, mistakeTypes)}
        </div>
        <Fab style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }} color='primary' onClick={this.handleOpenAddMistakeRuleForm}>
          <AddIcon/>
        </Fab>
        <AddMistakeRuleForm
          open={!!openAddMistakeRuleForm}
          handleClose={this.handleCloseAddMistakeRuleForm}
          handleSubmit={this.addMistakeRule}
          mistakeTypes={mistakeTypes}
          standards={standards}
        />
        {!!deletingMistakeRule && <ConfirmDialog
          open={!!deletingMistakeRule}
          title={`Do you want to delete this mistake rule`}
          handleSubmit={() => this.deleteMistakeRule(deletingMistakeRule.id)}
          handleClose={this.handleCloseDeleteMistakeRuleForm}
        />}
        {!!announce && <Announce
          message={announce.message} variant={announce.variant}
          onClose={this.handleCloseAnnounce} open
        />}
      </DialogContent>
    </Dialog>
  }

  renderMistakeRules = (mistakeRules, standards, mistakeTypes) => {
    if (mistakeRules.length === 0) {
      return (
        <Typography color="textSecondary" align="center">
          No rules yet
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={mistakeRules}
        headers={["Standard", "Mistake Type", ""]}
        renderRow={mistakeRule =>
          <MistakeRuleDataRow
            key={mistakeRule.id}
            data={mistakeRule}
            onDelete={this.handleOpenDeleteMistakeRuleForm}
            onEdit={this.editMistakeRule}
            standards={standards}
            mistakeTypes={mistakeTypes}/>
        }
      />
    )
  }
}

export default MistakeRuleContent