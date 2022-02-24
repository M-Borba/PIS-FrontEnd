import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";
import { BUTTON_LABELS } from "../../config/globalVariables";

EliminarProyecto.propTypes = {
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
};

function EliminarProyecto({ projectId, projectName, handleClose, removeRow }) {
  const dialogContent = `¿Está seguro que desea eliminar el proyecto ${projectName} del sistema?`;
  const { enqueueSnackbar } = useSnackbar();

  const onConfirmation = () => {
    axiosInstance
      .delete(`/projects/${projectId}`)
      .then(() => {
        removeRow(projectId);
        enqueueSnackbar(`El proyecto ${projectName} se eliminó con éxito.`, {
          variant: "success",
          autoHideDuration: 4000,
        });
        handleClose();
      })
      .catch((error) => {
        console.error(error.response);
        enqueueSnackbar(error.response.data?.error, {
          variant: "error",
          autoHideDuration: 8000,
        });
      });
  };

  return (
    <Fragment>
      <DeleteDialogContent
        dialogContent={dialogContent}
        onClose={handleClose}
        onConfirmation={onConfirmation}
        deleteButtonText={BUTTON_LABELS.DELETE}
      />
    </Fragment>
  );
}

export default EliminarProyecto;
