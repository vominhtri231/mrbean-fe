import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {convertToRaw, EditorState} from 'draft-js';
import ContentEditor from "../common/ContentEditor";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";

class AddLessonForm extends React.Component {
  state = {
    lessonNumber: "",
    description: "",
    content: EditorState.createEmpty()
  };

  handleSubmitButtonClick = async () => {
    const {lessonNumber, description, content} = this.state;
    const {handleClose, handleSubmit} = this.props;
    handleSubmit(lessonNumber, description, this.convertLessonContent(content));
    handleClose();
  };

  convertLessonContent = (content) => JSON.stringify(convertToRaw(content.getCurrentContent()));

  handleLessonNumberChange = (event) => {
    this.setState({lessonNumber: event.target.value});
  };

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  handleContentChange = (content) => {
    this.setState({content});
  };

  render() {
    const {open, handleClose} = this.props;
    const {content} = this.state;
    return <Dialog
      fullScreen
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
          <FormControl fullWidth style={{marginTop: "20px"}}>
            <FormLabel>Lesson Content</FormLabel>
            <br/>
            <ContentEditor
              editorState={content}
              onChange={this.handleContentChange}
              style={{marginTop: "15px", width: "max-content"}}/>
          </FormControl>
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