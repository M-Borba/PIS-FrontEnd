import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import CreatePerson from "../../containers/CreatePerson";
import EditPerson from "../../containers/EditPerson";
import Dialog from "@material-ui/core/Dialog";
import EliminarPersona from "../../containers/EliminarPersona";
import Notificacion from "../../components/Notificacion";
import { UpdateGridContext } from "../../containers/ListarPersonas/index";

Personas.propTypes = {
  rows: propTypes.array,
  setRows: propTypes.func,
};

Acciones.propTypes = {
  personRow: propTypes.any,
};

function Acciones({ personRow }) {
  const [removeRow, editRow] = React.useContext(UpdateGridContext);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });

  const classes = useStyles();
  const personData = {
    id: personRow.id,
    first_name: personRow.firstName,
    last_name: personRow.lastName,
    email: personRow.email,
    working_hours: personRow.cargaHoraria,
    tags: personRow.tags,
    technologies: personRow.technologies || [],
  };

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  return (
    <div>
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleEditOpen}>
              <EditIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Modal
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.modal}>
                <IconButton
                  aria-label="Close"
                  onClick={handleEditClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <EditPerson
                  personData={personData}
                  id={personData.id}
                  setNotify={setNotify}
                  onClose={handleEditClose}
                  editRow={editRow.current}
                />
              </Box>
            </Modal>
          </>
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
              maxWidth="xs"
              fullWidth
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarPersona
                personName={personRow.fullName}
                personId={personRow.id}
                handleClose={handleRemoveClose}
                setNotify={setNotify}
                removeRow={removeRow.current}
              />
            </Dialog>
          </React.Fragment>
        }
      />
      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
}

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
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
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
            tag: ".",
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
        <Button color="primary" variant="contained" onClick={handleNewOpen}>
          Agregar Persona
        </Button>
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
          <CreatePerson
            setNotify={setNotify}
            addRow={addRow}
            onClose={handleNewClose}
          />
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

      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
}
