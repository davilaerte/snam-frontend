import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class HomeLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} position="static">
          <Tabs
            fullWidth
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Perfil" />
            <Tab label="Minhas páginas" />
            <Tab label="Minhas descrições" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(HomeLayout);
