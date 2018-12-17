import React, { Component } from "react";
import GridCardsDescription from "../components/GridCardsDescription";
import request from "../config";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

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
      else console.log("Error!");
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
      else console.log("Error!");
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
      </div>
    );
  }
}

export default withStyles(styles)(UserDescriptionsLayout);