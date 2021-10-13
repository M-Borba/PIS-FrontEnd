import React, { Component, Fragment } from "react";
import { useStyles } from "./styles";
import propTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Card from "@material-ui/core/Card";
import Button from "@mui/material/Button";
import CardContent from "@material-ui/core/CardContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Stack } from "@mui/material";

InfoAsignacionDialog.propTypes = {
  projectInfo: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

function InfoAsignacionDialog({ projectInfo, onClose, onSubmit }) {
  const Classes = useStyles();

  return (
    <Fragment>
      <DialogTitle className={Classes.dialogTitle}>
        <Stack direction="row">
          <Typography variant="subtitle1" className={Classes.title}>
            {projectInfo.name}
          </Typography>
          <IconButton
            aria-label="Close"
            className={Classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent className={Classes.content}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Card className={Classes.card}>
              <CardContent>
                <Typography gutterBottom>Descripcion</Typography>
                <Typography color="textSecondary">
                  {projectInfo.description}
                </Typography>
              </CardContent>
            </Card>
            <Card className={Classes.card}>
              <CardContent>
                <Typography gutterBottom>Presupuesto</Typography>
                <Typography color="textSecondary">
                  {projectInfo.budget}
                </Typography>
              </CardContent>
            </Card>
            <Card className={Classes.card}>
              <CardContent>
                <Typography gutterBottom>Fecha de Inicio</Typography>
                <Typography color="textSecondary">
                  {projectInfo.start_date}
                </Typography>
              </CardContent>
            </Card>
            <Card className={Classes.card}>
              <CardContent>
                <Typography gutterBottom>Fecha de Fin</Typography>
                <Typography color="textSecondary">
                  {projectInfo.end_date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <List
                  sx={{
                    overflow: "auto",
                    maxHeight: 390,
                  }}
                  subheader={<ListSubheader>Personas Asignadas</ListSubheader>}
                >
                  <ListItem>
                    <ListItemText primary={"Juan"} />
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
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <List
                  sx={{
                    overflow: "auto",
                    maxHeight: 390,
                  }}
                  subheader={<ListSubheader>Tecnologías</ListSubheader>}
                >
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
                  <ListItem>
                    <ListItemText primary={"Java7"} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={"Java8"} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={Classes.actions}>
        <Button onClick={onClose}>Desasignar proyecto de persona</Button>
      </DialogActions>
    </Fragment>
  );
}

export default InfoAsignacionDialog;
