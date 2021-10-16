import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";

//TODO Revisar error en select de project_type y project_state
//TODO Error: Unstable_TrapFocus.js:214 Uncaught RangeError: Maximum call stack size exceeded

CreateProject.propTypes = {
  setNotify: propTypes.func.isRequired,
};

export default function CreateProject({ setNotify }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
    budget: 0,
    start_date: "",
    end_date: "",
    project_type: "",
    project_state: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(project);
    axiosInstance
      .post("/projects", {
        project: project,
      })
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `El proyecto se creo con exito.`,
            type: "success",
            reload: true,
          });
      })
      .catch((error) => {
        console.log("error", error.response);
        let errors = error.response.data.errors;
        if (error.response.status == 400)
          setNotify({
            isOpen: true,
            message: `Error, hay un problema con los datos ingresados - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}`,
            type: "error",
            reload: false,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado al enviar formulario - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}`,
            type: "error",
            reload: false,
          });
      });
  };

  const checkInput = (e) => {
    if (e.target.id == "name") setProject({ ...project, name: e.target.value });
    else if (e.target.name == "project_type")
      setProject({ ...project, project_type: e.target.value });
    else if (e.target.name == "project_state")
      setProject({ ...project, project_state: e.target.value });
    else if (e.target.id == "description")
      setProject({ ...project, description: e.target.value });
    else if (e.target.id == "budget") {
      let valorBudget = parseInt(e.target.value);
      setProject({ ...project, budget: valorBudget });
    } else if (e.target.id == "start_date")
      setProject({ ...project, start_date: e.target.value });
    else if (e.target.id == "end_date")
      setProject({ ...project, end_date: e.target.value });
  };

  return (
    <div>
      <ProyectoForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        proyecto={project}
        title={"Alta de proyecto"}
      />
    </div>
  );
}
