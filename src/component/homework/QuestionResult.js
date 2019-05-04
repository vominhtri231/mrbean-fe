import * as React from "react";
import {FormControl, Radio} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";

class QuestionResult extends React.Component {
  render() {
    const {question, choice, correctAnswer} = this.props;
    const questionText = question.questionText;
    const answers = question.answers;
    return <Paper elevation={10} style={{marginTop: 30, width: '100%'}}>
      <FormControl fullWidth style={{marginTop: 16, marginLeft: 20}}>
        <FormLabel component="legend">{questionText}</FormLabel>
        <RadioGroup
          value={choice + ""}
        >
          {answers.map((answer, i) => {
            if (correctAnswer === i) answer += "(Correct answer)";
            return <FormControlLabel key={i} value={i + ""} control={<Radio/>} label={answer}/>
          })}
        </RadioGroup>
      </FormControl>
    </Paper>
  }
}

export default QuestionResult;
