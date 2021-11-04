import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";

CreateProject.propTypes = {
  setNotify: propTypes.func.isRequired,
  addRow: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

export default function CreateProject({ setNotify, addRow, onClose }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
    budget: "",
    start_date: "",
    end_date: "",
    project_type: "",
    project_state: "",
    organization: "",
    technologies: [],
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/projects", {
        project: project,
      })
      .then((response) => {
        let projectData = response.data.project;
        let newRow = {
          id: projectData.id,
          name: projectData.name,
          project_type: projectData.project_type
            .replaceAll("_", " ")
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          project_state: projectData.project_state.replace(/^\w/, (m) =>
            m.toUpperCase()
          ),
          description: projectData.description,
          budget: projectData.budget,
          start_date: projectData.start_date.replaceAll("-", "/"),
          end_date:
            projectData.end_date != null
              ? projectData.end_date.replaceAll("-", "/")
              : null,
          people: projectData.people,
          organization: projectData.organization,
          technologies: projectData.technologies || [],
        };
        addRow(newRow);
        setNotify({
          isOpen: true,
          message: `El proyecto se creo con exito.`,
          type: "success",
          reload: false,
        });
        onClose();
      })
      .catch((error) => {
        setErrors(error.response.data?.errors);
      });
  };

  return (
    <ProyectoForm
      onSubmit={(e) => handleSubmit(e)}
      setProject={setProject}
      project={project}
      title={"Creacion de proyecto"}
      errors={errors}
      setErrors={setErrors}
    />
  );
}
