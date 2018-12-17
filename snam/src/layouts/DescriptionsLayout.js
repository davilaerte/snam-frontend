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
      items: [],
      search: ''
    }

    this.getDescriptions();
  }

  getDescriptions(name) {
    const nameDescription = name || "";

    const method = "GET";
    const path = "/description/all?nameDescription=" + nameDescription;
    request(path, method, undefined, {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.setState({ items: data });
        });
      else console.log("Error!");
    });
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
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
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
                    onClick={() => this.getDescriptions(this.state.search)}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Paper>
        <GridCardsDescription setLike={this.setLike.bind(this)} setDeslike={this.setDeslike.bind(this)} items={this.state.items} />
      </div>
    );
  }
}

export default withStyles(styles)(DescriptionsLayout);
