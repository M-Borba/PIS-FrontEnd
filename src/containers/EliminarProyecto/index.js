import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarProyecto.propTypes = {
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
};

function EliminarProyecto({ projectId, projectName, handleClose, setNotify }) {
  const dialogContent = `Esta seguro que desea eliminar el proyecto ${projectName} del sistema?`;

  const onConfirmation = () => {
    axiosInstance
      .delete(`/projects/${projectId}`)
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `El proyecto ${projectName} se elimino con exito.`,
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
        console.error(error);
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
    <Fragment>
      <DeleteDialogContent
        dialogContent={dialogContent}
        onClose={handleClose}
        onConfirmation={onConfirmation}
      />
    </Fragment>
  );
}

export default EliminarProyecto;
