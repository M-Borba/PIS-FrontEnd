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
    // Backend-API call
    console.log(`Me llega el id: ${personId}`);
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

  return (
    <DeleteDialogContent
      personName={personName}
      onClose={handleClose}
      onConfirmation={onConfirmation}
    />
  );
}

export default EliminarPersona;
