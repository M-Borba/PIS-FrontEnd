import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const Acciones = () => {
  const handleInfoClick = () => {
    // aca para ver la info
  };

  const handleRemoveClick = () => {
    // aca para borrar la persona
  };

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
    field: "id",
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
          <Acciones />
        </div>
      );
    },
  },
];

let rows = [
  {
    id: "Pr1",
    tipo: "Desarrollo",
    estado: "In Progress",
    inicio: new Date(2021, 0, 1),
    fin: new Date(2022, 0, 1),
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
         Aca va formulario para agregar proyecto
      }*/
      >
        Agregar Proyecto
      </Button>
    </div>
  );
}
