import React, { useState } from "react";
import propTypes from "prop-types";
import { Button, TextField, Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import Grid from "@mui/material/Grid";

AdministratorForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  administrator: propTypes.shape({
    email: propTypes.string,
    first_name: propTypes.string,
    last_name: propTypes.string,
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
        <Grid container rowSpacing={0} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="first_name"
              type="text"
              label="Nombre"
              name="first_name"
              value={administrator.first_name}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="last_name"
              type="text"
              label="Apellido"
              name="last_name"
              value={administrator.last_name}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              type="password"
              label="Contraseña"
              name="password"
              value={administrator.password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password_confirmation"
              type="password"
              label="Confirmación de contraseña"
              name="password_confirmation"
              value={administrator.password_confirmation}
              onChange={onInputChange}
            />
          </Grid>
        </Grid>
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
