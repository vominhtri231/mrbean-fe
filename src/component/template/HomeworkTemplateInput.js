import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import QuestionInput from "../homework/QuestionInput";

class HomeworkInput extends React.Component {
  state = {
    name: "",
    questions: [],
  };

  handleSubmitAddHomework = () => {
    const {addHomework, lessonId, handleClose} = this.props;
    const {questions, name} = this.state;
    addHomework(name, lessonId, questions);
    handleClose();
  };

  handleSubmitEditHomework = () => {
    const {editHomework, lessonId, homework, handleClose} = this.props;
    const {questions, name} = this.state;
    editHomework(homework.id, name, lessonId, questions);
    handleClose();
  };

  handleAddQuestion = () => {
    const {questions} = this.state;
    const addedQuestions = questions.concat({
      questionText: "",
      answers: ["", "", "", ""],
      correctAnswer: 0
    });
    this.setState({questions: addedQuestions})
  };

  questionChange = (index, newQuestion) => {
    const {questions} = this.state;
    const updatedQuestions = Object.assign([], questions, {[index]: newQuestion});
    this.setState({questions: updatedQuestions});
  };

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.homework) !== JSON.stringify(prevProps.homework)) {
      const homework = this.props.homework;
      if (!!homework) {
        this.setState({
          name: homework.name,
          questions: homework.questions,
        })
      } else {
        this.setState({
          name: "",
          questions: [],
        })
      }
    }
  }

  render() {
    const {open, handleClose, homework} = this.props;
    const {questions, name} = this.state;
    const addMode = !homework;
    return <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
    >
      <DialogTitle style={{backgroundColor: '#b7b38d', padding: '5px 20px 5px 20px'}}>
        <TextField value={name}
                   onChange={this.handleNameChange}
                   label={"Homework name"}
        />
        <Button variant="contained" color="primary"
                style={{position: 'absolute', right: 30, top: '10px'}}
                onClick={this.handleAddQuestion}>
          Add question
        </Button>
      </DialogTitle>
      <DialogContent style={{backgroundColor: '#d9dbdd'}}>
        {questions.map((question, i) =>
          <QuestionInput question={question} key={i} index={i}
                         onQuestionChange={this.questionChange}/>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {addMode ?
          <Button onClick={this.handleSubmitAddHomework} color="primary">
            Create new homework
          </Button>
          : <Button onClick={this.handleSubmitEditHomework} color="primary">
            Update homework
          </Button>
        }
      </DialogActions>
    </Dialog>
  }
}

export default HomeworkInput;
