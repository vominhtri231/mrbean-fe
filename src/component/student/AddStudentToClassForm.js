import * as React from "react";
import {FormControl} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormLabel from "@material-ui/core/FormLabel";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AutoCompete from "../common/AutoCompete";
import Validater from "../../util/Validater";
import FormError from "../common/FormError";

class AddStudentToClassForm extends React.Component {
  state = {
    selectedStudents: [],
    error: undefined
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit, handleClose} = this.props;
    const {selectedStudents} = this.state;
    const validateResult = Validater.validateAddLesson(selectedStudents);
    if (validateResult) {
      this.setState({error: validateResult});
      return;
    }
    this.setState({
      selectedStudents: [],
      error: undefined
    });
    handleSubmit(selectedStudents.map(selectedStudent => selectedStudent.value));
    handleClose();
  };

  handleSelectedStudentChange = (value) => {
    this.setState({selectedStudents: value})
  };

  render() {
    const {open, handleClose, students} = this.props;
    const {selectedStudents, error} = this.state;
    const suggestions = students.map(student => ({
      value: student,
      label: student.email
    }));
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add student to class</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{marginTop: "20px"}}>
          <FormLabel style={{marginBottom: 20}}>Students</FormLabel>
          <AutoCompete placeholder={"Student's email"}
                       onChange={this.handleSelectedStudentChange}
                       value={selectedStudents}
                       suggestions={suggestions}
                       isMulti/>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <FormError errorMessage={error}/>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Add to class
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default AddStudentToClassForm;