import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import QuestionInput from "./QuestionInput";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import DateUtils from "../../util/DateUtils";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class HomeworkInput extends React.Component {
  state = {
    name: "",
    deathLine: DateUtils.getCurrentDate(),
    questions: [],
    ended: false,
    error: undefined,
  };

  handleSubmitAddHomework = () => {
    const {addHomework, lessonId, handleClose} = this.props;
    const {questions, name, deathLine} = this.state;
    const validateResult = Validater.validateHomework(name, questions);
    if (validateResult) {
      this.setState({error: validateResult});
      return;
    }
    addHomework(name, deathLine, lessonId, questions);
    handleClose();
  };

  handleSubmitEditHomework = () => {
    const {editHomework, lessonId, homework, handleClose} = this.props;
    const {questions, name, deathLine} = this.state;
    const validateResult = Validater.validateHomework(name, questions);
    if (validateResult) {
      this.setState({error: validateResult});
      return;
    }
    editHomework(homework.id, name, deathLine, lessonId, questions);
    handleClose();
  };

  handleEndHomework = () => {
    const {endHomework, homework, handleClose} = this.props;
    endHomework(homework);
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

  handleDeathLineChange = (e) => {
    this.setState({deathLine: e.target.value})
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.homework) !== JSON.stringify(prevProps.homework)) {
      const homework = this.props.homework;
      if (!!homework) {
        this.setState({
          name: homework.name,
          deathLine: homework.deathLine,
          questions: homework.questions,
          ended: homework.ended,
        })
      } else {
        this.setState({
          name: "",
          deathLine: DateUtils.getCurrentDate(),
          questions: [],
          ended: false,
        })
      }
    }
  }

  render() {
    const {open, handleClose, homework} = this.props;
    const {questions, name, deathLine, ended, error} = this.state;
    const addMode = !homework;
    const today = DateUtils.getCurrentDate();
    const over = today > deathLine;
    return <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
    >
      <DialogTitle style={{backgroundColor: '#b7b38d', padding: '5px 20px 5px 20px'}}>
        <TextField value={name}
                   disabled={!!ended}
                   onChange={this.handleNameChange}
                   label={"Homework name"}
        />
        <TextField
          style={{marginLeft: 20}}
          disabled={!!ended}
          label="Death line"
          type="date"
          value={deathLine}
          onChange={this.handleDeathLineChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {over && !addMode && !ended &&
        <Button variant="contained" color="primary"
                style={{top: '8px', marginLeft: 20}}
                onClick={this.handleEndHomework}>
          End this homework
        </Button>}
        {!ended && <Button variant="contained" color="primary"
                           style={{position: 'absolute', right: 30, top: '10px'}}
                           onClick={this.handleAddQuestion}>
          Add question
        </Button>}
      </DialogTitle>
      <DialogContent style={{backgroundColor: '#d9dbdd'}}>
        {questions.map((question, i) =>
          <QuestionInput question={question} key={i} index={i}
                         onQuestionChange={this.questionChange}/>)}
      </DialogContent>
      <DialogActions>
        <FormError errorMessage={error}/>
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
