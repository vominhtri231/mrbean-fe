import * as React from "react";
import {IconButton, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import DialogContent from "@material-ui/core/DialogContent";
import LessonTemplateApi from "../../api/LessonTemplateApi";
import PaginationTable from "../common/table/PaginationTable";
import LessonTemplateDataRow from "./LessonTempateDataRow";
import SearchBar from "../common/SearchBar";
import AddLessonTemplateForm from "./AddLessonTemplateForm";
import Fab from "@material-ui/core/Fab";
import HomeworkTemplateInput from "./HomeworkTemplateInput";
import HomeworkTemplateApi from "../../api/HomeworkTemplateApi";
import ConfirmDialog from "../common/ConfirmDialog";
import EditLessonTemplateForm from "./EditLessonTemplateForm";
import Announce from "../common/Annouce";

class KlassTemplateSpecific extends React.Component {
  state = {
    lessonTemplateDetails: [],
    addingLessonTemplate: false,
    homeworkLessonId: undefined,
    selectedHomework: undefined,
    deletingHomeworkTemplate: undefined,
    deletingLessonTemplate: undefined,
    editingLessonTemplate: undefined,
    announce: undefined,
  };

  handleOpenAddLessonTemplateForm = () => {
    this.setState({addingLessonTemplate: true});
  };

  handleCloseAddLessonTemplateForm = () => {
    this.setState({addingLessonTemplate: false});
  };

  handleOpenEditLessonTemplateForm = (lessonTemplate) => {
    this.setState({editingLessonTemplate: lessonTemplate});
  };

  handleCloseEditLessonTemplateForm = () => {
    this.setState({editingLessonTemplate: undefined});
  };

  handleOpenDeleteLessonTemplateForm = (lessonTemplate) => {
    this.setState({deletingLessonTemplate: lessonTemplate});
  };

  handleCloseDeleteLessonTemplateForm = () => {
    this.setState({deletingLessonTemplate: undefined});
  };

  handleOpenAddHomeworkTemplateForm = (lessonId) => {
    this.setState({
      homeworkLessonId: lessonId, selectedHomework: undefined
    })
  };

  handleOpenEditHomeworkTemplateForm = (lessonId, selectedHomework) => {
    this.setState({
      homeworkLessonId: lessonId, selectedHomework: selectedHomework
    })
  };

  handleOpenDeleteHomeworkTemplateDialog = (lesson) => {
    this.setState({
      deletingHomeworkTemplate: lesson
    })
  };

  handleCloseDeleteHomeworkTemplateDialog = () => {
    this.setState({
      deletingHomeworkTemplate: undefined
    })
  };

  handleCloseHomeworkTemplateForm = () => {
    this.setState({
      homeworkLessonId: undefined, selectedHomework: undefined
    })
  };

  handleCloseAnnounce = () => {
    this.setState({announce: undefined});
  };

  search = (keyword) => {
    const {lessonTemplateDetails} = this.state;
    const searchedLessonTemplate = lessonTemplateDetails.map(lessonTemplateDetail => {
      lessonTemplateDetail.hide = !this.contain(lessonTemplateDetail, keyword);
      return lessonTemplateDetail
    });
    this.setState({lessonTemplateDetails: searchedLessonTemplate});
  };

  contain = (lessonTemplate, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return lessonTemplate.description.toLowerCase().includes(lowerKeyword);
  };

  deleteHomeworkTemplate = (id) => {
    HomeworkTemplateApi.deleteHomeworkTemplate(id).then(() => {
      const {lessonTemplateDetails} = this.state;
      const deletedHomeworkLessonTemplates = lessonTemplateDetails.map(lessonTemplate => {
        const deletedHomeworkTemplateList = lessonTemplate.homeworkTemplateList.filter(homework => homework.id !== id);
        return {...lessonTemplate, homeworkTemplateList: deletedHomeworkTemplateList}
      });
      const successAnnounce = {message: "Delete homework template successfully", variant: "success"};
      this.setState({lessonTemplateDetails: deletedHomeworkLessonTemplates, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Delete homework template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  addHomeworkTemplate = (name, lessonTemplateId, questions) => {
    HomeworkTemplateApi.createHomeworkTemplate(name, lessonTemplateId, questions).then(response => {
      const addingHomeworkTemplate = response.data;
      const {lessonTemplateDetails} = this.state;

      const addingHomeworkLessonTemplate = lessonTemplateDetails.filter(lesson => lesson.id === lessonTemplateId)[0];
      const originHomeworkTemplateList = addingHomeworkLessonTemplate.homeworkTemplateList;
      const addedHomeworkTemplateList = !!originHomeworkTemplateList ?
        originHomeworkTemplateList.concat(addingHomeworkTemplate)
        : [addingHomeworkTemplate];
      const addedHomeworkLessonTemplate = {
        ...addingHomeworkLessonTemplate,
        homeworkTemplateList: addedHomeworkTemplateList
      };

      const addedHomeworkLessonTemplates = lessonTemplateDetails.map(lessonTemplate => {
        if (lessonTemplate.id === lessonTemplateId) {
          return addedHomeworkLessonTemplate;
        }
        return lessonTemplate;
      });
      const successAnnounce = {message: "Create homework template successfully", variant: "success"};
      this.setState({lessonTemplateDetails: addedHomeworkLessonTemplates, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Create homework template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  editHomeworkTemplate = (id, name, lessonTemplateId, questions) => {
    HomeworkTemplateApi.updateHomeworkTemplate(id, name, questions).then(response => {
      const updatingHomeworkTemplate = response.data;
      const {lessonTemplateDetails} = this.state;

      const updatingHomeworkLessonTemplate = lessonTemplateDetails
        .filter(lessonTemplate => lessonTemplate.id === lessonTemplateId)[0];
      const originHomeworkTemplateList = updatingHomeworkLessonTemplate.homeworkTemplateList;
      const updatedHomeworkTemplateList = originHomeworkTemplateList
        .filter(homeworkTemplate => homeworkTemplate.id !== id)
        .concat(updatingHomeworkTemplate);
      const updatedHomeworkLessonTemplate = {
        ...updatingHomeworkLessonTemplate,
        homeworkTemplateList: updatedHomeworkTemplateList
      };

      const updatedHomeworkLessons = lessonTemplateDetails.map(lessonTemplate => {
        if (lessonTemplate.id === lessonTemplateId) {
          return updatedHomeworkLessonTemplate;
        }
        return lessonTemplate;
      });
      const successAnnounce = {message: "Update homework template successfully", variant: "success"};
      this.setState({lessonTemplateDetails: updatedHomeworkLessons, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Update homework template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  createLessonTemplate = (description, content) => {
    const {klassTemplate} = this.props;
    LessonTemplateApi.createLessonTemplate(description, content, klassTemplate.id).then(response => {
      const {lessonTemplateDetails} = this.state;
      const addedLessonTemplates = lessonTemplateDetails.concat(response.data);
      const successAnnounce = {message: "Create lesson template successfully", variant: "success"};
      this.setState({lessonTemplateDetails: addedLessonTemplates, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Create lesson template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  deleteLessonTemplate = (id) => {
    LessonTemplateApi.deleteLessonTemplate(id).then(() => {
      const {lessonTemplateDetails} = this.state;
      const deletedLessonTemplates = lessonTemplateDetails.filter(lessonTemplate => lessonTemplate.id !== id);
      const successAnnounce = {message: "Delete lesson template successfully", variant: "success"};
      this.setState({lessonTemplateDetails: deletedLessonTemplates, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Delete lesson template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  editLessonTemplate = (id, description, content) => {
    LessonTemplateApi.updateLessonTemplate(id, description, content).then(response => {
      const updatedLessonTemplate = response.data;
      const {lessonTemplateDetails} = this.state;
      const updatedLessonTemplates = lessonTemplateDetails.map(lessonTemplate =>
        lessonTemplate.id === id ?
          updatedLessonTemplate :
          lessonTemplate);
      const successAnnounce = {message: "Update lesson template successfully", variant: "success"};
      this.setState({lessonTemplateDetails: updatedLessonTemplates, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Update lesson template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.klassTemplate) !== JSON.stringify(this.props.klassTemplate)
      && this.props.klassTemplate) {
      await this.init();
    }
  }

  init = async () => {
    const {klassTemplate} = this.props;
    const response = await LessonTemplateApi.getAllOfClass(klassTemplate.id);
    this.setState({lessonTemplateDetails: response.data})
  };

  render() {
    const {open, handleClose, klassTemplate} = this.props;
    const {
      lessonTemplateDetails, addingLessonTemplate,
      homeworkLessonId, selectedHomework, deletingHomeworkTemplate,
      deletingLessonTemplate, editingLessonTemplate, announce
    } = this.state;
    if (!klassTemplate) return <></>;
    return <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
    >
      <DialogTitle style={{backgroundColor: '#d9dbdd', padding: '3px'}}>
        <IconButton style={{position: 'absolute', right: 20, top: 0}} onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
        {`Template: ${klassTemplate.name}`}
        <SearchBar searchPlaceHolder={"Search by description"}
                   onSearch={this.search} onReload={this.init}
                   style={{width: '500px', display: 'inline-block', marginLeft: '50px'}}/>
      </DialogTitle>
      <DialogContent>
        {this.renderKlassTemplates(lessonTemplateDetails)}
      </DialogContent>
      <Fab style={{position: 'fixed', bottom: 20, right: 20}}
           color='primary' onClick={this.handleOpenAddLessonTemplateForm}>
        <AddIcon/>
      </Fab>
      <AddLessonTemplateForm
        open={addingLessonTemplate}
        handleClose={this.handleCloseAddLessonTemplateForm}
        handleSubmit={this.createLessonTemplate}
      />
      <EditLessonTemplateForm
        open={!!editingLessonTemplate}
        lesson={editingLessonTemplate}
        handleClose={this.handleCloseEditLessonTemplateForm}
        handleSubmit={this.editLessonTemplate}
      />
      <HomeworkTemplateInput
        open={!!homeworkLessonId}
        lessonId={homeworkLessonId}
        homework={selectedHomework}
        addHomework={this.addHomeworkTemplate}
        editHomework={this.editHomeworkTemplate}
        handleClose={this.handleCloseHomeworkTemplateForm}
      />
      {!!deletingHomeworkTemplate && <ConfirmDialog
        open={!!deletingHomeworkTemplate}
        title={`Do you want to delete homework with name : ${deletingHomeworkTemplate.name}`}
        handleSubmit={() => this.deleteHomeworkTemplate(deletingHomeworkTemplate.id)}
        handleClose={this.handleCloseDeleteHomeworkTemplateDialog}
      />}
      {!!deletingLessonTemplate && <ConfirmDialog
        open={!!deletingLessonTemplate}
        title={`Do you want to delete lesson template with description : ${deletingLessonTemplate.description}`}
        handleSubmit={() => this.deleteLessonTemplate(deletingLessonTemplate.id)}
        handleClose={this.handleCloseDeleteLessonTemplateForm}
      />}
      {!!announce && <Announce
        message={announce.message} variant={announce.variant}
        onClose={this.handleCloseAnnounce} open
      />}
    </Dialog>
  }

  renderKlassTemplates = (lessonTemplates) => {
    if (lessonTemplates.every(lessonTemplate => lessonTemplate.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no lesson template
        </Typography>
      )
    }
    return (
      <PaginationTable
        style={{marginTop: 20}}
        data={lessonTemplates.filter(klassTemplate => !klassTemplate.hide)}
        headers={["Description", "Homework", ""]}
        renderRow={lessonTemplate =>
          <LessonTemplateDataRow
            key={lessonTemplate.id}
            data={lessonTemplate}
            addHomeworkTemplate={this.handleOpenAddHomeworkTemplateForm}
            deleteHomeworkTemplate={this.handleOpenDeleteHomeworkTemplateDialog}
            editHomeworkTemplate={this.handleOpenEditHomeworkTemplateForm}
            onEdit={this.handleOpenEditLessonTemplateForm}
            onDelete={this.handleOpenDeleteLessonTemplateForm}
          />}
      />
    )
  }
}

export default KlassTemplateSpecific