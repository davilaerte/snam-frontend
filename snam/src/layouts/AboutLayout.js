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

class AboutLayout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <h1>Sobre</h1>
          <h3><p>Uma rede social, feita para ser um projeto web da disciplina de Principios De Desenvolvimento Web (UFCG - Ciência da Computação - 2018.2) que tem a intenção de criar uma rede social para fãs de animes e mangás, que seria um local onde os fãs de animes e mangás poderiam conversar e interagir com outras as pessoas a respeitos de assuntos e zueiras relacionadas ao mundo mágico dos animes e mangás.</p></h3>
          <br />
          <h4>Autor: Davi Laerte </h4>
          <h4>Email: davi.nascimento@ccc.ufcg.edu.br</h4>
          <h4>GitHub do projeto: <a href="https://github.com/davilaerte/snam-frontend">link</a> </h4>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AboutLayout);
