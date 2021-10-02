/**
 * Create person
 */

import React from "react";
import propTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Grid from "@mui/material/Grid";
//import Divider from '@mui/material/Divider';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

InfoProyecto.propTypes = {
  projectData: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
    budget: propTypes.number,
  }).isRequired,
};

export default function InfoProyecto({ projectData }) {
  return (
    <div style={{ padding: 16 }}>
      <Grid container spacing={{ xs: 2 }}>
        <Grid item xs={5}>
          <Typography
            variant="h5"
            paragraph
            style={{ overflowWrap: "break-word" }}
          >
            {projectData.name}
          </Typography>
          <Card style={{ marginBottom: 10, maxHeight: 397, overflow: "auto" }}>
            <CardContent>
              <Typography gutterBottom>Descripcion</Typography>
              <Typography color="textSecondary">
                {projectData.description}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography gutterBottom>Presupuesto</Typography>
              <Typography color="textSecondary">
                {projectData.budget}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "rgb(240,240,240)",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 500,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                <li>
                  <ul>
                    <ListSubheader>Personas Asignadas</ListSubheader>
                    <ListItem>
                      <ListItemText
                        primary={"Juan con nombre muy muy muy muy muy largo"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan2"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan3"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan4"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan5"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan6"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan7"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan7"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan6"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan7"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Juan7"} />
                    </ListItem>
                  </ul>
                </li>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "rgb(240,240,240)",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 500,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                <li>
                  <ul>
                    <ListSubheader>Tecnologías</ListSubheader>
                    <ListItem>
                      <ListItemText primary={"Ruby on Rails v3.1"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Java2"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Java3"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Java4"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Java5"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Java6"} />
                    </ListItem>
                  </ul>
                </li>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
