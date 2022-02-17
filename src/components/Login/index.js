import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";
import { LOGIN_LABELS } from "../../config/globalVariables";

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default function Login({
  onSubmit,
  onInputChange,
  email,
  password,
  error,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper} data-testid="login">
      <Typography component="h1" variant="h5">
        {LOGIN_LABELS.INICIAR_SESION}
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          type="email"
          label={LOGIN_LABELS.EMAIL}
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => onInputChange(e)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={LOGIN_LABELS.CONTRASENA}
          type="password"
          id="password"
          value={password}
          onChange={(e) => onInputChange(e)}
          autoComplete="current-password"
        />
        <Button
          style={{
            marginTop: 20,
          }}
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
        >
          {LOGIN_LABELS.INICIAR_SESION}
        </Button>
        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>
      </form>
    </div>
  );
}
