import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import EliminarProyecto from "../../containers/EliminarProyecto";

Proyecto.propTypes = {
  rows: PropTypes.array,
};

const Acciones = ({ proyectRow }) => {
  const [openRemove, setOpenRemove] = React.useState(false);

  const handleInfoClick = () => {
    // aca para ver la info
  };

  const handleRemoveOpen = () => setOpenRemove(true);

  const handleRemoveClose = () => setOpenRemove(false);

  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <FormControlLabel
        control={
          <Button variant="outlined" onClick={handleInfoClick}>
            Ver Info Completa
          </Button>
        }
      />
      <FormControlLabel
        control={
          <React.Fragment>
            <IconButton onClick={handleRemoveOpen}>
              <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Dialog
              open={openRemove}
              onClose={handleRemoveClose}
              // disableBackdropClick
              // disableEscapeKeyDown
              maxWidth="xs"
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarProyecto
                projectId={proyectRow.id}
                projectName={proyectRow.nombre}
                handleClose={handleRemoveClose}
              />
            </Dialog>
          </React.Fragment>
        }
      />
    </div>
  );
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    //id
  },
  {
    field: "nombre",
    headerName: "Nombre",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "tipo",
    headerName: "Tipo",
    flex: 0.7,
  },
  {
    field: "estado",
    headerName: "Estado",
    sortable: true,
    flex: 1,
  },
  {
    field: "inicio",
    headerName: "Fecha Inicio",
    flex: 0.6,
    type: "date",
  },
  {
    field: "fin",
    headerName: "Fecha Fin",
    flex: 0.6,
    type: "date",
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <Acciones proyectRow={params.row} />
        </div>
      );
    },
  },
];

Acciones.propTypes = {
  proyectRow: PropTypes.any,
};

/* let rows = [
  {
    id: "Pr1",
    tipo: "Desarrollo",
    estado: "In Progress",
    inicio: new Date(2021, 0, 1),
    fin: new Date(2022, 0, 1),
  },
]; */

export default function Proyecto({ rows }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "15%",
        left: "5%",
        height: "75%",
        width: "90%",
      }}
    >
      <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
      <div
        style={{
          margin: 10,
        }} /* relleno, si alguien sabe hacer esto mejor que lo cambie*/
      ></div>
      <Button
        color="primary"
        variant="contained"
        /*onClick={() =>
     Aca va formulario para agregar proyecto
  }*/
      >
        Agregar Proyecto
      </Button>
    </div>
  );
}
