import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";

Personas.propTypes = {
  rows: PropTypes.array,
};

const Acciones = () => {
  const handleEditClick = () => {
    // aca para editar la info
  };

  const handleRemoveClick = () => {
    // aca para borrar la persona
  };

  return (
    <div>
      <FormControlLabel
        control={
          <IconButton onClick={handleEditClick}>
            <EditIcon style={{ color: "rgb(30, 30, 30)" }} />
          </IconButton>
        }
      />
      <FormControlLabel
        control={
          <IconButton onClick={handleRemoveClick}>
            <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
          </IconButton>
        }
      />
    </div>
  );
};

const columns = [
  {
    field: "fullName",
    headerName: "Nombre completo",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "id",
    headerName: "Email",
    sortable: true,
    flex: 1,
  },
  {
    field: "cargaHoraria",
    headerName: "Carga horaria",
    flex: 0.7,
  },
  {
    field: "tag",
    headerName: "Etiqueta",
    sortable: true,
    flex: 1,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <Acciones />
        </div>
      );
    },
  },
];

export default function Personas({ rows }) {
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

      >
        Agregar Persona
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <CreatePerson />
        </Box>
      </Modal>
    </div>
  );
}
