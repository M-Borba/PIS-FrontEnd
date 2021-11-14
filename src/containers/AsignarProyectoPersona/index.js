import React, { useEffect, useState } from "react";
import AsignacionForm from "../../components/AsignacionDialog";
import { axiosInstance } from "../../config/axios";
import { rolesFormateados } from "../../config/globalVariables";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import { useSnackbar } from "notistack";

AsignarProyectoPersona.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  personName: PropTypes.string.isRequired,
  fechaInicio: PropTypes.string.isRequired,
  addAsignacion: PropTypes.func.isRequired,
};

const initialState = {
  project_id: "",
  role: "",
  working_hours: 0,
  working_hours_type: "",
  start_date: "",
  end_date: "",
};

function AsignarProyectoPersona({
  open,
  onClose,
  personId,
  personName,
  fechaInicio,
  addAsignacion,
}) {
  const [proyectos, setProyectos] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  initialState.start_date = fechaInicio;
  const [requestBody, setRequestBody] = useState(initialState);

  useEffect(() => {
    // Traigo proyectos
    open &&
      axiosInstance
        .get("/projects")
        .then((response) => {
          setProyectos(response.data.projects);
        })
        .catch((error) => {
          console.error(error.response);
          enqueueSnackbar(error.response.data?.error, {
            variant: "error",
            persist: true,
          });
        });
  }, [open]);

  const onSubmit = (e) => {
    // API call
    e.preventDefault();
    axiosInstance
      .post(`/people/${personId}/person_project`, {
        person_project: requestBody,
      })
      .then((response) => {
        let asignacionData = response.data.person_project;
        addAsignacion(
          asignacionData.id,
          asignacionData.person.id,
          `${asignacionData.project.name} - ${
            rolesFormateados[asignacionData.role]
          }`,
          asignacionData.start_date,
          asignacionData.end_date
        );
        enqueueSnackbar(
          `Se asignó el rol ${
            rolesFormateados[asignacionData.role]
          } a ${personName} en ${asignacionData.project.name} exitosamente.`,
          { variant: "success" }
        );
        onClose();
        setRequestBody(initialState);
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
        setRequestBody(initialState);
      });
  };

  const onInputChange = (e) => {
    e.target.name == "project" &&
      setRequestBody({ ...requestBody, project_id: e.target.value });
    e.target.name == "role" &&
      setRequestBody({ ...requestBody, role: e.target.value });
    e.target.id == "fechaInicio" &&
      setRequestBody({ ...requestBody, start_date: e.target.value });
    e.target.id == "fechaFin" &&
      setRequestBody({ ...requestBody, end_date: e.target.value });
    e.target.name == "working_hours_type" &&
      setRequestBody({ ...requestBody, working_hours_type: e.target.value });
    e.target.id == "horas" &&
      setRequestBody({ ...requestBody, working_hours: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setRequestBody(initialState);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"xs"}>
      <AsignacionForm
        proyectos={proyectos}
        datos={requestBody}
        personName={personName}
        onClose={handleClose}
        onSubmit={onSubmit}
        onInputChange={onInputChange}
      />
    </Dialog>
  );
}

export default AsignarProyectoPersona;
