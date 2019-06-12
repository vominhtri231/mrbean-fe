import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import {DialogContent, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import LessonAttendanceApi from "../../api/LessonAttendanceApi";

class CheckAttendanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonAttendances: []
    };
  }

  handleSubmitButtonClick = () => {
    const {handleClose, handleSubmit} = this.props;
    const {lessonAttendances} = this.state;
    handleSubmit(lessonAttendances);
    handleClose();
  };

  componentDidMount() {
    LessonAttendanceApi.getAllOfLesson(this.props.lessonId).then(response => {
      this.setState({
        lessonAttendances: response.data
      });
    });
  }

  handleToggle = lessonAttendanceId => () => {
    const {lessonAttendances} = this.state;
    const updatedLessonAttendances = lessonAttendances.map(lessonAttendance =>
      lessonAttendance.id === lessonAttendanceId ?
        {...lessonAttendance, attend: !lessonAttendance.attend}
        : lessonAttendance);
    this.setState({lessonAttendances: updatedLessonAttendances});
  };

  render() {
    const {open, handleClose} = this.props;
    const {lessonAttendances} = this.state;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent style={{width: '500px'}}>
        {lessonAttendances.map(lessonAttendance => <ListItem
            key={lessonAttendance.id} button>
            <ListItemText
              primary={lessonAttendance.student.name}
              secondary={lessonAttendance.student.email}/>
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(lessonAttendance.id)}
                checked={lessonAttendance.attend}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default CheckAttendanceForm;