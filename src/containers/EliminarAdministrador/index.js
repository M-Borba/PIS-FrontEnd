import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarAdministrador.propTypes = {
  administratorEmail: PropTypes.string.isRequired,
  administratorName: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  administratorId: PropTypes.number.isRequired,
  setNotify: PropTypes.func.isRequired,
};

function EliminarAdministrador({
  administratorEmail,
  administratorName,
  administratorId,
  handleClose,
  setNotify,
}) {
  const dialogContent = `Esta seguro que desea eliminar al administrator con email: \"${administratorEmail}\" del sistema?`;

  const onConfirmation = () => {
    axiosInstance
      .delete(`/users/${administratorId}`)
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `El administrador con email: \"${administratorEmail}\" se elimino con exito.`,
            type: "success",
            reload: true,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado.`,
            type: "error",
            reload: false,
          });
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

export default EliminarAdministrador;
