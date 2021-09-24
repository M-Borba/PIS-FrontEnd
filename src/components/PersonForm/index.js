import React from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

PersonForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  person: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
  }).isRequired,
  msg: propTypes.string,
  error: propTypes.string,
};

export default function PersonForm({
  onSubmit,
  onInputChange,
  person,
  error,
  msg,
}) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Datos de persona
      </Typography>
      <Typography className={classes.msg} component="h2">
        {msg}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
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
          autoFocus
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
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="working_hours"
          label="Horas"
          type="number"
          id="working_hours"
          value={person.working_hours}
          onChange={onInputChange}
        />
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
    </div>
  );
}
