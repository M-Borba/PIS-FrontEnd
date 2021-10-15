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
};

export default function EditarProjecto({ projectData, id }) {
  projectData.start_date = projectData.start_date.replaceAll("/", "-");
  if (projectData.end_date != null)
    projectData.end_date = projectData.end_date.replaceAll("/", "-");
  const [proyecto, setProyecto] = useState(projectData);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const isValid = () => {
    return (
      //descripcion, budget y end date son opcionales y no se validan
      proyecto.name != "" &&
      proyecto.project_type != "" && //to do cambiar esto, verificar que es uno de los enumerados
      proyecto.project_state != "" && //to do cambiar esto, verificar que es uno de los enumerados
      proyecto.start_date != ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid(proyecto)) {
      setError("Completar todos los campos para completar la modificación");
    } else {
      axiosInstance
        .put("/projects/" + id, {
          project: proyecto,
        })
        .then((response) => {
          if (response.status == 200) {
            setMsg("Proyecto modificado correctamente");
            setError("");
          } else setError("Error inesperado");
        })
        .catch((error) => {
          console.log(error.response);
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
          } else setError("Error inesperado al enviar formulario ");
        });
    }
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
        error={error}
        msg={msg}
        title={"Editando Proyecto"}
      />
    </div>
  );
}
