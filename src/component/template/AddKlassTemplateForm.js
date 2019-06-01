import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class AddKlassTemplateForm extends React.Component {
  state = {
    name: "",
    error: undefined,
  };

  handleSubmitButtonClick = async () => {
    const {name} = this.state;
    const {handleClose, handleSubmit} = this.props;
    if (Validater.isEmpty(name)) {
      this.setState({error: "Name must not empty"});
      return;
    }
    this.setState({
      name: "",
      error: undefined,
    });
    handleSubmit(name);
    handleClose();
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  render() {
    const {open, handleClose} = this.props;
    const {error} = this.state;
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
        <FormError errorMessage={error}/>
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