import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

ChangePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default function ChangePassword({
  onSubmit,
  onInputChange,
  password,
  passwordConfirmation,
  error,
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper} data-testid="login">
      <Typography component="h1" variant="h5">
        Parece que es la primera vez que inicia sesión. Por favor, ingrese una nueva contraseña.
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          value={password}
          onChange={(e) => onInputChange(e)}
          autoComplete="current-password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label="Confirme su contraseña"
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => onInputChange(e)}
          autoComplete="current-password"
        />
        <Button
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Establecer nueva contraseña e iniciar sesión
        </Button>

        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5}></Box>
      </form>
    </div>
  );
}
