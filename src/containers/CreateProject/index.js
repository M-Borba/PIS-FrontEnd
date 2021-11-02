import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";

CreateProject.propTypes = {
  setNotify: propTypes.func.isRequired,
};

export default function CreateProject({ setNotify }) {
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
      .then(() => {
        setNotify({
          isOpen: true,
          message: `El proyecto se creo con exito.`,
          type: "success",
          reload: true,
        });
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
