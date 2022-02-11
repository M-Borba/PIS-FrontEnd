import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import CreatePerson from "../../containers/CreatePerson";
import { UpdateGridContext } from "../../containers/UpdateGridProvider/index";
import Acciones from "./acciones";
import AddButton from "../AddButton";

Personas.propTypes = {
  rows: propTypes.array,
  setRows: propTypes.func,
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    hide: true,
  },
  {
    field: "fullName",
    headerName: "Nombre Completo",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    flex: 1,
  },
  {
    field: "cargaHoraria",
    headerName: "Carga Horaria Semanal",
    flex: 0.7,
  },
  {
    field: "technologies",
    headerName: "Tecnologías",
    hide: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 0.5,
    renderCell: (params) => {
      return (
        <div>
          <Acciones personRow={params.row} />
        </div>
      );
    },
  },
];

export default function Personas({ rows, setRows }) {
  const [setRemoveRow, setEditRow] = React.useContext(UpdateGridContext);
  const [openNew, setOpenNew] = React.useState(false);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);
  const classes = useStyles();

  const handleNewOpen = () => setOpenNew(true);

  const handleNewClose = () => setOpenNew(false);

  const addRow = (newRow) => setRows([...rows, newRow]);

  const removeRow = (personId) =>
    setRows(rows.filter((row) => row.id != personId));
  setRemoveRow.current = (personId) => removeRow(personId);

  const editRow = (personData) =>
    setRows(
      rows.map((row) =>
        row.id == personData.id
          ? {
              ...row,
              fullName: personData.fullName,
              firstName: personData.firstName,
              lastName: personData.lastName,
              email: personData.email,
              cargaHoraria: personData.cargaHoraria,
              technologies: personData.technologies,
            }
          : row
      )
    );
  setEditRow.current = (personData) => editRow(personData);

  return (
    <div
      style={{
        margin: "1vw",
      }}
    >
      <Box m={1} mb={1} className={`${classes.rightBox} ${classes.box}`}>
        <AddButton variant="contained" onClick={handleNewOpen}>
          Agregar Persona
        </AddButton>
      </Box>

      <Modal
        open={openNew}
        onClose={handleNewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <IconButton
            aria-label="Close"
            onClick={handleNewClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <CreatePerson addRow={addRow} onClose={handleNewClose} />
        </Box>
      </Modal>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        style={{ height: "70vh" }}
      />
    </div>
  );
}
