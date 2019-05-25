import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/styles";
import SearchBar from "../common/SearchBar";
import Typography from "@material-ui/core/Typography";
import PaginationTable from "../common/table/PaginationTable";
import ConfirmDialog from "../common/ConfirmDialog";
import KlassTemplateApi from "../../api/KlassTemplateApi";
import KlassTemplateDataRow from "./KlassTemplateDataRow";
import AddKlassTemplateForm from "./AddKlassTemplateForm";
import EditKlassTemplateForm from "./EditKlassTemplateForm";
import KlassTemplateSpecific from "./KlassTemplateSpecific";
import Announce from "../common/Annouce";

const styles = {
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
  list: {
    width: '100%',
  },
};

class TemplateContent extends React.Component {
  state = {
    klassTemplates: [],
    openAddKlassTemplateForm: false,
    deletingKlassTemplate: undefined,
    editingKlassTemplate: undefined,
    watchingKlassTemplate: undefined,
    announce: undefined,
  };

  handleOpenAddKlassTemplateForm = () => {
    this.setState({openAddKlassTemplateForm: true});
  };

  handleCloseAddKlassTemplateForm = () => {
    this.setState({openAddKlassTemplateForm: false});
  };

  handleOpenDeleteKlassTemplateDialog = (klass) => {
    this.setState({deletingKlassTemplate: klass});
  };

  handleCloseDeleteKlassTemplateDialog = () => {
    this.setState({deletingKlassTemplate: undefined});
  };

  handleOpenEditKlassTemplateDialog = (klass) => {
    this.setState({editingKlassTemplate: klass});
  };

  handleCloseEditKlassTemplateDialog = () => {
    this.setState({editingKlassTemplate: undefined});
  };

  handleOpenKlassTemplateSpecific = (klass) => {
    this.setState({watchingKlassTemplate: klass});
  };

  handleCloseKlassTemplateSpecific = () => {
    this.setState({watchingKlassTemplate: undefined});
  };

  handleCloseAnnounce = () => {
    this.setState({announce: undefined});
  };

  search = (keyword) => {
    const {klassTemplates} = this.state;
    const searchedKlassTemplates = klassTemplates.map(klassTemplate => {
      klassTemplate.hide = !this.contain(klassTemplate, keyword);
      return klassTemplate
    });
    this.setState({klassTemplates: searchedKlassTemplates});
  };

  contain = (klassTemplate, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return klassTemplate.name.toLowerCase().includes(lowerKeyword);
  };

  createKlassTemplate = async (name) => {
    KlassTemplateApi.createKlassTemplate(name).then(response => {
      const {klassTemplates} = this.state;
      const addedKlassTemplates = klassTemplates.concat(response.data);
      const successAnnounce = {message: "Create template successfully", variant: "success"};
      this.setState({klassTemplates: addedKlassTemplates, announce: successAnnounce})
    }).catch(response => {
      const errorAnnounce = {message: "Create template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  updateKlassTemplate = (id, name) => {
    KlassTemplateApi.updateKlassTemplate(id, name).then(response => {
      const updatedKlassTemplate = response.data;
      const {klassTemplates} = this.state;
      const updatedKlassTemplates = klassTemplates.map(klassTemplate => {
        if (klassTemplate.id === updatedKlassTemplate.id) {
          return updatedKlassTemplate;
        }
        return klassTemplate;
      });
      const successAnnounce = {message: "Update template successfully", variant: "success"};
      this.setState({klassTemplates: updatedKlassTemplates, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Update template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  deleteKlassTemplate = (id) => {
    KlassTemplateApi.deleteKlassTemplate(id).then(() => {
      const {klassTemplates} = this.state;
      const deletedKlassTemplates = klassTemplates.filter(klassTemplate => klassTemplate.id !== id);
      const successAnnounce = {message: "Delete template successfully", variant: "success"};
      this.setState({klassTemplates: deletedKlassTemplates, announce: successAnnounce})
    }).catch(response => {
      const errorAnnounce = {message: "Delete template fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  getKlassTemplates = async () => {
    const response = await KlassTemplateApi.getKlassTemplates();
    this.setState({klassTemplates: response.data})
  };

  async componentDidMount() {
    await this.getKlassTemplates();
  };

  render() {
    const {
      klassTemplates, openAddKlassTemplateForm, deletingKlassTemplate,
      editingKlassTemplate, watchingKlassTemplate, announce
    } = this.state;
    const {classes} = this.props;
    return (
      <div>
        <SearchBar searchPlaceHolder={"Search by template name"}
                   onSearch={this.search} onReload={this.getKlassTemplates}/>
        <div>
          {this.renderKlassTemplates(klassTemplates)}
        </div>
        <Fab className={classes.fab} color='primary' onClick={this.handleOpenAddKlassTemplateForm}>
          <AddIcon/>
        </Fab>
        <AddKlassTemplateForm open={openAddKlassTemplateForm}
                              handleClose={this.handleCloseAddKlassTemplateForm}
                              handleSubmit={this.createKlassTemplate}/>
        <EditKlassTemplateForm
          open={!!editingKlassTemplate}
          klass={editingKlassTemplate}
          handleClose={this.handleCloseEditKlassTemplateDialog}
          handleSubmit={this.updateKlassTemplate}/>
        <KlassTemplateSpecific open={!!watchingKlassTemplate}
                               klassTemplate={watchingKlassTemplate}
                               handleClose={this.handleCloseKlassTemplateSpecific}/>
        {!!deletingKlassTemplate && <ConfirmDialog
          open={!!deletingKlassTemplate}
          title={`Do you want to delete class : ${deletingKlassTemplate.name}`}
          handleSubmit={() => this.deleteKlassTemplate(deletingKlassTemplate.id)}
          handleClose={this.handleCloseDeleteKlassTemplateDialog}
        />}
        {!!announce && <Announce
          message={announce.message} variant={announce.variant}
          onClose={this.handleCloseAnnounce} open
        />}
      </div>
    );
  }

  renderKlassTemplates = (klassTemplates) => {
    if (klassTemplates.every(klassTemplate => klassTemplate.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no templates
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={klassTemplates.filter(klassTemplate => !klassTemplate.hide)}
        headers={["Name", ""]}
        renderRow={klassTemplate =>
          <KlassTemplateDataRow
            key={klassTemplate.id}
            data={klassTemplate}
            onDelete={this.handleOpenDeleteKlassTemplateDialog}
            onOpenSpecific={this.handleOpenKlassTemplateSpecific}
            onEdit={this.handleOpenEditKlassTemplateDialog}
          />}
      />
    )
  }
}

export default withStyles(styles)(TemplateContent);
