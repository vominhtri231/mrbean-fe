import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddKlassTemplateForm extends React.Component {
  state = {
    name: "",
  };

  handleSubmitButtonClick = async () => {
    const {name} = this.state;
    const {handleClose, handleSubmit} = this.props;
    handleSubmit(name);
    handleClose();
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  render() {
    const {open, handleClose} = this.props;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Create new class template</DialogTitle>
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
            onChange={this.handleNameChange}
            fullWidth
          />
        </form>
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
  }
}

export default AddKlassTemplateForm