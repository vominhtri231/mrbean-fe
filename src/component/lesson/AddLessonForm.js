import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddLessonForm extends React.Component {
  state = {
    lessonNumber: "",
    description: "",
  };

  handleSubmitButtonClick = async () => {
    const {lessonNumber, description} = this.state;
    const {handleClose, handleSubmit} = this.props;
    handleSubmit(lessonNumber, description);
    handleClose();
  };

  handleLessonNumberChange = (event) => {
    this.setState({lessonNumber: event.target.value});
  };

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  render() {
    const {open, handleClose} = this.props;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Create new class</DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <TextField
            type="number"
            autoFocus
            margin="dense"
            id="lessonNumber"
            label="Lesson number"
            onChange={this.handleLessonNumberChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            onChange={this.handleDescriptionChange}
            label="Description"
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

export default AddLessonForm