import * as React from "react";
import { FormControlLabel, IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import EditPerson from "../../containers/EditPerson";
import Dialog from "@material-ui/core/Dialog";
import EliminarPersona from "../../containers/EliminarPersona";
import Notificacion from "../../components/Notificacion";
import Listado from "../../components/Listado"

Personas.propTypes = {
  rows: propTypes.array,
};

const Acciones = ({ personRow }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });

  const classes = useStyles();
  const [personData] = React.useState({
    id: personRow.id,
    first_name: personRow.firstName,
    last_name: personRow.lastName,
    email: personRow.email,
    working_hours: personRow.cargaHoraria,
    tags: personRow.tags,
    technologies: personRow.technologies || [],
  });

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
                setNotify={setNotify}
              />
            </Dialog>
          </React.Fragment>
        }
      />
      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
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

Acciones.propTypes = {
  personRow: propTypes.any,
};

export default function Personas({ rows }) {
  const [openNew, setOpenNew] = React.useState(false);
  const classes = useStyles();
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });

  const handleNewOpen = () => setOpenNew(true);

  const handleNewClose = () => setOpenNew(false);

  const [sortModel, setSortModel] = React.useState([
    {
      field: "fullName",
      sort: "asc",
    },
  ]);

  return (
    <Listado
      button={"Agregar Persona"}
      buttonClick={handleNewOpen}
      modalOpen={openNew}
      modalOnClose={handleNewClose}
      sortModel={sortModel}
      setSortModel={setSortModel}
      notify={notify}
      setNotify={setNotify}
      columns={columns}
      rows={rows}
    />
  );
}
