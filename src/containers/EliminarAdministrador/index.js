import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";
import { useSnackbar } from "notistack";

EliminarAdministrador.propTypes = {
  administratorEmail: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  administratorId: PropTypes.number.isRequired,
  removeRow: PropTypes.func.isRequired,
};

function EliminarAdministrador({
  administratorEmail,
  administratorId,
  handleClose,
  removeRow,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const dialogContent = `¿Está seguro que desea eliminar al administrator con email: \"${administratorEmail}\" del sistema?`;

  const onConfirmation = () => {
    axiosInstance
      .delete(`/users/${administratorId}`)
      .then((response) => {
        removeRow(administratorId);
        enqueueSnackbar(response.data.message, { variant: "success" });
      })
      .catch((error) => {
        console.error(error.response);
        enqueueSnackbar(
          error.response.data.error ?? error.response.data.message,
          { variant: "error" }
        );
      });
    handleClose();
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
