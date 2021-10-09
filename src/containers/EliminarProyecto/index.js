import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarProyecto.propTypes = {
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  resultOk: PropTypes.func.isRequired,
};

function EliminarProyecto({ projectId, projectName, resultOk }) {
  const onConfirmation = () => {
    axiosInstance
      .delete(`/projects/${projectId}`)
      .then((response) => {
        if (response.status == 200) {
          resultOk();
          console.log(`Exito: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dialogContent = `Esta seguro que desea eliminar el proyecto ${projectName} del sistema?`;

  return (
    <DeleteDialogContent
      dialogContent={dialogContent}
      onConfirmation={onConfirmation}
    />
  );
}

export default EliminarProyecto;
