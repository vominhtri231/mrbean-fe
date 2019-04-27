import * as React from "react";
import {FormControl, Radio} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";

class QuestionAnswer extends React.Component {
  handleChooseChange = (e) => {
    const {chooseChange, index} = this.props;
    chooseChange(index, parseInt(e.target.value));
  };

  render() {
    const {question, choice} = this.props;
    const questionText = question.questionText;
    const answers = question.answers;
    return <Paper elevation={10} style={{marginTop: 30, width: '100%'}}>
      <FormControl fullWidth style={{marginTop: 16, marginLeft: 20}}>
        <FormLabel component="legend">{questionText}</FormLabel>
        <RadioGroup
          value={choice + ""}
          onChange={this.handleChooseChange}
        >
          {answers.map((answer, i) =>
            <FormControlLabel key={i} value={i + ""} control={<Radio/>} label={answer}/>
          )}
        </RadioGroup>
      </FormControl>
    </Paper>
  }
}

export default QuestionAnswer;
