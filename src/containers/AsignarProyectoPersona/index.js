import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import { useSnackbar } from "notistack";

import AsignacionForm from "../../components/AsignacionDialog";
import { axiosInstance } from "../../config/axios";
import { rolesFormateados } from "../../config/globalVariables";

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
            autoHideDuration: 8000,
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
          } a: ${personName} en ${asignacionData.project.name} con éxito.`,
          { variant: "success", autoHideDuration: 4000 }
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
          { variant: "error", autoHideDuration: 8000 }
        );
        setRequestBody(initialState);
      });
  };

  const onInputChange = (e, type) => {
    if (e._isAMomentObject) {
      if (!e._isValid) return;
      setRequestBody({
        ...requestBody,
        [type]: e,
      });
      return;
    }
    e.target.id === "fechaInicio" &&
      setRequestBody({ ...requestBody, start_date: e.target.value });
    e.target.id === "fechaFin" &&
      setRequestBody({ ...requestBody, end_date: e.target.value });
    if (e.target.name === "project") {
      const proy = proyectos.find((proyecto) => proyecto.id === e.target.value);
      setRequestBody({
        ...requestBody,
        project_id: e.target.value,
        start_date: proy.start_date,
        end_date: proy.end_date,
      });
    }
    e.target.name === "role" &&
      setRequestBody({ ...requestBody, role: e.target.value });
    e.target.name === "working_hours_type" &&
      setRequestBody({ ...requestBody, working_hours_type: e.target.value });
    e.target.id === "horas" &&
      setRequestBody({ ...requestBody, working_hours: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setRequestBody(initialState);
  };

  return (
    <Dialog
      PaperProps={{ style: { borderRadius: 16, outline: "none" } }}
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth={"xs"}
    >
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
