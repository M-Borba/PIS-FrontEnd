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
import CustomButton from "../CustomButton";
import { BUTTON_LABELS, PERSON_LABELS } from "../../config/globalVariables";

Personas.propTypes = {
  rows: propTypes.array,
  setRows: propTypes.func,
};

const columns = [
  {
    field: "id",
    headerName: PERSON_LABELS.ID,
    hide: true,
  },
  {
    field: "fullName",
    headerName: PERSON_LABELS.NOMBRE_COMPLETO,
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "email",
    headerName: PERSON_LABELS.EMAIL,
    sortable: true,
    flex: 1,
  },
  {
    field: "cargaHoraria",
    headerName: PERSON_LABELS.CARGA_HORARIA_SEMANAL,
    flex: 0.7,
  },
  {
    field: "technologies",
    headerName: PERSON_LABELS.TECNOLOGIAS,
    hide: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: PERSON_LABELS.ACCIONES,
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
      field: "fullName",
      sort: "asc",
    },
  ]);
  const classes = useStyles();

  const handleNewOpen = () => setOpenNew(true);

  const handleNewClose = () => setOpenNew(false);

  const addRow = (newRow) => setRows([...rows, newRow]);

  const removeRow = (personId) =>
    setRows(rows.filter((row) => row.id !== personId));
  setRemoveRow.current = (personId) => removeRow(personId);

  const editRow = (personData) =>
    setRows(
      rows.map((row) =>
        row.id === personData.id
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
        <CustomButton variant="contained" onClick={handleNewOpen}>
          {BUTTON_LABELS.AGREGAR_PERSONA}
        </CustomButton>
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
