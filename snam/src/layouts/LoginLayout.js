import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import request from "../config";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const stylesOne = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(stylesOne)(MySnackbarContent);

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
  paperTwo: {
    maxWidth: 1700,
    maxHeight: 500,
    margin: "auto",
    overflow: "hidden"
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
      alert: {
        open: false,
        text: '',
        variant: 'success'
      },
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
          const user = { name: '', email: '', password: '' };
          this.setState({ user });
          this.openAlert("Usuario registrado com sucesso!", "success");
        });
      else this.openAlert("Aconteceu algum erro no registro, tente novamente!", "error");
    }).catch(error => {
      this.openAlert("Erro: " + error, "error");
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
        this.openAlert("Aconteceu algum erro no login, tente novamente!", "error");
      }
    }).catch(error => {
      this.openAlert("Erro: " + error, "error");
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

  openAlert(text, variant) {
    const alert = { ...this.state.alert };

    alert.text = text;
    alert.variant = variant;
    alert.open = true;
    this.setState({ alert });
  }

  closeAlert() {
    const alert = { ...this.state.alert };

    alert.open = false;
    this.setState({ alert });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>{"A melhor rede social!"}</div>
        <Paper className={classes.paperTwo} >
          <img alt="Smiley face" src="https://i2.wp.com/www.coisasdojapao.com/wp-content/uploads/2018/04/bilheterias-anime-Jap%C3%A3o.png?fit=1920%2C1080&ssl=1"></img>
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
              Registro
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.alert.open}
          autoHideDuration={6000}
          onClose={() => this.closeAlert()}
        >
          <MySnackbarContentWrapper
            onClose={() => this.closeAlert()}
            variant={this.state.alert.variant}
            message={this.state.alert.text}
          />
        </Snackbar>
      </div>
    );
  }
}

LoginLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginLayout);