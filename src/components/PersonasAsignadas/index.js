import React from "react";
import propTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styles";
import { rolesFormateados } from "../../config/globalVariables";

ListadoPersonasAsignadas.propTypes = {
  people: propTypes.array,
  removePerson: propTypes.func,
};

function formatDate(dateString) {
  //formato actual: aaaa-MM-dd
  let result;
  dateString != null
    ? (result =
      dateString.substring(8) +
      "-" +
      dateString.substring(5, 7) +
      "-" +
      dateString.substring(0, 4))
    : (result = "Final indefinido");

  return result;
}

function asignationText(asignation) {
  return (
    rolesFormateados[asignation.role] +
    " (" +
    formatDate(asignation.start_date) +
    " / " +
    formatDate(asignation.end_date) +
    ")"
  );
}

export default function ListadoPersonasAsignadas({ people, removePerson }) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Grid item key={"people"}>
        {people.length != 0 ? (
          <>
            <Typography variant="h5">Personas Asignadas</Typography>
            <Box m={2} />
            <Divider />
            <List className={classes.list}>
              {people.map((person) => {
                return (
                  <>
                    <ListItem key={person.id} role="listitem">
                      <ListItemText primary={person.name} />
                      <IconButton
                        onClick={() =>
                          removePerson(
                            person.id,
                            person.name,
                            undefined,
                            undefined
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItem>
                    {person.roles.map((asignation) => {
                      return (
                        <>
                          <ListItem key={asignation.id} role="listitem">
                            <ListItemText
                              classes={{ primary: classes.subtext }}
                              primary={asignationText(asignation)}
                            />
                            <IconButton
                              onClick={() =>
                                removePerson(
                                  person.id,
                                  person.name,
                                  asignation.id,
                                  rolesFormateados[asignation.role]
                                )
                              }
                            >
                              <CloseIcon />
                            </IconButton>
                          </ListItem>
                        </>
                      );
                    })}
                    <Divider component="li" />
                  </>
                );
              })}
            </List>
          </>
        ) : (
          <Box m={2}>Aún no hay personas asociadas</Box>
        )}
      </Grid>
    </div >
  );
}
