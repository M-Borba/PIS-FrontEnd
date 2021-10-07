import React, { Component, useEffect, useState } from "react";
import propTypes from "prop-types";
import InfoProyectoDialog from "../../components/InfoProyectoDialog";

InfoProyectoTimeline.propTypes = {
  projectId: propTypes.number.isRequired,
  personId: propTypes.number.isRequired,
  onClose: propTypes.func.isRequired,
};

function InfoProyectoTimeline({ projectId, personId, onClose }) {
  const [projectInfo, setProjectInfo] = useState({
    id: projectId,
    name: "Nombre del proyecto",
    project_type: "Tipo del proyecto",
    project_state: "Estado del proyecto",
    description: "Descripcion del proyecto",
    budget: 5000,
    start_date: "10/10/2021",
    end_date: "01/02/2022",
  });

  useEffect(async () => {
    try {
      // API call
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = () => {
    // API call
    console.log("Elimancion de la asignacion");
  };

  return (
    <InfoProyectoDialog
      projectInfo={projectInfo}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

export default InfoProyectoTimeline;
