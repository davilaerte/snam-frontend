import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GridCardsDescription from "../components/GridCardsDescription";
import request from "../config";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
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
  paper: {
    maxWidth: 500,
    margin: "auto",
    marginBottom: "10px",
    overflow: "hidden"
  },
  addDescription: {
    backgroundColor: "OrangeRed"
  },
  modal: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  buttonClose: {
    margin: "3px",
    backgroundColor: "red"
  },
  buttonSave: {
    margin: "3px",
    backgroundColor: "green"
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class UserDescriptionsLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        open: false,
        text: '',
        variant: 'success'
      },
      items: [],
      open: false,
      description: {
        title: '',
        img: '',
        text: ''
      }
    };

    this.props.setTabValue();
    this.getDescriptions();
  }

  handleOpen = () => {
    console.log(document.cookie);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  changeDescriptionProperty(porpertyName) {
    return event => {
      const value = event.target.value;
      const description = {
        ...this.state.description
      };

      description[porpertyName] = value;
      this.setState({ description });
    }
  }

  getDescriptions() {
    const method = "GET";
    const path = "/description";

    request(path, method, undefined, {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.setState({ items: data });
          this.props.setNumberDescriptions(data.length);
        });
      else this.openAlert("Aconteceu algum ao tentar obter as descrições!", "error");
    }).catch(error => {
      this.openAlert("Erro: " + error, "error");
    });
  }

  saveDescription() {
    const method = "POST";
    const path = "/description";
    request(path, method, this.state.description, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          console.log(data);
          this.props.setNumberDescriptions(this.state.items.length + 1);
          const items = [...this.state.items];
          items.push(data);
          this.setState({ items });
        });
      else this.openAlert("Aconteceu algum ao tentar registar a descrição, tente novamente!", "error");
    }).catch(error => {
      this.openAlert("Erro: " + error, "error");
    });

    this.handleClose();
  }

  setLike(itemId) {
    const items = [...this.state.items];

    items.forEach(element => {
      if (element._id === itemId) {
        element.like += 1;
        element.hasUserLike = true;
      }
    });

    this.setState({ items });
  }

  setDeslike(itemId) {
    const items = [...this.state.items];

    items.forEach(element => {
      if (element._id === itemId) {
        element.like -= 1;
        element.hasUserLike = false;
      }
    });

    this.setState({ items });
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
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="inherit"
            fullWidth={true}
            className={classes.addDescription}
            onClick={this.handleOpen}
          >
            Add nova descrição
          </Button>
        </Paper>
        <Modal
          disableBackdropClick={true}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.modal}>
            <TextField
              label="Título"
              style={{ margin: 8 }}
              placeholder="Digite o título da descrição"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.title}
              onChange={this.changeDescriptionProperty('title').bind(this)}
            />
            <TextField
              label="Url img"
              style={{ margin: 8 }}
              placeholder="Coloque a url da imagen"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.img}
              onChange={this.changeDescriptionProperty('img').bind(this)}
            />
            <TextField
              label="Descrição"
              multiline
              fullWidth
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={this.state.text}
              onChange={this.changeDescriptionProperty('text').bind(this)}
            />
            <Button
              className={classes.buttonSave}
              variant="contained"
              color="inherit"
              onClick={this.saveDescription.bind(this)}
            >
              Salvar
          </Button>
            <Button
              className={classes.buttonClose}
              variant="contained"
              color="inherit"
              onClick={this.handleClose}
            >
              Cancelar
          </Button>
          </div>
        </Modal>
        <GridCardsDescription setLike={this.setLike.bind(this)} setDeslike={this.setDeslike.bind(this)} items={this.state.items} />
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

export default withStyles(styles)(UserDescriptionsLayout);