import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import request from "../config";

const styles = theme => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing.unit,
    margin: '5px',
    backgroundColor: '#FFD700',
    textAlign: 'center',
    fontSize: '40px'
  },
  paper: {
    ...theme.mixins.gutters(),
    padding: '3px',
    margin: '15px'
  },
  buttonLogin: {
    marginTop: '5px',
    marginLeft: '35px',
    width: '250px',
    height: '45px',
    backgroundColor: 'blue'
  },
  buttonRegister: {
    marginTop: '5px',
    marginLeft: '35px',
    width: '250px',
    height: '45px',
    backgroundColor: 'OrangeRed'
  }
});


class LoginLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: ''
      },
      auth: {
        email: '',
        password: ''
      }
    };
  }

  saveUser() {
    const method = "POST";
    const path = "/user";
    request(path, method, this.state.user, {
      "Content-Type": "application/json"
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          console.log(data);
          const user = { name: '', email: '', password: '' };
          this.setState({ user });
        });
      else console.log("Error!");
    });
  }

  authUser() {
    const method = "POST";
    const path = "/auth";
    request(path, method, this.state.auth, {
      "Content-Type": "application/json"
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          const auth = { email: '', password: '' };
          this.setState({ auth });
          this.props.login(data.token);
        });
      } else {
        console.log("Error!");
      }
    });
  }

  changeUserProperty(porpertyName) {
    return event => {
      const value = event.target.value;
      const user = {
        ...this.state.user
      };

      user[porpertyName] = value;
      this.setState({ user });
    }
  }

  changeAuthProperty(porpertyName) {
    return event => {
      const value = event.target.value;
      const auth = {
        ...this.state.auth
      };

      auth[porpertyName] = value;
      this.setState({ auth });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>{"The best Social Network Ever!"}</div>
        <div className={classes.root}>{"1000% zuera!"}</div>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h5" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" component="h3">
              Login
          </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              label="Email"
              type="email"
              style={{ marginLeft: 8, width: 400 }}
              fullWidth
              margin="none"
              variant="outlined"
              value={this.state.auth.email}
              onChange={this.changeAuthProperty('email').bind(this)}
            />
            <TextField
              label="Senha"
              type="password"
              style={{ marginLeft: 8, width: 400 }}
              fullWidth
              margin="none"
              variant="outlined"
              value={this.state.auth.password}
              onChange={this.changeAuthProperty('password').bind(this)}
            />
            <Button
              className={classes.buttonLogin}
              variant="contained"
              color="inherit"
              onClick={this.authUser.bind(this)}
            >
              Login
                </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" component="h3">
              Register
          </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              label="Nome"
              type="string"
              style={{ marginLeft: 8, width: 400 }}
              fullWidth
              margin="none"
              variant="outlined"
              value={this.state.user.name}
              onChange={this.changeUserProperty('name').bind(this)}
            />
            <TextField
              label="Email"
              type="email"
              style={{ marginLeft: 8, width: 400 }}
              fullWidth
              margin="none"
              variant="outlined"
              value={this.state.user.email}
              onChange={this.changeUserProperty('email').bind(this)}
            />
            <TextField
              label="Senha"
              type="password"
              style={{ marginLeft: 8, width: 400 }}
              fullWidth
              margin="none"
              variant="outlined"
              value={this.state.user.password}
              onChange={this.changeUserProperty('password').bind(this)}
            />
            <Button
              className={classes.buttonRegister}
              variant="contained"
              color="inherit"
              onClick={this.saveUser.bind(this)}
            >
              Register
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

LoginLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginLayout);