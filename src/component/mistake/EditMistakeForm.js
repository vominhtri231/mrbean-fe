import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl} from "@material-ui/core";
import AutoCompete from "../common/AutoCompete";
import FormLabel from "@material-ui/core/FormLabel";

class EditMistakeForm extends React.Component {
  state = {
    selectedStudent: undefined,
    selectedLesson: undefined,
    selectedMistakeType: undefined,
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit, mistake, handleClose} = this.props;
    const {selectedStudent, selectedLesson, selectedMistakeType} = this.state;
    const student = selectedStudent.value;
    const lesson = selectedLesson.value;
    const mistakeType = selectedMistakeType.value;
    handleSubmit(mistake.id, student, lesson, mistakeType);
    handleClose();
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

  async componentDidUpdate(prevProps) {
    const {mistake} = this.props;
    if (JSON.stringify(mistake) !== JSON.stringify(prevProps.mistake) && mistake) {
      const student = mistake.student;
      const lesson = mistake.lesson;
      const mistakeType = mistake.mistakeType;
      const selectedStudent = {
        value: student,
        label: student.email
      };
      const selectedLesson = {
        value: lesson,
        label: lesson.lessonNumber
      };
      const selectedMistakeType = {
        value: mistakeType,
        label: mistakeType.name
      };
      this.setState({selectedStudent, selectedLesson, selectedMistakeType})
    }
  }

  render() {
    const {open, handleClose, students, lessons, mistakeTypes} = this.props;
    const {selectedStudent, selectedLesson, selectedMistakeType,} = this.state;

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
        Update mistake
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

export default EditMistakeForm