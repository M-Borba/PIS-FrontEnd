import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
};

function EliminarPersona({ personName, personId, handleClose }) {
  const onConfirmation = () => {
    axiosInstance
      .delete(`/people/${personId}`)
      .then((response) => {
        console.log(`Exito: ${response.status}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dialogContent = `Esta seguro que desea eliminar a ${personName} del sistema?`;

  return (
    <DeleteDialogContent
      dialogContent={dialogContent}
      onClose={handleClose}
      onConfirmation={onConfirmation}
    />
  );
}

export default EliminarPersona;
