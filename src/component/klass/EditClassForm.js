import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class EditClassForm extends React.Component {
  state = {
    name: "",
    description: "",
    chosenTeacherId: undefined
  };

  handleSubmitButtonClick = async () => {
    const {klass} = this.props;
    const {name, description, chosenTeacherId} = this.state;
    const {handleClose, handleSubmit} = this.props;
    handleSubmit(klass.id, name, description, chosenTeacherId);
    handleClose();
  };

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  handleTeacherChange = (event) => {
    this.setState({chosenTeacherId: event.target.value});
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.klass) !== JSON.stringify(prevProps.klass) && this.props.klass) {
      const klass = this.props.klass;
      this.setState({
        name: klass.name,
        description: klass.description,
        chosenTeacherId: klass.teacher.id,
      })
    }
  }

  render() {
    const {open, handleClose, teachers} = this.props;
    const {name, description, chosenTeacherId} = this.state;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Edit class</DialogTitle>
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
          <TextField
            value={description}
            margin="dense"
            onChange={this.handleDescriptionChange}
            label="Description"
            fullWidth
          />
          <FormControl fullWidth style={{marginTop: 16}}>
            {!chosenTeacherId && <InputLabel>teacher</InputLabel>}
            <Select
              value={chosenTeacherId}
              onChange={this.handleTeacherChange}
            >
              {teachers.map(teacher =>
                <MenuItem value={teacher.id} key={teacher.id}>
                  <em>{teacher.name + " - " + teacher.email}</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
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

export default EditClassForm