import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class EditKlassTemplateForm extends React.Component {
  state = {
    name: "",
  };

  handleSubmitButtonClick = async () => {
    const {klass} = this.props;
    const {name} = this.state;
    const {handleClose, handleSubmit} = this.props;
    if (Validater.isEmpty(name)) {
      this.setState({error: "Name must not empty"});
      return;
    }
    this.setState({
      error: undefined,
    });
    handleSubmit(klass.id, name);
    handleClose();
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.klass) !== JSON.stringify(prevProps.klass) && this.props.klass) {
      const klass = this.props.klass;
      this.setState({
        name: klass.name,
      })
    }
  }

  render() {
    const {open, handleClose} = this.props;
    const {name, error} = this.state;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Edit class template</DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <TextField
            value={name}
            margin="dense"
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default EditKlassTemplateForm