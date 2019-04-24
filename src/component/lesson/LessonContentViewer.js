import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl} from "@material-ui/core";
import {convertFromRaw, Editor, EditorState} from "draft-js";

class LessonContentViewer extends React.Component {
  render() {
    const {open, handleClose, lesson} = this.props;
    const editorState = this.getLessonContent(lesson);
    return <Dialog
      open={open}
      fullScreen
      onClose={handleClose}
    >
      <DialogTitle>Lesson content</DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <FormControl fullWidth style={{marginTop: "20px",border:"1px solid",padding:20}}>
            <Editor editorState={editorState} readOnly={true}/>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  }

  getLessonContent = (lesson) => {
    if (!lesson || !lesson.content) return EditorState.createEmpty();
    const convertedState = convertFromRaw(JSON.parse(lesson.content));
    return EditorState.createWithContent(convertedState);
  };
}

export default LessonContentViewer