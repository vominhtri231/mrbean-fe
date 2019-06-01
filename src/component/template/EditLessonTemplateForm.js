import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {FormControl} from "@material-ui/core";
import ContentEditor from "../common/ContentEditor";
import FormLabel from "@material-ui/core/FormLabel";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class EditLessonTemplateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      content: EditorState.createEmpty()
    };
  }

  handleSubmitButtonClick = async () => {
    const {description, content} = this.state;
    const {handleClose, handleSubmit, lesson} = this.props;
    if (!lesson) return;
    if (Validater.isEmpty(description)) {
      this.setState({error: "Description must not empty"});
      return;
    }
    this.setState({
      error: undefined,
    });
    handleSubmit(lesson.id, description, this.convertLessonContent(content));
    handleClose();
  };

  convertLessonContent = (content) => JSON.stringify(convertToRaw(content.getCurrentContent()));

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  handleContentChange = (content) => {
    this.setState({content});
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.lesson) !== JSON.stringify(prevProps.lesson) && this.props.lesson) {
      const lesson = this.props.lesson;
      this.setState({
        description: lesson.description,
        content: this.convertToEditorContent(lesson.content)
      })
    }
  }

  convertToEditorContent = (value) => {
    if (!value) return EditorState.createEmpty();
    const convertedState = convertFromRaw(JSON.parse(value))
    return EditorState.createWithContent(convertedState);
  };

  render() {
    const {open, handleClose} = this.props;
    const {description, content, error} = this.state;

    return <Dialog
      open={open}
      fullScreen
      onClose={handleClose}
    >
      <DialogTitle>Edit lesson template</DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <TextField
            margin="dense"
            id="description"
            value={description}
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
        <FormError errorMessage={error}/>
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

export default EditLessonTemplateForm