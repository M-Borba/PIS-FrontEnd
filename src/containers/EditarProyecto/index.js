/**
 * Create person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";

EditarProjecto.propTypes = {
  projectData: propTypes.shape({
    name: propTypes.string,
    project_type: propTypes.string,
    project_state: propTypes.string,
    description: propTypes.string,
    budget: propTypes.number,
    start_date: propTypes.string,
    end_date: propTypes.string,
  }).isRequired,
  id: propTypes.number,
  setNotify: propTypes.func.isRequired,
};

export default function EditarProjecto({ projectData, id, setNotify }) {
  projectData.start_date = projectData.start_date.replaceAll("/", "-");
  if (projectData.end_date != null)
    projectData.end_date = projectData.end_date.replaceAll("/", "-");
  const [proyecto, setProyecto] = useState(projectData);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put("/projects/" + id, {
        project: proyecto,
      })
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `El proyecto ${projectData.name} se modifico con exito.`,
            type: "success",
            reload: true,
          });
      })
      .catch((error) => {
        console.log(error.response);
        let errors = error.response.data.errors;
        if (error.response.status == 400)
          setNotify({
            isOpen: true,
            message: `Error, hay un problema con los datos ingresados - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}.`,
            type: "error",
            reload: false,
          });
        else if (error.response.status == 404)
          setNotify({
            isOpen: true,
            message: `Error, el proyecto ${projectData.name} ya fue eliminado.`,
            type: "error",
            reload: true,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado al enviar formulario - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}.`,
            type: "error",
            reload: false,
          });
      });
  };

  const checkInput = (e) => {
    if (e.target.id == "name")
      setProyecto({ ...proyecto, name: e.target.value });
    else if (e.target.name == "project_type")
      setProyecto({ ...proyecto, project_type: e.target.value });
    else if (e.target.name == "project_state")
      setProyecto({ ...proyecto, project_state: e.target.value });
    else if (e.target.id == "description")
      setProyecto({ ...proyecto, description: e.target.value });
    else if (e.target.id == "budget") {
      let valorBudget = parseInt(e.target.value);
      setProyecto({ ...proyecto, budget: valorBudget });
    } else if (e.target.id == "start_date")
      setProyecto({ ...proyecto, start_date: e.target.value });
    else if (e.target.id == "end_date")
      setProyecto({ ...proyecto, end_date: e.target.value });
  };

  return (
    <div>
      <ProyectoForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        proyecto={proyecto}
        title={"Modificacion de Proyecto"}
      />
    </div>
  );
}
