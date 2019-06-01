import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {convertToRaw, EditorState} from "draft-js";
import {FormControl} from "@material-ui/core";
import ContentEditor from "../common/ContentEditor";
import FormLabel from "@material-ui/core/FormLabel";
import EditorContentUtils from "../../util/EditorContentUtils";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class EditLessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonNumber: "",
      description: "",
      content: EditorState.createEmpty(),
      error: undefined
    };
  }

  handleSubmitButtonClick = async () => {
    const {lessonNumber, description, content} = this.state;
    const {handleClose, handleSubmit, lesson} = this.props;
    if (!lesson) return;
    const validateResult = Validater.validateLesson(lessonNumber, description, content);
    if (validateResult) {
      this.setState({
        error: validateResult
      });
      return;
    }
    handleSubmit(lessonNumber, description, this.convertLessonContent(content), lesson.id);
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

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.lesson) !== JSON.stringify(prevProps.lesson) && this.props.lesson) {
      const lesson = this.props.lesson;
      this.setState({
        lessonNumber: lesson.lessonNumber,
        description: lesson.description,
        content: EditorContentUtils.convertToEditorContent(lesson.content),
        error: undefined
      })
    }
  }

  render() {
    const {open, handleClose} = this.props;
    const {lessonNumber, description, content, error} = this.state;
    return <Dialog
      open={open}
      fullScreen
      onClose={handleClose}
    >
      <DialogTitle>Edit lesson</DialogTitle>
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

export default EditLessonForm