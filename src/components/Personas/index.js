import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import CreatePerson from "../../containers/CreatePerson";
import EditPerson from "../../containers/EditPerson";
import Dialog from "@material-ui/core/Dialog";
import EliminarPersona from "../../containers/EliminarPersona";
import InfoPopUp from "../InfoPopUp";


Personas.propTypes = {
  rows: PropTypes.array,
};

const Acciones = ({ personRow }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const classes = useStyles();
  let fullName = personRow.fullName.split(" ");
  const [personData] = React.useState({
    id: personRow.id,
    first_name: fullName[0],
    last_name: fullName[1],
    email: personRow.email,
    working_hours: personRow.cargaHoraria,
    tags: personRow.tags,
  });

  const handleEditOpen = (e) => setOpenEdit(true);
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  const handleOpenSuccess = () => setOpenSuccess(true);
  const handleSuccessClose = () => {
    setOpenSuccess(false);
    handleEditClose();
    window.location.reload();
  };

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
                <Dialog
                  open={openSuccess}
                  onClose={handleSuccessClose}
                  maxWidth="xs"
                  aria-labelledby="confirmation-dialog-title"
                >
                  <InfoPopUp
                    title={"Resultado de la modificacion"}
                    content={"Persona modificada exitosamente"}
                    onConfirm={handleSuccessClose}
                  />
                </Dialog>
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
                  resultOk={() => {
                    handleOpenSuccess();
                  }}
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
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarPersona
                personName={personRow.fullName}
                personId={personRow.id}
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
    field: "fullName",
    headerName: "Nombre completo",
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
          <Acciones personRow={params.row} />
        </div>
      );
    },
  },
];

Acciones.propTypes = {
  personRow: PropTypes.any,
};

export default function Personas({ rows }) {

  const classes = useStyles();
  const [openNew, setOpenNew] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleNewOpen = () => setOpenNew(true);

  const handleNewClose = () => {
    setOpenNew(false);
  };

  const handleOpenSuccess = () => setOpenSuccess(true);
  const handleSuccessClose = () => {
    setOpenSuccess(false);
    handleNewClose();
    window.location.reload();
  };

  const [sortModel, setSortModel] = React.useState([
    {
      field: "fullName",
      sort: "asc",
    },
  ]);

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
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
      <div
        style={{
          margin: 10,
        }} /* relleno, si alguien sabe hacer esto mejor que lo cambie*/
      ></div>
      <Button color="primary" variant="contained" onClick={handleNewOpen}>
        Agregar Persona
      </Button>
      <Dialog
        open={openSuccess}
        onClose={handleSuccessClose}
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
      >
        <InfoPopUp
          title={"Resultado de alta"}
          content={"Persona creada exitosamente"}
          onConfirm={handleSuccessClose}
        />
      </Dialog>
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
            resultOk={() => {
              handleOpenSuccess();
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
