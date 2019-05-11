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
import ChooseLessonTemplateForm from "./ChooseLessonTemplateForm";
import LessonTemplateApi from "../../api/LessonTemplateApi";
import EditorContentUtils from "../../util/EditorContentUtils";

class AddLessonForm extends React.Component {
  state = {
    lessonNumber: "",
    description: "",
    content: EditorState.createEmpty(),
    openChooseLessonTemplate: false,
    homeworkTemplateList: undefined,
  };

  handleOpenChooseLessonTemplate = () => {
    this.setState({openChooseLessonTemplate: true})
  };

  handleCloseChooseLessonTemplate = () => {
    this.setState({openChooseLessonTemplate: false})
  };

  handleSubmitButtonClick = async () => {
    const {lessonNumber, description, content, homeworkTemplateList} = this.state;
    const {handleClose, handleSubmit} = this.props;
    handleSubmit(lessonNumber, description, this.convertLessonContent(content), homeworkTemplateList);
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

  handleLessonTemplateChange = async (lessonTemplateId) => {
    const response = await LessonTemplateApi.getLessonTemplate(lessonTemplateId);
    const lessonTemplate = response.data;
    const description = lessonTemplate.description;
    const content = EditorContentUtils.convertToEditorContent(lessonTemplate.content);
    const homeworkTemplateList = lessonTemplate.homeworkTemplateList;
    this.setState({
      description, content, homeworkTemplateList
    })
  };

  render() {
    const {open, handleClose} = this.props;
    const {content, openChooseLessonTemplate, description} = this.state;
    return <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Create new lesson
        <Button onClick={this.handleOpenChooseLessonTemplate}
                variant="contained" color="primary"
                style={{marginLeft: 100}}>
          Choose lesson template
        </Button>
      </DialogTitle>
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
            value={description}
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
      <ChooseLessonTemplateForm
        open={!!openChooseLessonTemplate}
        handleClose={this.handleCloseChooseLessonTemplate}
        handleSubmit={this.handleLessonTemplateChange}
      />
    </Dialog>
  }
}

export default AddLessonForm