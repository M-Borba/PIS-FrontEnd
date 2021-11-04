import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";
import ProyectTechnologyHandler from "../ProyectTechnologyHandler";

EditarProjecto.propTypes = {
  projectData: propTypes.shape({
    name: propTypes.string,
    project_type: propTypes.string,
    project_state: propTypes.string,
    description: propTypes.string,
    budget: propTypes.number,
    start_date: propTypes.string,
    end_date: propTypes.string,
    people: propTypes.array,
    organization: propTypes.string,
    technologies: propTypes.array,
  }).isRequired,
  id: propTypes.number,
  setNotify: propTypes.func.isRequired,
  // removePerson: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
  editRow: propTypes.func.isRequired,
};

export default function EditarProjecto({
  projectData,
  id,
  setNotify,
  // removePerson,
  onClose,
  editRow,
}) {
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
        if (response.status == 200) {
          let projectInfo = response.data.project;
          let project = {
            id: projectInfo.id,
            name: projectInfo.name,
            project_type: projectInfo.project_type
              .replaceAll("_", " ")
              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
            project_state: projectInfo.project_state.replace(/^\w/, (m) =>
              m.toUpperCase()
            ),
            description: projectInfo.description,
            budget: projectInfo.budget,
            start_date: projectInfo.start_date.replaceAll("-", "/"),
            end_date:
              projectInfo.end_date != null
                ? projectInfo.end_date.replaceAll("-", "/")
                : null,
            organization: projectInfo.organization,
            technologies: projectInfo.technologies || [],
          };
          editRow(project);
          setNotify({
            isOpen: true,
            message: `El proyecto ${projectData.name} se modifico con exito.`,
            type: "success",
            reload: false,
          });
        }
        onClose();
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status == 404) {
          let message = error.response.data.error;
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: true,
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
    else if (e.target.id == "organization")
      setProyecto({ ...proyecto, organization: e.target.value });
  };

  return (
    <div style={{ display: "flex" }}>
      <ProyectoForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        proyecto={proyecto}
        title={"Modificacion de Proyecto"}
        // removePerson={removePerson}
      />
      <ProyectTechnologyHandler
        techSelected={proyecto.technologies}
        setTechSelected={(techs) =>
          setProyecto({ ...proyecto, technologies: techs })
        }
      />
    </div>
  );
}
