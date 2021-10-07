import React, { Component, useEffect, useState } from "react";
import AsignacionForm from "../../components/AsignacionDialog";
import { axiosInstance } from "../../config/axios";
import PropTypes from "prop-types";

AsignarProyectoPersona.propTypes = {
  onClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  addProject: PropTypes.func.isRequired,
  personName: PropTypes.string.isRequired,
};

function AsignarProyectoPersona({ onClose, personId, addProject, personName }) {
  const [proyectos, setProyectos] = useState([]);
  const [requestBody, setRequestBdoy] = useState({
    projectId: "",
    rol: "",
    fechaInicio: "",
    fechaFin: "",
    horasSemanales: 0,
  });

  useEffect(async () => {
    try {
      const response = await axiosInstance.get("/projects");
      setProyectos(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = () => {
    // API call
    console.log(
      `API call: me llega proyectId: ${requestBody.projectId}, para el personid: ${personId}, rol: ${requestBody.rol}, fechaIncio: ${requestBody.fechaInicio} y fechaFin: ${requestBody.fechaFin}`
    );
    addProject(
      requestBody.projectId,
      requestBody.fechaInicio,
      requestBody.fechaFin
    );
  };

  const onInputChange = (e) => {
    e.target.name == "project" &&
      setRequestBdoy({ ...requestBody, projectId: e.target.value });
    e.target.id == "rol" &&
      setRequestBdoy({ ...requestBody, rol: e.target.value });
    e.target.id == "fechaInicio" &&
      setRequestBdoy({ ...requestBody, fechaInicio: e.target.value });
    e.target.id == "fechaFin" &&
      setRequestBdoy({ ...requestBody, fechaFin: e.target.value });
    e.target.id == "horasSemanales" &&
      setRequestBdoy({ ...requestBody, horasSemanales: e.target.value });
  };

  return (
    <AsignacionForm
      proyectos={proyectos}
      datos={requestBody}
      personName={personName}
      onClose={onClose}
      onSubmit={onSubmit}
      onInputChange={onInputChange}
    ></AsignacionForm>
  );
}

export default AsignarProyectoPersona;
