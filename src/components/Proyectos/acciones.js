import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axios";
import { FormControlLabel, IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Dialog from "@material-ui/core/Dialog";
import EliminarProyecto from "../../containers/EliminarProyecto";
import EditarProyecto from "../../containers/EditarProyecto";
import InfoProyecto from "../../containers/InfoProyecto";
import AgregarPersona from "../../containers/AsignarPersonaAProyecto";
import Notificacion from "../../components/Notificacion";
import ListadoPersonasAsignadas from "../PersonasAsignadas";
import RemoverPersona from "../../containers/RemoverPersonaDeProyecto";
import { UpdateGridContext } from "../../containers/ListarProyectos/index";

Acciones.propTypes = {
  projectRow: propTypes.any,
};

export default function Acciones({ projectRow }) {
  const [removeRow, editRow] = React.useContext(UpdateGridContext);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAssigned, setOpenAssigned] = React.useState(false);
  const [openRemovePerson, setOpenRemovePerson] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [personToRemove, setPersonToRemove] = React.useState([-1, "", -1, ""]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const projectData = {
    id: projectRow.id,
    name: projectRow.name,
    project_type: projectRow.project_type.toLowerCase().replaceAll(" ", "_"),
    project_state: projectRow.project_state.toLowerCase(),
    description: projectRow.description,
    budget: projectRow.budget,
    start_date: projectRow.start_date,
    end_date: projectRow.end_date,
    people: projectRow.people,
    organization: projectRow.organization,
    technologies: projectRow.technologies || [],
  };
  const classes = useStyles();

  const handleInfoOpen = () => setOpenInfo(true);
  const handleInfoClose = () => setOpenInfo(false);

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleAssignedOpen = () => setOpenAssigned(true);
  const handleAssignedClose = () => setOpenAssigned(false);

  const handleRemovePersonOpen = (pId, pName, aId, aRole) => {
    setPersonToRemove([pId, pName, aId, aRole]);
    setOpenRemovePerson(true);
  };
  const handleRemovePersonClose = () => setOpenRemovePerson(false);

  const handleAddOpen = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  const fetchAsignaciones = () => {
    axiosInstance.get("/person_project").then((response) => {
      let asignaciones = [];
      response.data.person_project.map((person) => {
        person.person.projects.map((project) => {
          if (project.id == projectData.id) {
            asignaciones.push({
              id: person.person.id,
              name: person.person.full_name,
              roles: project.dates,
            });
          }
        });
      });
      setAsignaciones(asignaciones);
    });
  };

  useEffect(() => {
    fetchAsignaciones();
  }, []);

  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <FormControlLabel
        control={
          <>
            <IconButton variant="outlined" onClick={handleInfoOpen}>
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
                  editRow={editRow.current}
                  onClose={handleEditClose}
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
              <PersonAddAlt1Icon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Modal
              open={openAdd}
              onClose={handleAddClose}
              aria-labelledby="confirmation-dialog-title"
            >
              <Box className={classes.modal}>
                <IconButton
                  aria-label="Close"
                  onClick={handleAddClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <AgregarPersona
                  projectData={{
                    id: projectData.id,
                    name: projectData.name,
                    startDate: projectData.start_date,
                    endDate: projectData.end_date,
                  }}
                  setNotify={setNotify}
                  asignaciones={asignaciones}
                  setAsignaciones={setAsignaciones}
                  onClose={handleAddClose}
                />
              </Box>
            </Modal>
          </>
        }
      />
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleAssignedOpen}>
              <PersonRemoveIcon style={{ color: "rgb(30, 30, 30)" }} />
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
                asignId={personToRemove[2]}
                asignRole={personToRemove[3]}
                asignClose={handleAssignedClose}
                projectId={projectRow.id}
                projectName={projectRow.name}
                handleClose={handleRemovePersonClose}
                setNotify={setNotify}
                asignaciones={asignaciones}
                setAsignaciones={setAsignaciones}
              />
            </Dialog>
            <Modal
              open={openAssigned}
              onClose={handleAssignedClose}
              aria-labelledby="confirmation-dialog-title"
            >
              <Box className={classes.modal}>
                <IconButton
                  aria-label="Close"
                  onClick={handleAssignedClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <ListadoPersonasAsignadas
                  people={asignaciones}
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
                removeRow={removeRow.current}
              />
            </Dialog>
          </>
        }
      />
      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
}
