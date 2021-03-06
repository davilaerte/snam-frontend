import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { history } from "./config/history";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DescriptionIcon from "@material-ui/icons/Description";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleIcon from "@material-ui/icons/People";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import HomeLayout from "./componentsLayouts/HomeLayout";
import PagesLayout from "./componentsLayouts/PagesLayout";
import DescriptionsLayout from "./componentsLayouts/DescriptionsLayout";
import NotificationsLayout from "./componentsLayouts/NotificationsLayout";
import AboutLayout from "./componentsLayouts/AboutLayout";
import LoginLayout from "./componentsLayouts/LoginLayout";

const drawerWidth = 240;
const tokenName = 'access_token';

const styles = theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "orange"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openProfileMenu: false,
      anchorEl: null,
      hasLoggedUser: Boolean(localStorage.getItem(tokenName)),
      authPaths: [{ path: '/', redirect: '/home', isExact: true }, { path: '/home', component: HomeLayout, isExact: false }, { path: '/pages', component: PagesLayout, isExact: true }, { path: '/descriptions', component: DescriptionsLayout, isExact: true }, { path: '/notifications', component: NotificationsLayout, isExact: true }, { path: '/about', component: AboutLayout, isExact: true }],
      openPaths: [{ path: '/login', component: LoginLayout, isExact: true, props: { login: this.login.bind(this) } }, { path: '/', redirect: '/login', isExact: true }, { path: '/about', component: AboutLayout, isExact: true }]
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  login = (token) => {
    localStorage.setItem(tokenName, token);
    this.setState({ hasLoggedUser: true });
    history.push('/home')
  };

  logout = () => {
    localStorage.removeItem(tokenName);
    this.setState({ hasLoggedUser: false });
    this.handleClose();
    history.push('/login')
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Router history={history}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            color="primary"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                color="inherit"
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Snam
              </Typography>
              {this.state.hasLoggedUser && (<div style={{ marginLeft: 'auto', marginRight: '60px' }}>
                <IconButton
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>
              </div>)}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                    <ChevronLeftIcon />
                  )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {(this.state.hasLoggedUser ? ([
                { name: "Inicio", icon: <HomeIcon />, path: "/home" },
                { name: "Páginas", icon: <FileCopyIcon />, path: "/pages" },
                {
                  name: "Descrições",
                  icon: <DescriptionIcon />,
                  path: "/descriptions"
                },
                {
                  name: "Notificações",
                  icon: <NotificationsIcon />,
                  path: "/notifications"
                }
              ]) : [{
                name: "Login",
                icon: <DescriptionIcon />,
                path: "/login"
              }]).map(item => (
                <ListItem
                  button
                  key={item.name}
                  onClick={() => history.push(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {[{ name: "Sobre", icon: <PeopleIcon />, path: "/about" }].map(
                item => (
                  <ListItem
                    button
                    key={item.name}
                    onClick={() => history.push(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                )
              )}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {(this.state.hasLoggedUser ? this.state.authPaths : this.state.openPaths).map((item, index) => (item.redirect ? <Route key={index} exact path={item.path} render={() => (<Redirect to={item.redirect} />)} /> : item.isExact ? <Route key={index} exact path={item.path} render={() => (<item.component {...item.props} />)} /> : <Route key={index} path={item.path} render={() => (<item.component {...item.props} />)} />))}
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
