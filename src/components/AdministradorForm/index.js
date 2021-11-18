import React from "react";
import propTypes from "prop-types";
import { Button, TextField, Typography } from "@mui/material";
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
  errors: propTypes.object,
  title: propTypes.string,
};

export default function AdministratorForm({
  title,
  onSubmit,
  onInputChange,
  administrator,
  errors,
}) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              required
              type="email"
              label="Email"
              name="email"
              value={administrator.email}
              onChange={onInputChange}
              error={!!errors?.email}
              helperText={errors?.email?.[0]}
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
              fullWidth
              id="password"
              type="password"
              label="Contraseña"
              required
              name="password"
              value={administrator.password}
              error={!!errors?.password}
              helperText={errors?.password?.[0]}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password_confirmation"
              type="password"
              required
              label="Confirmación de contraseña"
              name="password_confirmation"
              value={administrator.password_confirmation}
              error={!!errors?.password_confirmation}
              helperText={errors?.password_confirmation?.[0]}
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
          className={classes.submit}
        >
          Guardar
        </Button>
      </form>
    </div>
  );
}
