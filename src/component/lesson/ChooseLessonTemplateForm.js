import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import KlassTemplateApi from "../../api/KlassTemplateApi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder"
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import FolderOpenIcon from "@material-ui/icons/FolderOpen"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"

class ChooseLessonTemplateForm extends React.Component {
  state = {
    klassTemplates: [],
    chosenLessonTemplateId: undefined,
  };

  changeOpenStateKlassTemplate = (klassTemplateId) => {
    const {klassTemplates} = this.state;
    const changedKlassTemplates = klassTemplates.map(klassTemplate =>
      klassTemplate.id === klassTemplateId ?
        {...klassTemplate, open: !klassTemplate.open} :
        klassTemplate);
    this.setState({klassTemplates: changedKlassTemplates})
  };

  changeChosenLessonTemplateId = (lessonTemplateId) => {
    this.setState({chosenLessonTemplateId: lessonTemplateId});
  };

  handleSubmitButtonClick = () => {
    const {handleClose, handleSubmit} = this.props;
    const {chosenLessonTemplateId} = this.state;
    handleSubmit(chosenLessonTemplateId);
    handleClose();
  };

  async componentDidMount() {
    const response = await KlassTemplateApi.getKlassTemplates();
    this.setState({klassTemplates: response.data});
  }

  render() {
    const {handleClose, open} = this.props;
    const {klassTemplates, chosenLessonTemplateId} = this.state;
    return <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Choose lesson template</DialogTitle>
      <DialogContent>
        <List component="nav">
          {klassTemplates.map(klassTemplate =>
            <div key={klassTemplate.id}>
              <ListItem button
                        onClick={() => this.changeOpenStateKlassTemplate(klassTemplate.id)}>
                <ListItemIcon>
                  {!klassTemplate.open ? <FolderIcon/> : <FolderOpenIcon/>}
                </ListItemIcon>
                <ListItemText
                  inset primary={klassTemplate.name}
                />
              </ListItem>
              <Collapse in={!!klassTemplate.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {klassTemplate.lessonTemplates.map(lessonTemplate =>
                    <ListItem key={lessonTemplate.id} button
                              onClick={() => this.changeChosenLessonTemplateId(lessonTemplate.id)}>
                      <ListItemIcon>
                        {lessonTemplate.id === chosenLessonTemplateId ?
                          <StarIcon/> :
                          <StarBorderIcon/>}
                      </ListItemIcon>
                      <ListItemText inset primary={lessonTemplate.description}/>
                    </ListItem>)}
                </List>
              </Collapse>
            </div>
          )}
        </List>
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

export default ChooseLessonTemplateForm;