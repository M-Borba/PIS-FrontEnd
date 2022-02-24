import React, { useState } from "react";

import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";
import { useSnackbar } from "notistack";
import { PROJECT_LABELS } from "../../config/globalVariables";

EditarProjecto.propTypes = {
  projectData: propTypes.shape({
    name: propTypes.string,
    project_type: propTypes.string,
    project_state: propTypes.string,
    description: propTypes.string,
    budget: propTypes.number,
    start_date: propTypes.Moment,
    end_date: propTypes.Moment,
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
          `El proyecto ${projectData.name} se modificó con éxito.`,
          { variant: "success", autoHideDuration: 4000 }
        );
        onClose();
      })
      .catch((error) => {
        console.error(error.response);
        error.response.status === 400
          ? setErrors(error.response.data?.errors)
          : enqueueSnackbar(error.response.data.error, {
              variant: "error",
              autoHideDuration: 8000,
            });
      });
  };

  return (
    <ProyectoForm
      onSubmit={handleSubmit}
      project={project}
      setProject={setProject}
      title={PROJECT_LABELS.MODIFICACION_PROYECTO}
      errors={errors}
      setErrors={setErrors}
    />
  );
}
