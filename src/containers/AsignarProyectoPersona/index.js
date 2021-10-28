import React, { Fragment, useEffect, useState } from "react";
import AsignacionForm from "../../components/AsignacionDialog";
import { axiosInstance } from "../../config/axios";
import { rolesFormateados } from "../../config/globalVariables";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Notificacion from "../../components/Notificacion";

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
  const [roles, setRoles] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  initialState.start_date = fechaInicio;
  const [requestBody, setRequestBdoy] = useState(initialState);

  useEffect(() => {
    // Traigo proyectos
    open &&
      axiosInstance
        .get("/projects")
        .then((response) => {
          if (response.status == 200) setProyectos(response.data.projects);
          else
            setNotify({
              isOpen: true,
              message: `Error inesperado en fetch de proyectos`,
              type: "error",
              reload: false,
            });
        })
        .catch((error) => {
          console.error(error.response);
          let message = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: message[Object.keys(message)[0]],
            type: "error",
            reload: false,
          });
        });
    // Traigo roles
    open &&
      axiosInstance
        .get(`/people/${personId}`)
        .then((response) => {
          if (response.status == 200) setRoles(response.data.person.roles);
          else
            setNotify({
              isOpen: true,
              message: `Error inesperado en fetch de roles de ${personName}`,
              type: "error",
              reload: false,
            });
        })
        .catch((error) => {
          console.error(error.response);
          if (error.response.status == 404) {
            let message = error.response.data.error;
            setNotify({
              isOpen: true,
              message: message,
              type: "error",
              reload: false,
            });
          } else {
            let message = error.response.data.errors;
            setNotify({
              isOpen: true,
              message: message[Object.keys(message)[0]],
              type: "error",
              reload: false,
            });
          }
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
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: "Asignacion creada con exito.",
            type: "success",
            reload: false,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado.`,
            type: "error",
            reload: false,
          });
        onClose();
        setRequestBdoy(initialState);
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status == 404) {
          setNotify({
            isOpen: true,
            message: error.response.data.error,
            type: "error",
            reload: true,
          });
          onClose();
          setRequestBdoy(initialState);
        } else {
          let message = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: message[Object.keys(message)[0]],
            type: "error",
            reload: false,
          });
        }
      });
  };

  const onInputChange = (e) => {
    e.target.name == "project" &&
      setRequestBdoy({ ...requestBody, project_id: e.target.value });
    e.target.name == "rol" &&
      setRequestBdoy({ ...requestBody, role: e.target.value });
    e.target.id == "fechaInicio" &&
      setRequestBdoy({ ...requestBody, start_date: e.target.value });
    e.target.id == "fechaFin" &&
      setRequestBdoy({ ...requestBody, end_date: e.target.value });
    e.target.name == "working_hours_type" &&
      setRequestBdoy({ ...requestBody, working_hours_type: e.target.value });
    e.target.id == "horas" &&
      setRequestBdoy({ ...requestBody, working_hours: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setRequestBdoy(initialState);
  };

  return (
    <Fragment>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"xs"}>
        <AsignacionForm
          proyectos={proyectos}
          roles={roles}
          datos={requestBody}
          personName={personName}
          onClose={handleClose}
          onSubmit={onSubmit}
          onInputChange={onInputChange}
        />
      </Dialog>
      <Notificacion notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}

export default AsignarProyectoPersona;
