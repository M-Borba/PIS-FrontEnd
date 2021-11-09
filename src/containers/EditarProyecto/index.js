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
    people: propTypes.array,
    organization: propTypes.string,
    technologies: propTypes.array,
  }).isRequired,
  id: propTypes.number,
  setNotify: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
  editRow: propTypes.func.isRequired,
};

export default function EditarProjecto({
  projectData,
  id,
  setNotify,
  onClose,
  editRow,
}) {
  const [errors, setErrors] = useState({});
  const [project, setProject] = useState(projectData);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/projects/${id}`, {
        project,
      })
      .then((response) => {
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
        onClose();
      })
      .catch((error) => {
        setErrors(error.response.data?.errors);
      });
  };

  return (
    <ProyectoForm
      onSubmit={handleSubmit}
      project={project}
      setProject={setProject}
      title={"Modificación de Proyecto"}
      errors={errors}
      setErrors={setErrors}
    />
  );
}
