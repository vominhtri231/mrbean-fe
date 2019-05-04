import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {IconButton, TextField} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close"
import QuestionResult from "./QuestionResult";
import Typography from "@material-ui/core/Typography";

class HomeworkWorksheetResult extends React.Component {
  render() {
    const {open, handleClose, homework, choices} = this.props;
    const questions = homework.questions;
    const name = homework.name;
    const deathLine = homework.deathLine;
    const ended = homework.ended;

    return <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
    >
      <DialogTitle style={{backgroundColor: '#b7b38d', padding: '5px 20px 5px 20px'}}>
        <TextField
          value={name}
          label={"Homework name"}
          InputLabelProps={{
            readOnly: true,
          }}
        />
        <TextField
          style={{marginLeft: 20}}
          label="Death line"
          type="date"
          value={deathLine}
          InputLabelProps={{
            readOnly: true,
          }}
        />
        <IconButton style={{position: 'absolute', right: 20}} onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent style={{backgroundColor: '#d9dbdd'}}>
        {!choices ?
          <Typography>You did not do this homework</Typography> :
          questions.map((question, i) =>
            <QuestionResult
              key={i}
              index={i}
              correctAnswer={ended ? question.correctAnswer : undefined}
              question={question}
              choice={choices[i]}
            />)
        }
      </DialogContent>
    </Dialog>
  }
}

export default HomeworkWorksheetResult;
