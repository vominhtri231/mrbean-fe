import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/es/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel";

class AddMistakeRuleForm extends React.Component {
  state = {
    mistakeTypeId: undefined,
    standard: undefined,
    threshold: 0,
  };

  handleMistakeTypeChange = (e) => {
    this.setState({mistakeTypeId: e.target.value});
  };

  handleStandardChange = (e) => {
    this.setState({standard: e.target.value})
  };

  handleThresholdChange = (e) => {
    this.setState({threshold: e.target.value})
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit} = this.props;
    const {standard, mistakeTypeId, threshold} = this.state;
    handleSubmit(standard, mistakeTypeId, threshold);
    this.handleClose();
  };

  handleClose = () => {
    const {handleClose} = this.props;
    this.setState({
      mistakeTypeId: undefined,
      standard: undefined,
      threshold: 0,
    });
    handleClose();
  };

  render() {
    const {open, mistakeTypes, standards} = this.props;
    const {mistakeTypeId, standard, threshold} = this.state;
    return <Dialog
      open={open}
      onClose={this.handleClose}
    >
      <DialogTitle>
        Create new mistake rule
      </DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <FormControl fullWidth style={{marginTop: 16}}>
            <InputLabel>Mistake type</InputLabel>
            <Select
              value={mistakeTypeId ? mistakeTypeId : ""}
              onChange={this.handleMistakeTypeChange}
            >
              {mistakeTypes.map(mistakeType =>
                <MenuItem value={mistakeType.id} key={mistakeType.id}>
                  <em>{mistakeType.name}</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{marginTop: 16}}>
            <InputLabel>Standards</InputLabel>
            <Select
              value={standard ? standard : ""}
              onChange={this.handleStandardChange}
            >
              {standards.map(standard =>
                <MenuItem value={standard} key={standard}>
                  <em>{standard}</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            type="number"
            margin="dense"
            label="Threshold"
            onChange={this.handleThresholdChange}
            value={threshold}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Create new rule
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default AddMistakeRuleForm