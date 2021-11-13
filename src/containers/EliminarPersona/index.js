import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  setNotify: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
};

function EliminarPersona({
  personName,
  personId,
  handleClose,
  setNotify,
  removeRow,
}) {
  const dialogContent = `¿Está seguro que desea eliminar a ${personName} del sistema?`;

  const onConfirmation = () => {
    axiosInstance
      .delete(`/people/${personId}`)
      .then(() => {
        removeRow(personId);
        setNotify({
          isOpen: true,
          message: `La persona ${personName} se eliminó con éxito.`,
          type: "success",
          reload: false,
        });
        handleClose();
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status == 404) {
          let message = error.response.data.error;
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: true,
          });
        } else {
          let message = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: message[Object.keys(message)[0]],
            type: "error",
            reload: false,
          });
        }
      });
  };

  return (
    <DeleteDialogContent
      dialogContent={dialogContent}
      onClose={handleClose}
      onConfirmation={onConfirmation}
    />
  );
}

export default EliminarPersona;
