import * as React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {FormControl, FormLabel, Radio} from "@material-ui/core";

class QuestionInput extends React.Component {
  handleQuestionChange = (event) => {
    const {question, index, onQuestionChange} = this.props;
    const changedQuestion = {...question, questionText: event.target.value};
    onQuestionChange(index, changedQuestion);
  };

  handleAnswerChange = (indexAnswer, event) => {
    const {question, index, onQuestionChange} = this.props;
    const updatedAnswer = Object.assign([], question.answers, {[indexAnswer]: event.target.value});
    const changedQuestion = {...question, answers: updatedAnswer};
    onQuestionChange(index, changedQuestion);
  };

  handleCorrectAnswerChange = (event) => {
    const {question, index, onQuestionChange} = this.props;
    const changedQuestion = {...question, correctAnswer: parseInt(event.target.value)};
    onQuestionChange(index, changedQuestion);
  };

  render() {
    const {question} = this.props;
    const questionText = question.questionText;
    const answers = question.answers;
    const correctAnswer = parseInt(question.correctAnswer);
    return <Paper elevation={10} style={{marginTop: 30, width: '100%'}}>
      <FormControl fullWidth style={{marginLeft: 20, padding: 0}}>
        <TextField
          autoFocus
          margin="dense"
          placeholder="Question"
          value={questionText}
          multiline
          style={{width: 1100}}
          onChange={this.handleQuestionChange}
        />
        {answers.map((answer, i) => {
          return <div key={i} style={{marginLeft: 20}}>
            <TextField
              placeholder={"Answer " + i}
              style={{width: 400}}
              value={answer}
              onChange={(e) => this.handleAnswerChange(i, e)}
            />
            <Radio
              checked={correctAnswer === i}
              value={i}
              onChange={this.handleCorrectAnswerChange}
            />
            {correctAnswer === i &&
            <FormLabel>(Correct answer)</FormLabel>}
          </div>
        })}
      </FormControl>
    </Paper>
  }
}

export default QuestionInput;
