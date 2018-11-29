import React, { Component } from "react";
import GridCardsDescription from "../components/GridCardsDescription";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import request from "../config";

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    marginBottom: "10px",
    overflow: "hidden"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  addUser: {
    marginRight: theme.spacing.unit
  }
});

class DescriptionsLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    const method = "GET";
    const path = "/description/all";
    request(path, method, undefined, {}).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.setState({ items: data });
        });
      else console.log("Error!");
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <AppBar
            className={classes.searchBar}
            position="static"
            color="default"
            elevation={0}
          >
            <Toolbar>
              <Grid container spacing={16} alignItems="center">
                <Grid item>
                  <SearchIcon className={classes.block} color="inherit" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search by name description"
                    InputProps={{
                      disableUnderline: true,
                      className: classes.searchInput
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addUser}
                  >
                    Search
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton>
                      <RefreshIcon className={classes.block} color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Paper>
        <GridCardsDescription items={this.state.items} />
      </div>
    );
  }
}

export default withStyles(styles)(DescriptionsLayout);
