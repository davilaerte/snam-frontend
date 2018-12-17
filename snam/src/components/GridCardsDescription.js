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
import Badge from '@material-ui/core/Badge';
import request from "../config";

const styles = theme => ({
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
  },
  badge: {
    top: 10,
    right: -16,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  }
});

class GridCardsDescription extends Component {

  like = (descriptionId) => {
    console.log('passou');
    const method = "PUT";
    const path = "/description/" + descriptionId + "/like";
    request(path, method, {}, {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.props.setLike(data._id);
        });
      else console.log("Error!");
    });
  }

  deslike = (descriptionId) => {
    const method = "PUT";
    const path = "/description/" + descriptionId + "/deslike";
    request(path, method, {}, {
      "Authorization": "Bearer " + localStorage.getItem('access_token')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.props.setDeslike(data._id);
        });
      else console.log("Error!");
    });
  }

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
                  <IconButton color={item.hasUserLike ? "primary" : "default"} aria-label="Like" onClick={item.hasUserLike ? () => this.deslike(item._id) : () => this.like(item._id)}>
                    <Badge color="primary" badgeContent={item.like} classes={{ badge: classes.badge }}>
                      <ThumbUpAltIcon />
                    </Badge>
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
