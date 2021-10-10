/**
 * Create person
 */

import React, { useState, useRef } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import propTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

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
  const [openPopUp, setOpenPopUp] = useState(false);
  const titlePopUp = useRef("");
  const contentPopUp = useRef("");

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    window.location.reload();
  };

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
          titlePopUp.current = "Proyecto modificado";
          contentPopUp.current = "El proyecto se modifico con exito.";
          setOpenPopUp(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
        titlePopUp.current = "Error al modificar proyecto";
        if (error.response.status == 400) {
          let errors = error.response.data.errors;
          contentPopUp.current =
            "Error, hay un problema con los datos ingresados - " +
            Object.keys(errors)[0] +
            " " +
            errors[Object.keys(errors)[0]];
        } else if (error.response.status == 404)
          contentPopUp.current =
            "El proyecto que intenta modificar ya fue eliminado.";
        else contentPopUp.current = "Error inesperado al enviar formulario.";
        setOpenPopUp(true);
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
  };

  return (
    <div>
      <ProyectoForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        proyecto={proyecto}
        title={"Modificacion de Proyecto"}
      />
      <Dialog
        open={openPopUp}
        onClose={handleClosePopUp}
        maxWidth="xs"
        aria-labelledby="error-dialog-title"
      >
        <InfoPopUp
          title={titlePopUp.current}
          content={contentPopUp.current}
          onConfirm={handleClosePopUp}
          onClose={handleClosePopUp}
        />
      </Dialog>
    </div>
  );
}
