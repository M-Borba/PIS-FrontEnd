import React, { useEffect, useState, Fragment } from "react";
import propTypes from "prop-types";
import InfoAsignacionDialog from "../../components/InfoAsignacionDialog";
import Dialog from "@mui/material/Dialog";
import { axiosInstance } from "../../config/axios";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { rolesFormateados } from "../../config/globalVariables";
import { useSnackbar } from "notistack";

InfoAsignacion.propTypes = {
  open: propTypes.bool.isRequired,
  projectName: propTypes.string.isRequired,
  personName: propTypes.string.isRequired,
  asignacionId: propTypes.number.isRequired,
  onClose: propTypes.func.isRequired,
  removeAsignacion: propTypes.func.isRequired,
  updateAsignacion: propTypes.func.isRequired,
};

const initialState = {
  role: "",
  working_hours: 0,
  working_hours_type: "",
  start_date: "",
  end_date: "",
};

function InfoAsignacion({
  open,
  projectName,
  personName,
  asignacionId,
  onClose,
  removeAsignacion,
  updateAsignacion,
}) {
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
          setAsignacionInfo({
            role: asignacionData.role,
            working_hours: asignacionData.working_hours,
            working_hours_type: asignacionData.working_hours_type,
            start_date: asignacionData.start_date,
            end_date: asignacionData.end_date,
          });
        })
        .catch((error) => {
          let message = error.response.data;
          console.error(message);
          enqueueSnackbar(
            message.error
              ? message.error
              : message.errors[Object.keys(message.errors)[0]],
            { variant: "error", persist: true }
          );
          onClose();
        });
  }, [open]);

  const handleAplicarCambios = (e) => {
    // API call
    e.preventDefault();

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
          { variant: "error", persist: true }
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
        enqueueSnackbar(response.data.message, { variant: "success" });
      })
      .catch((error) => {
        console.error(error.response);
        let message = error.response.data.error;
        enqueueSnackbar(message, { variant: "error", persist: true });
      });
  };

  const onInputChange = (e) => {
    e.target.name == "rol" &&
      setAsignacionInfo({ ...asignacionInfo, role: e.target.value });
    e.target.id == "working_hours" &&
      setAsignacionInfo({ ...asignacionInfo, working_hours: e.target.value });
    e.target.name == "working_hours_type" &&
      setAsignacionInfo({
        ...asignacionInfo,
        working_hours_type: e.target.value,
      });
    e.target.id == "start_date" &&
      setAsignacionInfo({ ...asignacionInfo, start_date: e.target.value });
    e.target.id == "end_date" &&
      setAsignacionInfo({ ...asignacionInfo, end_date: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setAsignacionInfo(initialState);
  };

  const handleConfirmacionClose = () => setOpenConfirmacion(false);

  const handleConfirmacionOpen = () => setOpenConfirmacion(true);

  return (
    <Fragment>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"xs"}>
        <InfoAsignacionDialog
          asignacionInfo={asignacionInfo}
          projectName={projectName}
          personName={personName}
          onClose={handleClose}
          onChange={onInputChange}
          aplicarCambios={handleAplicarCambios}
          desasignar={handleConfirmacionOpen}
        />
      </Dialog>
      <Dialog
        fullWidth
        open={openConfirmacion}
        onClose={handleConfirmacionClose}
        maxWidth={"xs"}
      >
        <DeleteDialogContent
          dialogContent={dialogContent}
          onClose={handleConfirmacionClose}
          onConfirmation={handleDesasignar}
        />
      </Dialog>
    </Fragment>
  );
}

export default InfoAsignacion;
