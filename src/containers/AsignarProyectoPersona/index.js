import React, { Fragment, useEffect, useState } from "react";
import AsignacionForm from "../../components/AsignacionDialog";
import { axiosInstance } from "../../config/axios";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Notificacion from "../../components/Notificacion";

AsignarProyectoPersona.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  personName: PropTypes.string.isRequired,
};

function AsignarProyectoPersona({ open, onClose, personId, personName }) {
  const [proyectos, setProyectos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [requestBody, setRequestBdoy] = useState({
    project_id: "",
    role: "",
    working_hours: 0,
    working_hours_type: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    // Traigo proyectos
    open &&
      axiosInstance
        .get("/projects")
        .then((response) => {
          if (response.status == 200) setProyectos(response.data.projects);
        })
        .catch((error) => {
          console.log(error);
          let errors = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: `Error ${
              Object.keys(errors)[0]
            }, Error en fetch de proyectos - ${errors[Object.keys(errors)[0]]}`,
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
        })
        .catch((error) => {
          console.log(error);
          let errors = error.response.data.errors;
          if (error.response.status == 404) {
            setNotify({
              isOpen: true,
              message: `Error, la persona ${personName} no existe`,
              type: "error",
              reload: false,
            });
            onClose();
          } else
            setNotify({
              isOpen: true,
              message: `Error ${
                Object.keys(errors)[0]
              }, Error en fetch de roles de la persona - ${
                errors[Object.keys(errors)[0]]
              }`,
              type: "error",
              reload: false,
            });
        });
  }, [open]);

  const onSubmit = () => {
    // API call
    axiosInstance
      .post(`/people/${personId}/person_project`, {
        person_project: requestBody,
      })
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: "Asignacion creada con exito.",
            type: "success",
            reload: true,
          });
      })
      .catch((error) => {
        let errors = error.response.data.errors;
        if (error.response.status == 404)
          setNotify({
            isOpen: true,
            message: "Error al asignar, la persona o el proyecto no existen.",
            type: "error",
            reload: false,
          });
        else if (error.response.status == 400)
          setNotify({
            isOpen: true,
            message: `Error ${
              Object.keys(errors)[0]
            }, Error en los datos ingresados - ${
              errors[Object.keys(errors)[0]]
            }`,
            type: "error",
            reload: false,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado`,
            type: "error",
            reload: false,
          });
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

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose}>
        <AsignacionForm
          proyectos={proyectos}
          roles={roles}
          datos={requestBody}
          personName={personName}
          onClose={onClose}
          onSubmit={onSubmit}
          onInputChange={onInputChange}
        />
      </Dialog>
      <Notificacion notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}

export default AsignarProyectoPersona;
