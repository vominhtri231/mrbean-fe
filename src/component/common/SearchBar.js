import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
});

class SearchBar extends React.Component {
  handleSearchInputChange = (event) => {
    const {onSearch} = this.props;
    const keyword = event.target.value;
    onSearch(keyword);
  };

  render() {
    const {classes, searchPlaceHolder, children, style, onReload} = this.props;
    return (
      <AppBar className={classes.searchBar} style={style}
              position="static" color="default" elevation={0}>
        <Toolbar style={{minHeight: "0px"}}>
          <Grid container spacing={16} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit"/>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder={searchPlaceHolder}
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
                onChange={this.handleSearchInputChange}
              />
            </Grid>
            <Grid item>
              {children ? <div style={{
                marginRight: 10,
                display: 'inline'
              }}>{children}</div> : undefined}
              <Tooltip title="Reload">
                <IconButton onClick={onReload}>
                  <RefreshIcon className={classes.block} color="inherit"/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(SearchBar);