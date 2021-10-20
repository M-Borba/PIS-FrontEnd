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
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response != undefined &&
          error.response.status != null &&
          error.response.status == 404
        )
          setNotify({
            isOpen: true,
            message: `Error, el proyecto ${projectName} ya fue eliminado.`,
            type: "error",
            reload: true,
          });
        else {
          let errors = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: `Error inesperado al enviar formulario - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}.`,
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
