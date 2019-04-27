import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Draggable from 'react-draggable';

class ConfirmDialog extends React.Component {
  render() {
    const {open, handleClose, title} = this.props;
    return <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={(props) =>
        <Draggable>
          <Paper {...props} />
        </Draggable>}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  }

  handleSubmitButtonClick = () => {
    const {handleClose, handleSubmit} = this.props;
    handleSubmit();
    handleClose();
  }
}

export default ConfirmDialog;