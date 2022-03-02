import React, { Fragment, useEffect, useState } from "react";
import propTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Dialog, Popover } from "@mui/material";

import { useStyles } from "./styles";
import { axiosInstance } from "../../config/axios";
import { BUTTON_LABELS, rolesFormateados } from "../../config/globalVariables";
import InfoAsignacionDialog from "../../components/InfoAsignacionDialog";
import DeleteDialogContent from "../../components/DeleteDialogContent";

InfoAsignacion.propTypes = {
  open: propTypes.bool.isRequired,
  projectName: propTypes.string.isRequired,
  personName: propTypes.string.isRequired,
  asignacionId: propTypes.number.isRequired,
  onClose: propTypes.func.isRequired,
  removeAsignacion: propTypes.func.isRequired,
  updateAsignacion: propTypes.func.isRequired,
  mouseX: propTypes.number.isRequired,
  mouseY: propTypes.number.isRequired,
};

const initialState = {
  role: "",
  working_hours: 0,
  working_hours_type: "",
  start_date: "",
  end_date: "",
  project: {},
};

function InfoAsignacion({
  open,
  projectName,
  personName,
  asignacionId,
  onClose,
  removeAsignacion,
  updateAsignacion,
  mouseX,
  mouseY,
}) {
  const classes = useStyles();
  const [asignacionInfo, setAsignacionInfo] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmacion, setOpenConfirmacion] = useState(false);

  const dialogContent = `¿Está seguro que desea eliminar la asignación de ${personName} en ${
    projectName.split("-")[0]
  } como ${projectName.split("-")[1]}?`;

  useEffect(() => {
    // Traigo asignacion
    open &&
      axiosInstance
        .get(`/person_project/${asignacionId}`)
        .then((response) => {
          let asignacionData = response.data.person_project;
          axiosInstance
            .get(`/projects/${asignacionData.project.id}`)
            .then((response) => {
              setAsignacionInfo({
                role: asignacionData.role,
                working_hours: asignacionData.working_hours,
                working_hours_type: asignacionData.working_hours_type,
                start_date: asignacionData.start_date,
                end_date: asignacionData.end_date,
                project: response.data.project,
              });
            });
        })
        .catch((error) => {
          let message = error.response.data;
          console.error(message);
          enqueueSnackbar(
            message.error
              ? message.error
              : message.errors[Object.keys(message.errors)[0]],
            { variant: "error", autoHideDuration: 8000 }
          );
          onClose();
        });
  }, [open]);

  const handleAplicarCambios = (e) => {
    // API call
    e.preventDefault();
    console.log(asignacionInfo);
    console.log(asignacionId);
    axiosInstance
      .put(`/person_project/${asignacionId}`, {
        person_project: asignacionInfo,
      })
      .then((response) => {
        let asignacion = response.data.person_project;
        updateAsignacion(
          asignacionId,
          `${asignacion.project.name} - ${rolesFormateados[asignacion.role]}`,
          asignacion.start_date,
          asignacion.end_date
        );
        enqueueSnackbar(`Los cambios se aplicaron con éxito.`, {
          variant: "success",
          autoHideDuration: 4000,
        });
        onClose();
        setAsignacionInfo(initialState);
      })
      .catch((error) => {
        let message = error.response.data;
        console.error(message);
        enqueueSnackbar(
          message.error
            ? message.error
            : message.errors[Object.keys(message.errors)[0]],
          { variant: "error", autoHideDuration: 8000 }
        );
      });
  };

  const handleDesasignar = () => {
    // API call

    handleConfirmacionClose();
    onClose();
    setAsignacionInfo(initialState);

    axiosInstance
      .delete(`/person_project/${asignacionId}`)
      .then((response) => {
        removeAsignacion(asignacionId);
        enqueueSnackbar(response.data.message, {
          variant: "success",
          autoHideDuration: 4000,
        });
      })
      .catch((error) => {
        console.error(error.response);
        let message = error.response.data.error;
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 8000 });
      });
  };

  const onInputChange = (e, type = "") => {
    if (e._isAMomentObject) {
      if (!e._isValid) return;
      type === "start_date" &&
        setAsignacionInfo({
          ...asignacionInfo,
          start_date: e.format("YYYY-MM-DD"),
        });
      type === "end_date" &&
        setAsignacionInfo({
          ...asignacionInfo,
          end_date: e.format("YYYY-MM-DD"),
        });
      return;
    }
    e.target.name === "rol" &&
      setAsignacionInfo({ ...asignacionInfo, role: e.target.value });
    e.target.id === "working_hours" &&
      setAsignacionInfo({ ...asignacionInfo, working_hours: e.target.value });
    e.target.name === "working_hours_type" &&
      setAsignacionInfo({
        ...asignacionInfo,
        working_hours_type: e.target.value,
      });
  };

  const handleClose = () => {
    onClose();
    setAsignacionInfo(initialState);
  };

  const handleConfirmacionClose = () => setOpenConfirmacion(false);

  const handleConfirmacionOpen = () => {
    setOpenConfirmacion(true);
  };

  return (
    <Fragment>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{ top: mouseY, left: mouseX }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            borderRadius: "16px",
          },
        }}
        open={open}
        onClose={handleClose}
        disableEnforceFocus
      >
        {asignacionInfo.project && (
          <InfoAsignacionDialog
            asignacionInfo={asignacionInfo}
            projectName={projectName}
            personName={personName}
            onClose={handleClose}
            onChange={onInputChange}
            aplicarCambios={handleAplicarCambios}
            desasignar={handleConfirmacionOpen}
            project={asignacionInfo.project}
          />
        )}
      </Popover>
      <Dialog
        PaperProps={{ style: { borderRadius: 16, outline: "none" } }}
        fullWidth
        open={openConfirmacion}
        onClose={handleConfirmacionClose}
        maxWidth={"xs"}
      >
        <DeleteDialogContent
          dialogContent={dialogContent}
          onClose={handleConfirmacionClose}
          onConfirmation={handleDesasignar}
          deleteButtonText={BUTTON_LABELS.UNASSIGN}
        />
      </Dialog>
    </Fragment>
  );
}

export default InfoAsignacion;
