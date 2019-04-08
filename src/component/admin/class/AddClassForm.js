import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddClassForm extends React.Component {
  state = {
    name: "",
    description: "",
  };

  handleSubmitButtonClick = () => {
    const {name, description} = this.state;
    const {handleClose, handleSubmit} = this.props;
    handleSubmit(name, description);
    handleClose();
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  render() {
    const {open, handleClose} = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new class</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              onChange={this.handleNameChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              onChange={this.handleDescriptionChange}
              label="Description"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitButtonClick} color="primary">
              Create new
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddClassForm