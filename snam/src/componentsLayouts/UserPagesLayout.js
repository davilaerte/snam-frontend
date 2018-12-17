import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    maxWidth: 900,
    margin: "auto",
    overflow: "hidden",
    textAlign: "center"
  }
});

class UserPagesLayout extends Component {
  constructor(props) {
    super(props);

    this.props.setTabValue();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <h1>Minhas páginas</h1>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserPagesLayout);