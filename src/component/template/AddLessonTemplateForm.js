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

class AddLessonTemplateForm extends React.Component {
  state = {
    description: "",
    content: EditorState.createEmpty()
  };

  handleSubmitButtonClick = async () => {
    const {description, content} = this.state;
    const {handleClose, handleSubmit} = this.props;
    handleSubmit(description, this.convertLessonContent(content));
    handleClose();
  };

  convertLessonContent = (content) => JSON.stringify(convertToRaw(content.getCurrentContent()));

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
      <DialogTitle>Create new lesson template</DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
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

export default AddLessonTemplateForm