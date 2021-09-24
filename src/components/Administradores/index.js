import * as React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Button from '@material-ui/core/Button';
import { useStyles } from "./styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Acciones from "./acciones";

Administradores.propTypes = {
  onSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
};

const columns = [

  {
    field: "id",
    headerName: "Email",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Acciones',
    flex: 0.3,
    renderCell: (params) => {
      return (
        <div>
          <Acciones />
        </div>
      );
    }
  },
];


let rows = [
  { id: 'example@effectus.com' },
];

export default function Administradores({
  onSubmit,
  onInputChange,
  email,
  password,
  error,
}) {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <div style={{ float: "left", width: "45%", height: 600, }} /*className={classes.child}*/>
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
        />
      </div>
      <div style={{ float: "right", width: "45%", height: 600, }} /*className={classes.child}*/>
        <Typography component="h1" variant="h5">
          Registrar un nuevo admin
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
            label="Password"
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
            name="password2"
            label="Confirmar Password"
            type="password"
            id="password2"
            value={password}
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
            Registrar

          </Button>

          <Typography className={classes.errorMsg} component="h2">
            {error}
          </Typography>

          <Box mt={5}></Box>
        </form>
      </div>
    </div>
  );
}
