import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import QuestionAnswer from "./QuestionAnswer";

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
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default HomeworkSpec;
