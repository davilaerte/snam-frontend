import React, { Component } from "react";
import { Route } from "react-router-dom";
import GridCardsDescription from "../components/GridCardsDescription";
import { history } from "../config/history";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "10px",
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
            <Tab label="Perfil" onClick={() => history.push("/home/profile")} />
            <Tab
              label="Minhas páginas"
              onClick={() => history.push("/home/pages")}
            />
            <Tab
              label="Minhas descrições"
              onClick={() => history.push("/home/descriptions")}
            />
          </Tabs>
        </Paper>
        <div>
          <Route
            exact
            path="/home/descriptions"
            render={props => (
              <GridCardsDescription
                {...props}
                items={[
                  {
                    title: "Code Geass",
                    text: "The best anime ever",
                    img:
                      "https://supanova-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/Code-Geass-1024x640.jpg"
                  }
                ]}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomeLayout);
