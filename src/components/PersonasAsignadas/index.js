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
import { useStyles } from "./styles";
import { rolesFormateados } from "../../config/globalVariables";

ListadoPersonasAsignadas.propTypes = {
  people: propTypes.array,
  removePerson: propTypes.func,
};

function formatDate(dateString) {
  //formato actual: aaaa-MM-dd
  return dateString.substring(8) + "-" + dateString.substring(5, 7) + "-" + dateString.substring(0, 4);
}

export default function ListadoPersonasAsignadas({ people, removePerson }) {
  const classes = useStyles();
  console.log(people);
  return (
    <div className={classes.paper}>
      <Grid item key={"people"}>
        {people.length != 0 ? (
          <>
            <Typography>Personas Asignadas</Typography>
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
                              primary={
                                "  ↳" + rolesFormateados[asignation.role] + " (" + formatDate(asignation.start_date) + " / " + formatDate(asignation.end_date) + ")"
                              }
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
          "Aun no hay nadie asignado"
        )}
      </Grid>
    </div>
  );
}
