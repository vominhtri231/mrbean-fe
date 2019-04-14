import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import appConstants from "../../../util/appConstants";
import SearchBar from "../../common/SearchBar";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

class UserPageSearchBar extends React.Component {
  state = {
    keyword: "",
    checkRoles: []
  };

  roles = [
    appConstants.roles.Admin,
    appConstants.roles.Teacher,
    appConstants.roles.Student
  ];

  search = (keyword, roles) => {
    const {onSearch} = this.props;
    onSearch(keyword, roles);
  };

  handleRoleChange = (event) => {
    const {keyword} = this.state;
    const checkRoles = event.target.value;
    this.setState({checkRoles});
    this.search(keyword, event.target.value);
  };

  handleKeywordChange = (keyword) => {
    const {checkRoles} = this.state;
    this.setState({keyword});
    this.search(keyword, checkRoles)
  };

  componentDidMount() {
    this.setState({checkRoles: this.roles});
  }

  render() {
    const {searchPlaceHolder, classes} = this.props;
    const {checkRoles} = this.state;
    return (
      <SearchBar searchPlaceHolder={searchPlaceHolder}
                 onSearch={this.handleKeywordChange}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple">Roles</InputLabel>
          <Select
            multiple
            value={checkRoles}
            onChange={this.handleRoleChange}
            input={<Input id="select-multiple"/>}
            renderValue={selected => {
              return <div className={classes.chips}>
                {selected.map(value => {
                  return <Chip key={value.id} label={value.authority} className={classes.chip}/>
                })}
              </div>
            }}
          >
            {this.roles.map(role => (
              <MenuItem key={role.id} value={role}>
                {role.authority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </SearchBar>
    )
  }
}

export default withStyles(styles, {withTheme: true})(UserPageSearchBar);