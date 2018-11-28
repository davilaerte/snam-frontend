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
        <GridCardsDescription
          items={[
            {
              name: "Bleach",
              description: "The best anime ever",
              img:
                "https://kanto.legiaodosherois.com.br/w750-h393-gnw-cfill-q80/wp-content/uploads/2017/03/legiao_GN2PVWtRn0cZsSdDvoCbuz8QxJByUTIApl39EeLhka.jpg.jpeg"
            },
            {
              name: "Naruto",
              description: "The best anime ever",
              img:
                "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTchUnAj40aHvUUo7k4TwoaCpZO27NRghcEK2tizD.Eyd3_lD7kcPmtWtpY2N.rw38zwwKgLanCNHFOAUP9ewyE7RHd8IieJY4z2V7Ar0JrwPYTUhUuebGp19gAejMl7M7LHLzzuu_7VARQvkAhwFRnS_Phf50ZmOEu3W5RlxN4NnA-&h=1080&w=1920&format=jpg"
            },
            {
              name: "Hunter x Hunter",
              description: "The best anime ever",
              img:
                "https://kanto.legiaodosherois.com.br/w750-h393-gnw-cfill-q80/wp-content/uploads/2018/08/legiao_BWJAZpw6h0myVC3TOx7eLQkq5DgRMnPl9orib_udYf.jpg.jpeg"
            },
            {
              name: "One Piece",
              description: "The best anime ever",
              img:
                "https://kanto.legiaodosherois.com.br/w750-h393-gnw-cfill-q80/wp-content/uploads/2018/08/legiao_hGqnzdI41NOksoAcejtKim0vwZWaPV_guxJ7UFLX56.jpg.jpeg"
            },
            {
              name: "FMA",
              description: "The best anime ever",
              img:
                "http://pop-verse.com/wp-content/uploads/2018/01/FMA-banner-620x330.jpg"
            },
            {
              name: "Code Geass",
              description: "The best anime ever",
              img:
                "https://supanova-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/Code-Geass-1024x640.jpg"
            },
            {
              name: "Fairy Tail",
              description: "The best anime ever",
              img:
                "https://www.animeunited.com.br/wp-content/uploads/2018/04/fairytail.jpg"
            },
            {
              name: "Yu Yu Hakusho",
              description: "The best anime ever",
              img:
                "https://sm.ign.com/ign_br/screenshot/default/yyh-yu-yu-hakusho-9089390-576-307-229037-1280x0_vxa9.jpg"
            },
            {
              name: "Dragon Ball Z",
              description: "The best anime ever",
              img: "https://cde.publimetro.e3.pe/ima/0/0/1/3/0/130097.jpg "
            },
            {
              name: "Pokémon",
              description: "The best anime ever",
              img:
                "https://barbarashdwallpapers.com/wp-content/uploads/2013/12/Pokemon-Wallpaper-with-Pikachu-mudkip-and-Charmander.jpg"
            },
            {
              name: "Bleach",
              description: "The best anime ever",
              img:
                "https://kanto.legiaodosherois.com.br/w750-h393-gnw-cfill-q80/wp-content/uploads/2017/03/legiao_GN2PVWtRn0cZsSdDvoCbuz8QxJByUTIApl39EeLhka.jpg.jpeg"
            },
            {
              name: "Naruto",
              description: "The best anime ever",
              img:
                "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTchUnAj40aHvUUo7k4TwoaCpZO27NRghcEK2tizD.Eyd3_lD7kcPmtWtpY2N.rw38zwwKgLanCNHFOAUP9ewyE7RHd8IieJY4z2V7Ar0JrwPYTUhUuebGp19gAejMl7M7LHLzzuu_7VARQvkAhwFRnS_Phf50ZmOEu3W5RlxN4NnA-&h=1080&w=1920&format=jpg"
            },
            {
              name: "Hunter x Hunter",
              description: "The best anime ever",
              img:
                "https://kanto.legiaodosherois.com.br/w750-h393-gnw-cfill-q80/wp-content/uploads/2018/08/legiao_BWJAZpw6h0myVC3TOx7eLQkq5DgRMnPl9orib_udYf.jpg.jpeg"
            },
            {
              name: "One Piece",
              description: "The best anime ever",
              img:
                "https://kanto.legiaodosherois.com.br/w750-h393-gnw-cfill-q80/wp-content/uploads/2018/08/legiao_hGqnzdI41NOksoAcejtKim0vwZWaPV_guxJ7UFLX56.jpg.jpeg"
            },
            {
              name: "FMA",
              description: "The best anime ever",
              img:
                "http://pop-verse.com/wp-content/uploads/2018/01/FMA-banner-620x330.jpg"
            },
            {
              name: "Code Geass",
              description: "The best anime ever",
              img:
                "https://supanova-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/Code-Geass-1024x640.jpg"
            },
            {
              name: "Fairy Tail",
              description: "The best anime ever",
              img:
                "https://www.animeunited.com.br/wp-content/uploads/2018/04/fairytail.jpg"
            },
            {
              name: "Yu Yu Hakusho",
              description: "The best anime ever",
              img:
                "https://sm.ign.com/ign_br/screenshot/default/yyh-yu-yu-hakusho-9089390-576-307-229037-1280x0_vxa9.jpg"
            },
            {
              name: "Dragon Ball Z",
              description: "The best anime ever",
              img: "https://cde.publimetro.e3.pe/ima/0/0/1/3/0/130097.jpg "
            },
            {
              name: "Pokémon",
              description: "The best anime ever",
              img:
                "https://barbarashdwallpapers.com/wp-content/uploads/2013/12/Pokemon-Wallpaper-with-Pikachu-mudkip-and-Charmander.jpg"
            }
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DescriptionsLayout);
