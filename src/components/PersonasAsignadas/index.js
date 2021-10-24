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

ListadoPersonasAsignadas.propTypes = {
  people: propTypes.array,
  removePerson: propTypes.func,
};

export default function ListadoPersonasAsignadas({ people, removePerson }) {
  const classes = useStyles();
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
                      <ListItemText primary={person.full_name} />
                      <IconButton
                        onClick={() =>
                          removePerson(person.id, person.full_name)
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItem>
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
