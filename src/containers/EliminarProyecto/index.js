import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

EliminarProyecto.propTypes = {
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  resultOk: PropTypes.func.isRequired,
};

function EliminarProyecto({ projectId, projectName, resultOk }) {
  const [openError, setOpenError] = useState(false);

  const handleCloseError = () => {
    setOpenError(false);
    window.location.reload();
  };

  const onConfirmation = () => {
    axiosInstance
      .delete(`/projects/${projectId}`)
      .then((response) => {
        if (response.status == 200) {
          resultOk();
          console.log(`Exito: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response != undefined &&
          error.response.status != null &&
          error.response.status == 404
        )
          setOpenError(true);
      });
  };

  const dialogContent = `Esta seguro que desea eliminar el proyecto ${projectName} del sistema?`;

  return (
    <Fragment>
      <DeleteDialogContent
        dialogContent={dialogContent}
        onConfirmation={onConfirmation}
      />
      <Dialog
        open={openError}
        onClose={handleCloseError}
        maxWidth="xs"
        aria-labelledby="error-dialog-title"
      >
        <InfoPopUp
          title={"Error al eliminar proyecto"}
          content={"El proyecto que intenta eliminar ya fue eliminado."}
          onConfirm={handleCloseError}
        />
      </Dialog>
    </Fragment>
  );
}

export default EliminarProyecto;
