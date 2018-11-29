import React, { Component } from "react";
import { Route } from "react-router-dom";
import UserDescriptionLayout from "./UserDescriptionsLayout";
import UserProfileLayout from "./UserProfileLayout";
import { history } from "../config/history";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Mock para usuario, equanto a autenticação não está implementada
const userIdMock = "5bbe3efef9d6ea182853a71d";

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
            value: 0,
            numberDescriptions: 0
        };

        history.push("/home/profile");
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    setNumberDescriptions(number) {
        this.setState({ numberDescriptions: number });
    }

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
                            <UserDescriptionLayout {...props} userId={userIdMock} setNumberDescriptions={this.setNumberDescriptions.bind(this)} />
                        )}
                    />
                    <Route
                        exact
                        path="/home/profile"
                        render={props => (
                            <UserProfileLayout {...props} userId={userIdMock} numberDescriptions={this.state.numberDescriptions} />
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HomeLayout);
