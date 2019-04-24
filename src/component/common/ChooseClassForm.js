import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class ChooseClassForm extends React.Component {
  state = {
    selectedKlassId: undefined
  };

  handleSubmitButtonClick = async () => {
    const {handleSubmit, handleClose} = this.props;
    const {selectedKlassId} = this.state;
    handleSubmit(selectedKlassId);
    handleClose();
  };

  handleClassChange = (event) => {
    this.setState({selectedKlassId: event.target.value.toString()});
  };

  componentDidMount() {
    const {klasses} = this.props;
    this.setState({selectedKlassId: klasses[0].id.toString()});
  }

  render() {
    const {open, handleClose, klasses} = this.props;
    const {selectedKlassId} = this.state;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Choose a class</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <RadioGroup
            value={selectedKlassId}
            name="class"
            onChange={this.handleClassChange}
          >
            {
              klasses.map((klass) => {
                return <FormControlLabel
                  value={klass.id.toString()}
                  control={<Radio/>}
                  label={klass.name}
                  key={klass.id}/>
              })
            }
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmitButtonClick} color="primary">
          Choose
        </Button>
      </DialogActions>
    </Dialog>
  }
}

export default ChooseClassForm