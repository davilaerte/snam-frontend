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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <List className={classes.root}>
            <ListItem alignItems="flex-start" divider>
              <Avatar>
                <NotificationsIcon />
              </Avatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem divider>
              <Avatar>
                <NotificationsIcon />
              </Avatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem >
              <Avatar>
                <NotificationsIcon />
              </Avatar>
              <ListItemText primary="Vacation" secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Sandra Adams
              </Typography>
                  {' — Jan 9, 2014'}
                </React.Fragment>
              } />
            </ListItem>
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
