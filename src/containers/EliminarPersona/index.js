import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";
import { useSnackbar } from "notistack";

EliminarPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
  removeRow: PropTypes.func.isRequired,
};

function EliminarPersona({ personName, personId, handleClose, removeRow }) {
  const dialogContent = `Esta seguro que desea eliminar a ${personName} del sistema?`;
  const { enqueueSnackbar } = useSnackbar();

  const onConfirmation = () => {
    axiosInstance
      .delete(`/people/${personId}`)
      .then(() => {
        removeRow(personId);
        enqueueSnackbar(
          `Se elimino a ${personName} exitosamente del sistema.`,
          { variant: "success" }
        );
        handleClose();
      })
      .catch((error) => {
        console.error(error.response);
        enqueueSnackbar(error.response.data?.error, { variant: "error" });
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
