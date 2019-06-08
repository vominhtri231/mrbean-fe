import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl} from "@material-ui/core";
import AutoCompete from "../common/AutoCompete";
import FormLabel from "@material-ui/core/FormLabel";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class AddMistakeForm extends React.Component {
  state = {
    selectedStudent: undefined,
    selectedLesson: undefined,
    selectedMistakeType: undefined,
    error: undefined,
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit} = this.props;
    const {selectedStudent, selectedLesson, selectedMistakeType} = this.state;
    const validateResult = Validater.validateMistake(selectedStudent, selectedLesson, selectedMistakeType);
    if (validateResult) {
      this.setState({error: validateResult})
      return;
    }
    const student = selectedStudent.value;
    const lesson = selectedLesson.value;
    const mistakeType = selectedMistakeType.value;
    this.setState({
      error: undefined,
    });
    handleSubmit(student, lesson, mistakeType);
  };

  handleSelectedStudentChange = (value) => {
    this.setState({selectedStudent: value})
  };

  handleSelectedLessonChange = (value) => {
    this.setState({selectedLesson: value})
  };

  handleSelectedMistakeTypeChange = (value) => {
    this.setState({selectedMistakeType: value})
  };

  render() {
    const {open, handleClose, students, lessons, mistakeTypes} = this.props;
    const {selectedStudent, selectedLesson, selectedMistakeType, error} = this.state;

    const studentSuggestions = students.map(student => ({
      value: student,
      label: student.email
    }));

    const lessonSuggestions = lessons.map(lesson => ({
      value: lesson,
      label: lesson.lessonNumber
    }));

    const mistakeTypeSuggestions = mistakeTypes.map(mistakeType => ({
      value: mistakeType,
      label: mistakeType.name
    }));

    const autoCompeteStyle = {
      height: 100,
      minWidth: 300,
    };

    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Create new mistake
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{marginTop: "20px"}}>
          <FormLabel>Student</FormLabel>
          <AutoCompete placeholder={"Student's email"}
                       onChange={this.handleSelectedStudentChange}
                       value={selectedStudent}
                       suggestions={studentSuggestions}
                       style={autoCompeteStyle}/>
          <FormLabel>Lesson</FormLabel>
          <AutoCompete placeholder={"Lesson's number"}
                       onChange={this.handleSelectedLessonChange}
                       value={selectedLesson}
                       suggestions={lessonSuggestions}
                       style={autoCompeteStyle}/>
          <FormLabel>Mistake type</FormLabel>
          <AutoCompete placeholder={"Mistake type"}
                       onChange={this.handleSelectedMistakeTypeChange}
                       value={selectedMistakeType}
                       suggestions={mistakeTypeSuggestions}
                       style={autoCompeteStyle}/>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <FormError errorMessage={error}/>
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

export default AddMistakeForm