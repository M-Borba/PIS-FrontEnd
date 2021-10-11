import React, { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

EliminarProyecto.propTypes = {
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function EliminarProyecto({ projectId, projectName, handleClose }) {
  const dialogContent = `Esta seguro que desea eliminar el proyecto ${projectName} del sistema?`;
  const [openPopUp, setOpenPopUp] = useState(false);
  const titlePopUp = useRef("");
  const contentPopUp = useRef("");

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    window.location.reload();
  };

  const onConfirmation = () => {
    axiosInstance
      .delete(`/projects/${projectId}`)
      .then((response) => {
        if (response.status == 200) {
          titlePopUp.current = "Proyecto eliminado";
          contentPopUp.current = "El proyecto fue eliminado con exito.";
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
          titlePopUp.current = "Error al eliminar proyecto";
          contentPopUp.current =
            "El proyecto que intenta eliminar ya fue eliminado.";
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

export default EliminarProyecto;
