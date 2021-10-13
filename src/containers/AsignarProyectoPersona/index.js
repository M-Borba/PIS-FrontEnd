import React, { Fragment, useEffect, useRef, useState } from "react";
import AsignacionForm from "../../components/AsignacionDialog";
import { axiosInstance } from "../../config/axios";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

AsignarProyectoPersona.propTypes = {
  onClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  personName: PropTypes.string.isRequired,
};

function AsignarProyectoPersona({ onClose, personId, personName }) {
  const [proyectos, setProyectos] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [requestBody, setRequestBdoy] = useState({
    projectId: "",
    rol: "",
    fechaInicio: "",
    fechaFin: "",
    tipoHoras: "",
    horas: 0,
  });
  const titlePopUp = useRef("");
  const contentPopUp = useRef("");

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    window.location.reload();
  };

  useEffect(() => {
    axiosInstance
      .get("/projects")
      .then((response) => {
        if (response.status == 200) setProyectos(response.data.projects);
      })
      .catch((error) => {
        console.log(error);
        let errors = error.response.data.errors;
        titlePopUp.current = `Error ${Object.keys(errors)[0]}`;
        contentPopUp.current = `Error en fetch de proyectos - ${
          errors[Object.keys(errors)[0]]
        }`;
        setOpenPopUp(true);
      });
  }, []);

  const onSubmit = () => {
    // API call
    console.log(requestBody);

    axiosInstance
      .post(`/people/${personId}/person_project`, {
        project_id: requestBody.projectId,
        rol: requestBody.rol,
        working_hours: requestBody.horas,
        working_hours_type: requestBody.tipoHoras,
        start_date: requestBody.fechaInicio.replace("-", "/"),
        end_date: requestBody.fechaFin.replace("-", "/"),
      })
      .then((response) => {
        console.log(response.data);
        titlePopUp.current = `Asignacion creada`;
        contentPopUp.current = `Se asigno el proyecto a la persona con exito.`;
        setOpenPopUp(true);
      })
      .catch((error) => {
        console.log(error.response);
        titlePopUp.current = `Error al asignar`;
        contentPopUp.current = `Error al asignar el proyecto a la persona.saasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss`;
        setOpenPopUp(true);
      });
  };

  const onInputChange = (e) => {
    e.target.name == "project" &&
      setRequestBdoy({ ...requestBody, projectId: e.target.value });
    e.target.name == "rol" &&
      setRequestBdoy({ ...requestBody, rol: e.target.value });
    e.target.id == "fechaInicio" &&
      setRequestBdoy({ ...requestBody, fechaInicio: e.target.value });
    e.target.id == "fechaFin" &&
      setRequestBdoy({ ...requestBody, fechaFin: e.target.value });
    e.target.name == "working_hours_type" &&
      setRequestBdoy({ ...requestBody, tipoHoras: e.target.value });
    e.target.id == "horas" &&
      setRequestBdoy({ ...requestBody, horas: e.target.value });
  };

  return (
    <Fragment>
      <AsignacionForm
        proyectos={proyectos}
        datos={requestBody}
        personName={personName}
        onClose={onClose}
        onSubmit={onSubmit}
        onInputChange={onInputChange}
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
          needConfirm={false}
        />
      </Dialog>
    </Fragment>
  );
}

export default AsignarProyectoPersona;
