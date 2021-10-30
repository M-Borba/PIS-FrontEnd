import React from "react";
import propTypes from "prop-types";
import { Button, TextField, Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

AdministratorForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  administrator: propTypes.shape({
    email: propTypes.string,
    password: propTypes.string,
    password_confirmation: propTypes.string,
  }).isRequired,
  error: propTypes.string,
  title: propTypes.string,
};

export default function AdministratorForm({
  title,
  onSubmit,
  onInputChange,
  administrator,
  error,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          type="email"
          label="Email"
          name="email"
          value={administrator.email}
          onChange={onInputChange}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          type="password"
          label="Password"
          name="password"
          value={administrator.password}
          onChange={onInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password_confirmation"
          type="password"
          label="Password Confirmation"
          name="password_confirmation"
          value={administrator.password_confirmation}
          onChange={onInputChange}
        />
        <div style={{ paddingTop: 10 }} />
        <Button
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Confirmar
        </Button>
        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5}></Box>
      </form>
    </div>
  );
}
