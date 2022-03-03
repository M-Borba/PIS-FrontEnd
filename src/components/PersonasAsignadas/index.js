import React from "react";
import propTypes from "prop-types";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Box from "@material-ui/core/Box";

import { useStyles } from "./styles";
import {
  PERSON_LABELS,
  PROJECT_LABELS,
  rolesFormateados,
} from "../../config/globalVariables";
import { rawDateToDateFormat } from "../../utils/utils";

ListadoPersonasAsignadas.propTypes = {
  people: propTypes.array,
  removePerson: propTypes.func,
};

function assignationText(assignation) {
  return (
    rolesFormateados[assignation.role] +
    " (" +
    rawDateToDateFormat(assignation.start_date) +
    " - " +
    (assignation.end_date
      ? rawDateToDateFormat(assignation.end_date)
      : PROJECT_LABELS.FECHA_INDEFINIDA) +
    ")"
  );
}

export default function ListadoPersonasAsignadas({ people, removePerson }) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Grid item key={"people"}>
        {people.length !== 0 ? (
          <>
            <List>
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
                    {person.roles.map((assignation) => {
                      return (
                        <>
                          <ListItem key={assignation.id} role="listitem">
                            <ListItemText
                              classes={{ primary: classes.subtext }}
                              primary={assignationText(assignation)}
                            />
                            <IconButton
                              onClick={() =>
                                removePerson(
                                  person.id,
                                  person.name,
                                  assignation.id,
                                  rolesFormateados[assignation.role]
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
          <Box m={2}>{PERSON_LABELS.AUN_NO_HAY_PERSONAS_ASIGNADAS}</Box>
        )}
      </Grid>
    </div>
  );
}
