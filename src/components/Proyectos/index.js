import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Dialog from "@material-ui/core/Dialog";
import EliminarProyecto from "../../containers/EliminarProyecto";
import EditarProyecto from "../../containers/EditarProyecto";
import InfoProyecto from "../../containers/InfoProyecto";
import AgregarPersona from "../../containers/AsignarPersonaAProyecto";
import CreateProject from "../../containers/CreateProject";
import Notificacion from "../../components/Notificacion";
import RemoverPersona from "../../containers/RemoverPersonaDeProyecto";

Proyecto.propTypes = {
  rows: PropTypes.array,
};

// function removePerson(id) {
//   console.log("se quizo borrar ", id);
// }

const Acciones = ({ projectRow }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemovePerson, setOpenRemovePerson] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [personToRemove, setPersonToRemove] = React.useState(["", ""]);

  const classes = useStyles();
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [projectData] = React.useState({
    id: projectRow.id,
    name: projectRow.name,
    project_type: projectRow.project_type.toLowerCase().replaceAll(" ", "_"),
    project_state: projectRow.project_state.toLowerCase(),
    description: projectRow.description,
    budget: projectRow.budget,
    start_date: projectRow.start_date,
    end_date: projectRow.end_date,
    technologies: ["java", "python"], //projectRow.technologies,
    people: projectRow.people,
    organization: projectRow.organization,
  });

  const handleInfoClick = () => {
    setOpenInfo(true);
  };
  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleRemovePersonOpen = (id, name) => {
    setOpenRemovePerson(true);
    setPersonToRemove([id, name]);
  };
  const handleRemovePersonClose = () => setOpenRemovePerson(false);

  const handleAddOpen = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <FormControlLabel
        control={
          <>
            <IconButton variant="outlined" onClick={handleInfoClick}>
              <VisibilityIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Modal
              open={openInfo}
              onClose={handleInfoClose}
              disableEnforceFocus
            >
              <Box className={classes.modalInfo}>
                <IconButton
                  aria-label="Close"
                  onClick={handleInfoClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <InfoProyecto
                  projectData={projectData}
                  type={projectRow.project_type}
                  state={projectRow.project_state}
                />
              </Box>
            </Modal>
          </>
        }
      />
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleEditOpen}>
              <EditIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Dialog
              open={openRemovePerson}
              onClose={handleRemovePersonClose}
              maxWidth="xs"
              aria-labelledby="confirmation-dialog-title"
            >
              <RemoverPersona
                personName={personToRemove[1]}
                personId={personToRemove[0]}
                projectId={projectRow.id}
                projectName={projectRow.name}
                handleClose={handleRemovePersonClose}
                setNotify={setNotify}
              />
            </Dialog>
            <Modal
              open={openEdit}
              onClose={handleEditClose}
              disableEnforceFocus
            >
              <Box className={classes.modal}>
                <IconButton
                  aria-label="Close"
                  onClick={handleEditClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <EditarProyecto
                  projectData={projectData}
                  id={projectData.id}
                  setNotify={setNotify}
                  removePerson={handleRemovePersonOpen}
                />
              </Box>
            </Modal>
          </>
        }
      />
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleAddOpen}>
              <PersonAdd style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Modal
              open={openAdd}
              onClose={handleAddClose}
              aria-labelledby="confirmation-dialog-title"
            >
              <Box className={classes.modal}>
                <AgregarPersona
                  projectData={{
                    id: projectData.id,
                    name: projectData.name,
                    startDate: projectData.start_date,
                    endDate: projectData.end_date,
                  }}
                />
              </Box>
            </Modal>
          </>
        }
      />
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleRemoveOpen}>
              <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Dialog
              open={openRemove}
              onClose={handleRemoveClose}
              maxWidth="xs"
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarProyecto
                projectId={projectRow.id}
                projectName={projectRow.name}
                handleClose={handleRemoveClose}
                setNotify={setNotify}
              />
            </Dialog>
          </>
        }
      />
      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
};

const columns = [
  {
    field: "name",
    headerName: "Nombre",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "project_type",
    headerName: "Tipo",
    flex: 0.7,
  },
  {
    field: "project_state",
    headerName: "Estado",
    sortable: true,
    flex: 0.5,
  },
  {
    field: "start_date",
    headerName: "Fecha Inicio",
    flex: 0.6,
    type: "date",
  },
  {
    field: "end_date",
    headerName: "Fecha Fin",
    flex: 0.6,
    type: "date",
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 1.5,
    renderCell: (params) => {
      return (
        <div>
          <Acciones projectRow={params.row} />
        </div>
      );
    },
  },
];

Acciones.propTypes = {
  projectRow: PropTypes.any,
};

export default function Proyecto({ rows }) {
  const classes = useStyles();
  const [openNew, setOpenNew] = React.useState(false);
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
      field: "name",
      sort: "asc",
    },
  ]);

  return (
    <div
      style={{
        margin: "1vw",
      }}
    >
      <Box m={1} mb={1} className={`${classes.rightBox} ${classes.box}`}>
        <Button color="primary" variant="contained" onClick={handleNewOpen}>
          Agregar Proyecto
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
          <CreateProject setNotify={setNotify} />
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
