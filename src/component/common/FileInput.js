import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile"
import TextField from "@material-ui/core/TextField";

class FileInput extends React.Component {
  state = {
    openFileInput: false,
    files: undefined
  };

  fileInput = React.createRef();

  handleChangeFile = (event) => {
    const {onChange} = this.props;
    this.setState({files: event.target.files});
    onChange(event.target.files);
  };

  handleOpenFileInput = () => {
    this.fileInput.current.click();
  };

  render() {
    const {accept} = this.props;
    const {files} = this.state;
    const fileName = files && files[0] ? files[0].name : "";
    return <div style={{marginTop: 20}}>
      <input type={"file"}
             style={{display: "none"}}
             onChange={this.handleChangeFile}
             ref={this.fileInput}
             accept={accept}/>
      <IconButton onClick={this.handleOpenFileInput} >
        <AttachFileIcon/>
      </IconButton>
      <TextField
        label="Student list"
        value={fileName}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  }
}

export default FileInput;