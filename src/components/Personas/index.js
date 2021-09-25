import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

let rows = [
  {
    fullName: "Ana Barboza",
    id: "ana@effectus.com",
    cargaHoraria: 40,
    tag: "Backender",
  },
  {
    fullName: "Carlos Dominguez",
    id: "carlos@effectus.com",
    cargaHoraria: 40,
    tag: "Frontender",
  },
  {
    fullName: "Esteban Feitas",
    id: "efleitas@effectus.com",
    cargaHoraria: 40,
    tag: "Frontender",
  },
];

export default function Personas() {
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
         Aca va formulario para agregar persona
      }*/
      >
        Agregar Persona
      </Button>
    </div>
  );
}
