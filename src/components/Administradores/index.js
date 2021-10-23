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

  const [openAdmin, setOpenAdmin] = React.useState(false);

  const handleAdminOpen = () => setOpenAdmin(true);
  const handleAdminClose = () => setOpenAdmin(false);

  return (
    <>
      <Typography
        style={{ marginTop: 20 }}
        color="primary"
        variant="h4"
        align="center"
      >
        LISTADO DE ADMINISTRADORES
      </Typography>
      <div
        style={{
          margin: "1vw",
        }}
      >
        <Box m={1} mb={1} className={`${classes.rightBox} ${classes.box}`}>
          <Button color="primary" variant="contained" onClick={handleAdminOpen}>
            Agregar Proyecto
          </Button>
        </Box>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            style={{ height: "70vh" }}
          />
        </div>
      </div>
    </>
  );
}
