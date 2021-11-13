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
        editRow(response.data.project);
        setNotify({
          isOpen: true,
          message: `El proyecto ${projectData.name} se modificó con éxito.`,
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
