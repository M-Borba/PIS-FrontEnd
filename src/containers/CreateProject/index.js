import React, { useState, useRef } from "react";
import { axiosInstance } from "../../config/axios";
import ProyectoForm from "../../components/ProyectoForm";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

//TODO Revisar error en select de project_type y project_state
//TODO Error: Unstable_TrapFocus.js:214 Uncaught RangeError: Maximum call stack size exceeded
export default function CreateProject() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    budget: 0,
    start_date: "",
    end_date: "",
    project_type: "",
    project_state: "",
  });
  const [openPopUp, setOpenPopUp] = useState(false);
  const titlePopUp = useRef("");
  const contentPopUp = useRef("");

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(project);
    axiosInstance
      .post("/projects", {
        project: project,
      })
      .then((response) => {
        if (response.status == 200) {
          titlePopUp.current = "Proyecto creado";
          contentPopUp.current = "El proyecto se creo con exito.";
          setOpenPopUp(true);
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        titlePopUp.current = "Error";
        let errors = error.response.data.errors;
        if (error.response.status == 400)
          contentPopUp.current =
            "Error, hay un problema con los datos ingresados - " +
            Object.keys(errors)[0] +
            " " +
            errors[Object.keys(errors)[0]];
        else
          contentPopUp.current =
            "Error inesperado al enviar formulario - " +
            Object.keys(errors)[0] +
            " " +
            errors[Object.keys(errors)[0]];
        setOpenPopUp(true);
      });
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
        onInputChange={(e) => checkInput(e)}
        proyecto={project}
        title={"Alta de proyecto"}
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
