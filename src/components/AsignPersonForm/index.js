import React, { useState } from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from '@mui/material/Grid';
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import CardSelector from "../CardSelector";

AsignPersonForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  asign: propTypes.shape({
    roles: propTypes.array.isRequired,
    people: propTypes.array.isRequired,
    startDate: propTypes.string.isRequired,
    endDate: propTypes.string,
  }).isRequired,
  people: propTypes.arrayOf(propTypes.shape({
    fullname: propTypes.string,
    id: propTypes.number,
  })).isRequired,
  msg: propTypes.string,
  error: propTypes.string,
  title: propTypes.string,
};

export default function AsignPersonForm({
  title,
  onSubmit,
  onInputChange,
  asign,
  people,
  error,
  msg,
}) {

  const classes = useStyles();

  var peopleNames = people.map((person) => person.fullName);
  var peopleIds = people.map((person) => person.id);

  const roles = [
    "Developer",
    "PM",
    "Tester",
    "Architect",
    "Analyst",
    "Designer"
  ]

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Typography className={classes.msg} component="h2">
        {msg}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <CardSelector
              name={"people"}
              id={"people"}
              title={"Personas"}
              list={peopleNames}
              listIds={peopleIds}
              onInputChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CardSelector
              name={"roles"}
              id={"roles"}
              title={"Rol"}
              list={roles}
              onInputChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="startDate"
              label="Inicio"
              type="date"
              id="startDate"
              value={asign.startDate}
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="endDate"
              label="Fin"
              type="date"
              id="endDate"
              value={asign.endDate}
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
          </Grid>
        </Grid>
        <Button
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Guardar
        </Button>

        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5}></Box>
      </form>
    </div >
  );
}
