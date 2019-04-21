import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditLessonForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lessonNumber: "",
      description: "",
    };
  }

  handleSubmitButtonClick = async () => {
    const {lessonNumber, description} = this.state;
    const {handleClose, handleSubmit, lesson} = this.props;
    if (!lesson) return;
    handleSubmit(lessonNumber, description, lesson.id);
    handleClose();
  };

  handleLessonNumberChange = (event) => {
    this.setState({lessonNumber: event.target.value});
  };

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.lesson) !== JSON.stringify(prevProps.lesson) && this.props.lesson) {
      const lesson = this.props.lesson;
      this.setState({
        lessonNumber: lesson.lessonNumber,
        description: lesson.description,
      })
    }
  }

  render() {
    const {open, handleClose} = this.props;
    const {lessonNumber, description} = this.state;

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
            type="number"
            autoFocus
            margin="dense"
            id="lessonNumber"
            label="Lesson number"
            value={lessonNumber}
            onChange={this.handleLessonNumberChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            value={description}
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
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  }

}

export default EditLessonForm