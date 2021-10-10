import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

EliminarPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  personId: PropTypes.number.isRequired,
};

function EliminarPersona({ personName, personId, handleClose }) {
  const [openError, setOpenError] = useState(false);

  const handleCloseError = () => {
    setOpenError(false);
    window.location.reload();
  };

  const onConfirmation = () => {
    axiosInstance
      .delete(`/people/${personId}`)
      .then((response) => {
        console.log(`Exito: ${response.status}`);
        window.location.reload();
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

  const dialogContent = `Esta seguro que desea eliminar a ${personName} del sistema?`;

  return (
    <Fragment>
      <DeleteDialogContent
        dialogContent={dialogContent}
        onClose={handleClose}
        onConfirmation={onConfirmation}
      />
      <Dialog
        open={openError}
        onClose={handleCloseError}
        maxWidth="xs"
        aria-labelledby="error-dialog-title"
      >
        <InfoPopUp
          title={"Error al eliminar persona"}
          content={"La persona que intenta eliminar ya fue eliminada."}
          onConfirm={handleCloseError}
        />
      </Dialog>
    </Fragment>
  );
}

export default EliminarPersona;
