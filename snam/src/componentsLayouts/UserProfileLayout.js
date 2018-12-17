import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import request from "../config";

const styles = theme => ({
  paper: {
    maxWidth: 900,
    margin: "auto",
    overflow: "hidden",
    textAlign: "center"
  },
  avatar: {
    margin: 10,
    color: '#fff',
    width: 100,
    height: 100,
    backgroundColor: 'gold'
  }
});

class UserProfileLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }

    this.props.setTabValue();
    this.getUser();
  }

  getUser() {
    const method = "GET";
    const path = "/user";
    request(path, method, undefined, {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.setState({ user: data });
        });
      else console.log("Error!");
    });
  }

  formatDate = (date) => {
    return date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear() + ' - ' + date.getUTCHours() + ':' + date.getUTCMinutes();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <h1>Perfil</h1>
          <Grid container justify="center" alignItems="center">
            <Avatar className={classes.avatar}><h1>{this.state.user.name ? this.state.user.name.slice(0, 1) : ""}</h1></Avatar>
          </Grid>
          <h3>Nome: {this.state.user.name}</h3>
          <h3>Email: {this.state.user.email}</h3>
          <h3>Descrições feitas: {this.props.numberDescriptions}</h3>
          <h3>Pagínas feitas: 0</h3>
          <h4>Pefil criado em: {this.formatDate(new Date(this.state.user.createAt))}</h4>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfileLayout);