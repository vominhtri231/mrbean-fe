import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import StudentApi from "../../api/StudentApi";
import LessonApi from "../../api/LessonApi";
import MistakeTypeApi from "../../api/MistakeTypeApi";
import {FormControl} from "@material-ui/core";
import AutoCompete from "../common/AutoCompete";
import FormLabel from "@material-ui/core/FormLabel";

class AddMistakeForm extends React.Component {
  state = {
    students: [],
    lessons: [],
    mistakeTypes: [],
    selectedStudent: undefined,
    selectedLesson: undefined,
    selectedMistakeType: undefined,
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit} = this.props;
    const {selectedStudent, selectedLesson, selectedMistakeType} = this.state;
    const student = selectedStudent.value;
    const lesson = selectedLesson.value;
    const mistakeType = selectedMistakeType.value;
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

  async componentDidMount() {
    const {klassId} = this.props;
    await this.init(klassId)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.klassId !== this.props.klassId) {
      await this.init(this.props.klassId)
    }
  }

  init = async (klassId) => {
    const studentResponse = await StudentApi.getAllOfClass(klassId);
    const students = studentResponse.data;
    const lessonResponse = await LessonApi.getAllOfClass(klassId);
    const lessons = lessonResponse.data;
    const mistakeTypeResponse = await MistakeTypeApi.getAll();
    const mistakeTypes = mistakeTypeResponse.data;
    this.setState({students, lessons, mistakeTypes});
  };

  render() {
    const {open, handleClose} = this.props;
    const {
      selectedStudent, selectedLesson, selectedMistakeType,
      students, lessons, mistakeTypes
    } = this.state;

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