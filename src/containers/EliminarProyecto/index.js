import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarProyecto.propTypes = {
  projectName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
};

function EliminarProyecto({ projectId, projectName, handleClose }) {
  const onConfirmation = () => {
    axiosInstance
      .delete(`/projects/${projectId}`)
      .then((response) => {
        console.log(`Exito: ${response.status}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dialogContent = `Esta seguro que desea eliminar el proyecto ${projectName} del sistema?`;

  return (
    <DeleteDialogContent
      dialogContent={dialogContent}
      onClose={handleClose}
      onConfirmation={onConfirmation}
    />
  );
}

export default EliminarProyecto;
