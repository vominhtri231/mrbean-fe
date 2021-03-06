import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {IconButton, TextField} from "@material-ui/core";
import QuestionAnswer from "./QuestionAnswer";
import CloseIcon from "@material-ui/icons/Close"

class HomeworkSpec extends React.Component {
  handleChooseChange = (index, choice) => {
  };

  render() {
    const {open, handleClose, homework} = this.props;
    return <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
    >
      <DialogTitle style={{backgroundColor: '#b7b38d', padding: '5px 20px 5px 20px'}}>
        <TextField
          value={homework.name}
          onChange={this.handleNameChange}
          label={"Homework name"}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          style={{marginLeft: 20}}
          label="Death line"
          type="date"
          value={homework.deathLine}
          onChange={this.handleDeathLineChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <IconButton style={{position: 'absolute', right: 20}} onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent style={{backgroundColor: '#d9dbdd'}}>
        {homework.questions.map((question, i) =>
          <QuestionAnswer
            key={i}
            index={i}
            question={question}
            chooseChange={this.handleChooseChange}/>)
        }
      </DialogContent>
    </Dialog>
  }
}

export default HomeworkSpec;
