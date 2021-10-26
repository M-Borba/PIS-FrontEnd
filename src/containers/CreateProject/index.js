import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";
import TechnologyHandler from "../ProyectTechnologyHandler";

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
    project_type: "-",
    project_state: "-",
    organization: "",
    technologies: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

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
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado.`,
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
    else if (e.target.id == "organization")
      setProject({ ...project, organization: e.target.value });
  };

  return (
    <div style={{ display: "flex" }}>
      <ProyectoForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={checkInput}
        proyecto={project}
        title={"Creacion de proyecto"}
      />
      <TechnologyHandler
        techSelected={project.technologies}
        setTechSelected={(techs) =>
          setProject({ ...project, technologies: techs })
        }
      />
    </div>
  );
}
