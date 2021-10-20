import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

EliminarPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  setNotify: PropTypes.func.isRequired,
};

function EliminarPersona({ personName, personId, handleClose, setNotify }) {
  const dialogContent = `Esta seguro que desea eliminar a ${personName} del sistema?`;

  const onConfirmation = () => {
    axiosInstance
      .delete(`/people/${personId}`)
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `La persona ${personName} se elimino con exito.`,
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
            message: `Error, la perosna ${personName} ya fue eliminada.`,
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

export default EliminarPersona;
