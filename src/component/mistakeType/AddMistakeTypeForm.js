import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

class AddMistakeTypeForm extends React.Component {
  state = {
    name: "",
    description: "",
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit} = this.props;
    const {name, description} = this.state;
    handleSubmit(name, description);
    this.handleClose();
  };

  handleClose = () => {
    const {handleClose} = this.props;
    this.setState({
      name: "",
      description: ""
    });
    handleClose();
  };

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  };

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value})
  };

  render() {
    const {open} = this.props;
    const {name, description} = this.state;
    return <Dialog
      open={open}
      onClose={this.handleClose}
    >
      <DialogTitle>
        Create new mistake type
      </DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={name}
            onChange={this.handleNameChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            value={description}
            onChange={this.handleDescriptionChange}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Create new
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default AddMistakeTypeForm