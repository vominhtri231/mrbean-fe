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
      this.setState({klassTemplates: addedKlassTemplates})
    })
  };

  updateKlassTemplate = async (id, name) => {
    const response = await KlassTemplateApi.updateKlassTemplate(id, name);
    const updatedKlassTemplate = response.data;
    const {klassTemplates} = this.state;
    const updatedKlassTemplates = klassTemplates.map(klassTemplate => {
      if (klassTemplate.id === updatedKlassTemplate.id) {
        return updatedKlassTemplate;
      }
      return klassTemplate;
    });
    this.setState({klassTemplates: updatedKlassTemplates});
  };

  getKlassTemplates = async () => {
    const response = await KlassTemplateApi.getKlassTemplates();
    this.setState({klassTemplates: response.data})
  };

  deleteKlassTemplate = (id) => {
    KlassTemplateApi.deleteKlassTemplate(id).then(() => {
      const {klassTemplates} = this.state;
      const deletedKlassTemplates = klassTemplates.filter(klassTemplate => klassTemplate.id !== id);
      this.setState({klassTemplates: deletedKlassTemplates})
    });
  };

  async componentDidMount() {
    await this.getKlassTemplates();
  };

  render() {
    const {
      klassTemplates,
      openAddKlassTemplateForm,
      deletingKlassTemplate,
      editingKlassTemplate,
      watchingKlassTemplate,
    } = this.state;
    const {classes} = this.props;
    return (
      <div>
        <SearchBar searchPlaceHolder={"Search by template name"}
                   onSearch={this.search}/>
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
