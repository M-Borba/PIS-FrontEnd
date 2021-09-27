import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarProyecto.propTypes = {
  proyectName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function EliminarProyecto({ proyectName, handleClose }) {
  const onConfirmation = () => {
    // Cuando este el endpoint lo agrego
  };

  const dialogContent = `Esta seguro que desea eliminar el proyecto ${proyectName} del sistema?`;

  return (
    <DeleteDialogContent
      dialogContent={dialogContent}
      onClose={handleClose}
      onConfirmation={onConfirmation}
    />
  );
}

export default EliminarProyecto;
