import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Icon} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditUserForm from "../user/EditUserForm";
import App from "../../App";

const drawerWidth = 270;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 5,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 3px',
    minHeight: 60
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  contentComponent: {
    height: '100%'
  },
});

class CustomDrawer extends React.Component {
  state = {
    open: false,
    currentFeatureIndex: 0,
    openProfileMenu: null,
    openProfileDialog: false,
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  handleChangeTab = (index) => {
    this.setState({currentFeatureIndex: index});
  };

  handleOpenProfileMenu = (event) => {
    this.setState({openProfileMenu: event.currentTarget})
  };

  handleCloseProfileMenu = () => {
    this.setState({openProfileMenu: null})
  };

  handleLogout = () => {
    const {logout} = this.props;
    logout();
    this.props.history.push("/login");
  };

  handleOpenProfileDialog = () => {
    this.setState({openProfileDialog: true});
    this.handleCloseProfileMenu();
  };

  handleCloseProfileDialog = () => {
    this.setState({openProfileDialog: false});
    this.handleCloseProfileMenu();
  };


  render() {
    const {classes, theme, children, user, editUser} = this.props;
    //if (!user) return <Redirect to="/login"/>;
    const {pageName, features} = this.props;
    const {currentFeatureIndex, openProfileMenu, openProfileDialog} = this.state;
    const ContentComponent = features[currentFeatureIndex].content;
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {pageName}
            </Typography>
            {!!children && children}
            {!!user && (
              <div style={{position: 'absolute', right: 20}}>
                {user.email}
                <IconButton
                  aria-owns={!!openProfileMenu ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleOpenProfileMenu}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={openProfileMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={!!openProfileMenu}
                  onClose={this.handleCloseProfileMenu}
                >
                  <MenuItem onClick={this.handleOpenProfileDialog}>Profile</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            {features.map((feature, index) => {
                return (
                  <ListItem button key={feature.name}
                            onClick={() => this.handleChangeTab(index)}
                            selected={currentFeatureIndex === index}>
                    <ListItemIcon children={<Icon>{feature.icon}</Icon>}/>
                    <ListItemText primary={feature.name}/>
                  </ListItem>
                )
              }
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Paper className={classes.contentComponent}>
            {ContentComponent}
          </Paper>
        </main>
        {!App.isEmpty(user) && <EditUserForm
          user={user}
          open={openProfileDialog}
          handleClose={this.handleCloseProfileDialog}
          handleSubmit={editUser}
        />}
      </div>
    );
  }
}

CustomDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pageName: PropTypes.string,
  features: PropTypes.array
};

export default withStyles(styles, {withTheme: true})(CustomDrawer);