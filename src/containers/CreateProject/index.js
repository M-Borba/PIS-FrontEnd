import React, { useState } from "react";
import PropTypes from "prop-types";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";

CreateProject.propTypes = {
  resultOk: PropTypes.func,
};
//TODO Revisar error en select de project_type y project_state
//TODO Error: Unstable_TrapFocus.js:214 Uncaught RangeError: Maximum call stack size exceeded
export default function CreateProject({ resultOk }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
    budget: 0,
    start_date: "",
    end_date: "",
    project_type: "-",
    project_state: "-",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const isValid = () => {
    return (
      project.name != "" &&
      project.project_type != "" &&
      project.project_state != "" &&
      project.start_date != ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");

    console.log(project);
    if (!isValid(project)) {
      setError("Completar todos los campos para crear el proyecto");
    } else {
      axiosInstance
        .post("/projects", {
          project: project,
        })
        .then((response) => {
          if (response.status == 200) {
            resultOk();
            setMsg("Proyecto creado correctamente");
            setError("");
          } else setError("Error inesperado");
        })
        .catch((error) => {
          console.log("error", error.response);
          if (
            error.response != undefined &&
            error.response.status != null &&
            error.response.status == 401
          )
            setError("Falta autentificarse !");
          else if (error.response.status == 400) {
            let errors = error.response.data.errors;
            setError(
              "Error, hay un problema con los datos ingresados - " +
                Object.keys(errors)[0] +
                " " +
                errors[Object.keys(errors)[0]]
            );
          } else
            setError(
              "Error inesperado al enviar formulario - " +
                Object.keys(errors)[0] +
                " " +
                errors[Object.keys(errors)[0]]
            );
        });
    }
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
        onInputChange={checkInput}
        proyecto={project}
        error={error}
        msg={msg}
        title={"Creacion de proyecto"}
      />
    </div>
  );
}
