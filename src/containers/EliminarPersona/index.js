import React, { Fragment, useRef, useState } from "react";
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
  const dialogContent = `Esta seguro que desea eliminar a ${personName} del sistema?`;
  const [openPopUp, setOpenPopUp] = useState(false);
  const titlePopUp = useRef("");
  const contentPopUp = useRef("");

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    window.location.reload();
  };

  const onConfirmation = () => {
    axiosInstance
      .delete(`/people/${personId}`)
      .then((response) => {
        if (response.status == 200) {
          titlePopUp.current = "Persona eliminada";
          contentPopUp.current = "La persona fue eliminada con exito.";
          setOpenPopUp(true);
        }
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response != undefined &&
          error.response.status != null &&
          error.response.status == 404
        ) {
          titlePopUp.current = "Error al eliminar persona";
          contentPopUp.current =
            "La persona que intenta eliminar ya fue eliminada.";
          setOpenPopUp(true);
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
      <Dialog
        open={openPopUp}
        onClose={handleClosePopUp}
        maxWidth="xs"
        aria-labelledby="error-dialog-title"
      >
        <InfoPopUp
          title={titlePopUp.current}
          content={contentPopUp.current}
          onConfirm={handleClosePopUp}
          onClose={handleClosePopUp}
        />
      </Dialog>
    </Fragment>
  );
}

export default EliminarPersona;
