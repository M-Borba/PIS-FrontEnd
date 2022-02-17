import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";
import { LOGIN_LABELS } from "../../config/globalVariables";

ChangePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

export default function ChangePassword({
  onSubmit,
  onInputChange,
  password,
  passwordConfirmation,
  errors,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper} data-testid="login">
      <Typography component="h1" variant="h5">
        {LOGIN_LABELS.CAMBIO_TEXTO}
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
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
          error={!!errors?.password}
          helperText={errors?.password?.[0]}
          onChange={(e) => onInputChange(e)}
          autoComplete="current-password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label={LOGIN_LABELS.CONFIRMAR_CONTRASENA}
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          error={!!errors?.password_confirmation}
          helperText={errors?.password_confirmation?.[0]}
          onChange={(e) => onInputChange(e)}
          autoComplete="current-password"
        />
        <Button
          style={{ marginTop: 20 }}
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
        >
          {LOGIN_LABELS.CAMBIO_BUTTON}
        </Button>
      </form>
    </div>
  );
}
