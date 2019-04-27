import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import QuestionAnswer from "./QuestionAnswer";

class DoHomework extends React.Component {
  state = {
    choices: []
  };

  handleSaveHomework = () => {
    const {handleSubmit, handleClose, homework} = this.props;
    const {choices} = this.state;
    handleSubmit(homework.id, choices);
    handleClose();
  };

  handleChooseChange = (index, choice) => {
    const {choices} = this.state;
    const updatedChoices = Object.assign([], choices, {[index]: choice});
    this.setState({choices: updatedChoices});
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.homework) !== JSON.stringify(prevProps.homework) ||
      JSON.stringify(this.props.choices) !== JSON.stringify(prevProps.choices)) {
      this.init();
    }
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const {choices} = this.props;
    if (choices) {
      this.setState({choices})
    }
  };

  render() {
    const {open, handleClose, homework} = this.props;
    const {choices} = this.state;
    const questions = homework.questions;
    const name = homework.name;
    const deathLine = homework.deathLine;

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
      </DialogTitle>
      <DialogContent style={{backgroundColor: '#d9dbdd'}}>
        {questions.map((question, i) =>
          <QuestionAnswer
            key={i}
            index={i}
            question={question}
            choice={choices[i]}
            chooseChange={this.handleChooseChange}/>)
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSaveHomework} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default DoHomework;
