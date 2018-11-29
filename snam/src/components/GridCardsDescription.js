import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ShareIcon from "@material-ui/icons/Share";

const styles = {
  root: {
    display: "flex",
    overflow: "hidden"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  gridList: {
    transform: "translateZ(0)"
  }
};

class GridCardsDescription extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridList cellHeight={360} cols={4} className={classes.gridList}>
          {this.props.items.map((item, index) => (
            <GridListTile key={index} cols={0.8} rows={1}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.img}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography component="p">{item.text}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton aria-label="Add to favorites">
                    <ThumbUpAltIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

GridCardsDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GridCardsDescription);
