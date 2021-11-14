import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";
import { useSnackbar } from "notistack";

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
  onClose: propTypes.func.isRequired,
  editRow: propTypes.func.isRequired,
};

export default function EditarProjecto({ projectData, id, onClose, editRow }) {
  const { enqueueSnackbar } = useSnackbar();
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
        enqueueSnackbar(
          `El proyecto ${projectData.name} se modifico con exito`,
          { variant: "success" }
        );
        onClose();
      })
      .catch((error) => {
        console.error(error.response);
        error.response.status == 400
          ? setErrors(error.response.data?.errors)
          : enqueueSnackbar(error.response.data.error, {
              variant: "error",
              persist: true,
            });
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
