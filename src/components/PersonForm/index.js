import React, { useState } from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import CardSelector from "../CardSelector";

PersonForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  person: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
    roles: propTypes.array,
  }).isRequired,
  error: propTypes.string,
  title: propTypes.string,
};

export default function PersonForm({
  title,
  onSubmit,
  onInputChange,
  person,
  error,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <div style={{ display: "flex", gap: "5px" }}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              type="text"
              label="Nombre"
              name="first_name"
              value={person.first_name}
              onChange={onInputChange}
              autoFocus
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last_name"
              type="text"
              label="Apellidos"
              name="last_name"
              value={person.last_name}
              onChange={onInputChange}
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={person.email}
              onChange={onInputChange}
            />
            <TextField
              inputProps={{ min: 0, max: 100 }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="working_hours"
              label="Horas Semanales"
              type="number"
              id="working_hours"
              value={person.working_hours}
              onChange={onInputChange}
            />
          </div>
          <div style={{ marginTop: 15, marginLeft: 10 }}>
            <CardSelector
              name={"roles"}
              id={"roles"}
              title={"Rol"}
              list={person.roles}
              onInputChange={onInputChange}
            />
          </div>
        </div>
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
      </form >
    </div >
  );
}
