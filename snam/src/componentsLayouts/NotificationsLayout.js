import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NotificationsIcon from "@material-ui/icons/Notifications";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import request from "../config";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 900
  },
  paper: {
    maxWidth: 900,
    margin: "auto",
    overflow: "hidden"
  }
});

class NotificationsLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    }

    this.getNotifications();
  }

  getNotifications = () => {
    const method = "GET";
    const path = "/notification";

    request(path, method, undefined, {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.setState({ notifications: data.reverse() });
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
          <List className={classes.root}>
            {this.state.notifications.map((elem, index) => (
              <ListItem key={index} divider>
                <Avatar>
                  <NotificationsIcon />
                </Avatar>
                <ListItemText primary={elem.type} secondary={
                  <React.Fragment>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                      {elem.text}
                    </Typography>
                    {this.formatDate(new Date(elem.date))}
                  </React.Fragment>
                } />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

NotificationsLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsLayout);
