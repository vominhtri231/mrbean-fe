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

class MistakeRuleContent extends React.Component {
  state = {
    mistakeRules: [],
    openAddMistakeRuleForm: false,
    deletingMistakeRule: undefined,
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

  addMistakeRule = async (standard, mistakeTypeId, threshold) => {
    const response = await MistakeRuleApi.create(standard, mistakeTypeId, threshold);
    const {mistakeRules} = this.state;
    const addedMistakeRules = mistakeRules.concat(response.data);
    this.setState({mistakeRules: this.setUpBorder(addedMistakeRules)});
  };

  editMistakeRule = async (mistakeRule) => {
    const response = await MistakeRuleApi.update(mistakeRule.id, mistakeRule.mistakeStandard,
      mistakeRule.mistakeType.id, mistakeRule.threshold, mistakeRule.number);
    const updatedMistakeRule = response.data;
    const {mistakeRules} = this.state;

    const updatedMistakeRules = mistakeRules.map(mistakeRule =>
      mistakeRule.id === updatedMistakeRule.id ? updatedMistakeRule : mistakeRule)
    this.setState({mistakeRules: this.setUpBorder(updatedMistakeRules)});
  };

  moveUp = async (mistakeRule) => {
    const {mistakeRules} = this.state;
    const index = this.getIndex(mistakeRules, mistakeRule);
    const swapMistakeRule = mistakeRules[index - 1];
    const tempNumber = swapMistakeRule.number;
    swapMistakeRule.number = mistakeRule.number;
    mistakeRule.number = tempNumber;

    await this.editMistakeRule(swapMistakeRule);
    await this.editMistakeRule(mistakeRule);
    await this.init();
  };

  moveDown = async (mistakeRule) => {
    const {mistakeRules} = this.state;
    const index = this.getIndex(mistakeRules, mistakeRule);
    const swapMistakeRule = mistakeRules[index + 1];
    const tempNumber = swapMistakeRule.number;
    swapMistakeRule.number = mistakeRule.number;
    mistakeRule.number = tempNumber;
    await this.editMistakeRule(swapMistakeRule);
    await this.editMistakeRule(mistakeRule);
    await this.init();
  };

  getIndex = (mistakeRules, mistakeRule) => {
    let i = 0;
    for (; i < mistakeRules.length; i++) {
      if (mistakeRules[i].id === mistakeRule.id) {
        break;
      }
    }
    return i;
  };

  deleteMistakeRule = async (id) => {
    await MistakeRuleApi.delete(id);
    const {mistakeRules} = this.state;
    const deletedMistakeRules = mistakeRules.filter(mistakeRule => mistakeRule.id !== id);
    this.setState({mistakeRules: this.setUpBorder(deletedMistakeRules)});
  };

  async componentDidMount() {
    await this.init();
  }

  async init() {
    const response = await MistakeRuleApi.getAll();
    const mistakeRules = this.setUpBorder(response.data);
    this.setState({mistakeRules});
  }

  setUpBorder = (mistakeRules) => {
    mistakeRules[mistakeRules.length - 1].bottom = true;
    mistakeRules[0].top = true;
    for (let i = 1; i < mistakeRules.length - 1; i++) {
      mistakeRules[i].top = undefined;
      mistakeRules.bottom = undefined;
    }
    return mistakeRules;
  };

  render() {
    const standards = appConstants.mistakeStandards;
    const {open, handleClose, mistakeTypes} = this.props;
    const {mistakeRules, openAddMistakeRuleForm, deletingMistakeRule} = this.state;
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
            moveUp={this.moveUp}
            moveDown={this.moveDown}
            standards={standards}
            mistakeTypes={mistakeTypes}/>
        }
      />
    )
  }
}

export default MistakeRuleContent