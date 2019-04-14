import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileInput from "../../common/FileInput";
import readXlsxFile from "read-excel-file";
import {FormControl} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import appConstants from "../../../util/appConstants";

class AddClassForm extends React.Component {
  state = {
    name: "",
    description: "",
    files: undefined,
    chosenTeacherId: undefined
  };

  handleSubmitButtonClick = async () => {
    const {name, description, chosenTeacherId, files} = this.state;
    const {handleClose, handleSubmit} = this.props;
    if (!files || !files[0]) return;
    const students = await this.xlsxFileToStudents(files[0]);
    console.log(students);
    handleSubmit(name, description, chosenTeacherId, students);
    handleClose();
  };

  async xlsxFileToStudents(file) {
    //TODO create form to match rows with student's properties
    return await readXlsxFile(file).then(rows => {
      console.log(rows);
      const students = [];
      for (let i = 1; i < rows.length; i++) {
        const dataRow = rows[i];
        students.push({
          email: dataRow[1], phoneNumber: dataRow[2], name: dataRow[3],
          dateOfBirth: dataRow[4], isWorker: dataRow[5], workspace: dataRow[6],
        });
      }
      return students;
    });
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  handleTeacherChange = (event) => {
    this.setState({chosenTeacherId: event.target.value});
  };

  handleFileChange = (files) => {
    this.setState({files});
  };

  render() {
    const {open, handleClose, teachers} = this.props;
    const {chosenTeacherId} = this.state;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Create new class</DialogTitle>
      <DialogContent>
        <form style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            onChange={this.handleNameChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            onChange={this.handleDescriptionChange}
            label="Description"
            fullWidth
          />
          <FormControl fullWidth style={{marginTop: 16}}>
            {!chosenTeacherId && <InputLabel>teacher</InputLabel>}
            <Select
              value={chosenTeacherId}
              onChange={this.handleTeacherChange}
            >
              {teachers.map(teacher =>
                <MenuItem value={teacher.id} key={teacher.id}>
                  <em>{teacher.name + " - " + teacher.email}</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FileInput
            onChange={this.handleFileChange}
            accept={appConstants.excelType}/>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Create new
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default AddClassForm