import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class EditMistakeTypeForm extends React.Component {
  state = {
    name: "",
    description: "",
    error: undefined
  };

  handleSubmitButtonClick = () => {
    const {mistakeType} = this.props;
    const {handleSubmit, handleClose} = this.props;
    const {name, description} = this.state;
    const validateResult = Validater.validateMistakeType(name, description);
    if (validateResult) {
      this.setState({error: validateResult});
      return;
    }
    this.setState({
      name: "",
      description: "",
      error: undefined,
    });
    handleSubmit(mistakeType.id, name, description);
    handleClose();
  };

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  };

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value})
  };

  async componentDidUpdate(prevProps) {
    const {mistakeType} = this.props;
    if (JSON.stringify(mistakeType) !== JSON.stringify(prevProps.mistakeType) && mistakeType) {
      this.setState({name: mistakeType.name, description: mistakeType.description});
    }
  }

  render() {
    const {open, handleClose} = this.props;
    const {name, description, error} = this.state;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Update mistake type
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
        <FormError errorMessage={error}/>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default EditMistakeTypeForm