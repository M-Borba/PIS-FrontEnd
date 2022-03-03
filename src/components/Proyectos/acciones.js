import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Box, FormControlLabel, IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import { axiosInstance } from "../../config/axios";
import { useStyles } from "./styles";
import EliminarProyecto from "../../containers/EliminarProyecto";
import EditarProyecto from "../../containers/EditarProyecto";
import AgregarPersona from "../../containers/AsignarPersonaAProyecto";
import ListadoPersonasAsignadas from "../PersonasAsignadas";
import RemoverPersona from "../../containers/RemoverPersonaDeProyecto";
import { UpdateGridContext } from "../../containers/UpdateGridProvider/index";
import { dateFormatToMoment } from "../../utils/utils";
import { PERSON_LABELS } from "../../config/globalVariables";
import AssignExtendDialog from "../AssignExtendDialog";

Acciones.propTypes = {
  projectRow: propTypes.any,
};

export default function Acciones({ projectRow }) {
  const history = useHistory();
  const [removeRow, editRow] = React.useContext(UpdateGridContext);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAssigned, setOpenAssigned] = React.useState(false);
  const [openAssignExtend, setOpenAssignExtend] = React.useState(false);
  const [openRemovePerson, setOpenRemovePerson] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [extendedEndDate, setExtendedEndDate] = React.useState(null);
  const [personToRemove, setPersonToRemove] = React.useState({
    personId: -1,
    personName: "",
    assignationId: -1,
    assignationRole: "",
  });
  const [asignaciones, setAsignaciones] = useState([]);
  const projectData = {
    id: projectRow.id,
    name: projectRow.name,
    project_type: projectRow.project_type.toLowerCase().replaceAll(" ", "_"),
    project_state: projectRow.project_state.toLowerCase(),
    description: projectRow.description,
    budget: projectRow.budget,
    start_date: dateFormatToMoment(projectRow.start_date),
    end_date: projectRow.end_date
      ? dateFormatToMoment(projectRow.end_date)
      : null,
    people: projectRow.people,
    organization: projectRow.organization,
    technologies: projectRow.technologies || [],
  };
  const classes = useStyles();

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleAssignedOpen = () => setOpenAssigned(true);
  const handleAssignedClose = () => setOpenAssigned(false);

  const handleAssignExtendOpen = (extendedEndDate) => {
    setExtendedEndDate(extendedEndDate);
    setOpenAssignExtend(true);
  };
  const handleAssignExtendClose = () => setOpenAssignExtend(false);

  const handleRemovePersonOpen = (
    personId,
    personName,
    assignationId,
    assignationRole
  ) => {
    setPersonToRemove({ personId, personName, assignationId, assignationRole });
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
          if (project.id === projectData.id) {
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
        margin: "10px 0px 10px 10px",
      }}
    >
      <FormControlLabel
        control={
          <>
            <IconButton
              variant="outlined"
              onClick={() => history.push(`/proyecto/${projectData.id}`)}
            >
              <VisibilityIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
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
                  editRow={editRow.current}
                  onClose={handleEditClose}
                  handleAssignExtendOpen={handleAssignExtendOpen}
                />
              </Box>
            </Modal>
            <Dialog
              open={openAssignExtend}
              PaperProps={{ style: { borderRadius: 16 } }}
              onClose={handleAssignExtendClose}
            >
              {asignaciones && (
                <AssignExtendDialog
                  project={projectData}
                  assignations={asignaciones}
                  handleClose={handleAssignExtendClose}
                />
              )}
            </Dialog>
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
                  projectData={projectData}
                  asignaciones={asignaciones}
                  setAsignaciones={setAsignaciones}
                  editRow={editRow.current}
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
              style={{ borderRadius: 16 }}
              PaperProps={{ style: { borderRadius: 16, outline: "none" } }}
              aria-labelledby="confirmation-dialog-title"
            >
              <RemoverPersona
                personName={personToRemove.personName}
                personId={personToRemove.personId}
                assignId={personToRemove.assignationId}
                assignRole={personToRemove.assignationRole}
                assignClose={handleAssignedClose}
                projectData={projectData}
                handleClose={handleRemovePersonClose}
                asignaciones={asignaciones}
                setAsignaciones={setAsignaciones}
                editRow={editRow.current}
              />
            </Dialog>
            <Modal
              open={openAssigned}
              onClose={handleAssignedClose}
              aria-labelledby="confirmation-dialog-title"
            >
              <Card classes={{ root: classes.modal }}>
                <IconButton
                  aria-label="Close"
                  onClick={handleAssignedClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <CardHeader
                  className={classes.cardHeader}
                  title={
                    <Typography variant="h5">
                      {PERSON_LABELS.PERSONAS_ASIGNADAS}
                    </Typography>
                  }
                />
                <ListadoPersonasAsignadas
                  people={asignaciones}
                  removePerson={handleRemovePersonOpen}
                />
              </Card>
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
              PaperProps={{ style: { borderRadius: 16, outline: "none" } }}
              open={openRemove}
              onClose={handleRemoveClose}
              maxWidth="xs"
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarProyecto
                projectId={projectRow.id}
                projectName={projectRow.name}
                handleClose={handleRemoveClose}
                removeRow={removeRow.current}
              />
            </Dialog>
          </>
        }
      />
    </div>
  );
}
