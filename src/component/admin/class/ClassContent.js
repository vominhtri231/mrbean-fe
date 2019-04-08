import React from "react";
import AdminApi from "../../../api/AdminApi";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/styles";
import AddClassForm from "./AddClassForm"
import SearchBar from "../../common/SearchBar";
import List from "@material-ui/core/List";
import ClassListItem from "./ClassListItem";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  contentWrapper: {
    margin: '10px 8px',
  },
  list: {
    width: '100%',
  },
});

class ClassContent extends React.Component {
  state = {
    klasses: [],
    openAddClassForm: false,
  };

  handleOpenForm = () => {
    this.setState({openAddClassForm: true});
  };

  handleCloseForm = () => {
    this.setState({openAddClassForm: false});
  };

  contain = (klass, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return klass.name.toLowerCase().includes(lowerKeyword)
      || klass.description.toLowerCase().includes(keyword);
  };

  search = (keyword) => {
    const {klasses} = this.state;
    const searchedKlasses = klasses.map(klass => {
      klass.hide = !this.contain(klass, keyword);
      return klass
    });
    this.setState({klasses: searchedKlasses});
  };

  createClass = (name, description) => {
    AdminApi.createClass(name, description).then(response => {
      const klass = response.data;
      const addedKlass = {name: klass.name, description: klass.description, id: klass.id};
      const addedKlasses = this.state.klasses.concat(addedKlass);
      this.setState({klasses: addedKlasses});
    })
  };

  getClasses = () => {
    AdminApi.getClasses().then(response => this.setState({klasses: response.data}));
  };

  deleteClass = (id) => {
    AdminApi.deleteClass(id).then(() => {
      const {klasses} = this.state;
      const deletedKlasses = klasses.filter(klass => klass.id !== id);
      this.setState({klasses: deletedKlasses})
    });
  };

  componentDidMount() {
    this.getClasses();
  };

  render() {
    const {klasses, openAddClassForm} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <SearchBar searchPlaceHolder={"Search by class name or description"}
                   onSearch={this.search}/>
        <div className={classes.contentWrapper}>
          {this.renderListClasses(klasses)}
        </div>
        <Fab className={classes.fab} color='primary' onClick={this.handleOpenForm}>
          <AddIcon/>
        </Fab>
        <AddClassForm open={openAddClassForm}
                      handleClose={this.handleCloseForm}
                      handleSubmit={this.createClass}/>
      </div>
    );
  }

  renderListClasses = (klasses) => {
    if (klasses.length === 0) {
      return (
        <Typography color="textSecondary" align="center">
          No classes yet
        </Typography>
      )
    }
    return (
      <List>
        {
          klasses.filter(klass => !klass.hide).map(klass => (
            <ClassListItem key={klass.id} klass={klass} onDelete={this.deleteClass}/>
          ))
        }
      </List>
    )
  }
}

export default withStyles(styles)(ClassContent);