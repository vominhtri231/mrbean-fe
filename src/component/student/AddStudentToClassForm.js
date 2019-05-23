import * as React from "react";
import {FormControl} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormLabel from "@material-ui/core/FormLabel";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AutoCompete from "../common/AutoCompete";
import StudentApi from "../../api/StudentApi";

class AddStudentToClassForm extends React.Component {
  state = {
    students: [],
    selectedStudents: [],
  };

  handleSubmitButtonClick = () => {
    const {handleSubmit, handleClose} = this.props;
    const {selectedStudents} = this.state;
    handleSubmit(selectedStudents.map(selectedStudent => selectedStudent.value));
    handleClose();
  };

  handleSelectedStudentChange = (value) => {
    this.setState({selectedStudents: value})
  };

  async componentDidMount() {
    const response = await StudentApi.getAll();
    const students = response.data;
    this.setState({students});
  }

  render() {
    const {open, handleClose} = this.props;
    const {students, selectedStudents} = this.state;
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