import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";
import CustomButton from "../CustomButton";

DeleteDialogContent.propTypes = {
  dialogContent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func.isRequired,
};

function DeleteDialogContent({ dialogContent, onClose, onConfirmation }) {
  const Classes = useStyles();

  return (
    <Fragment>
      <DialogTitle id="confirmation-dialog-title" className={Classes.title}>
        Confirmar eliminación
        <IconButton
          aria-label="Close"
          className={Classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={Classes.content}>
        <Box className={Classes.textClass}>{dialogContent}</Box>
      </DialogContent>
      <DialogActions
        className={Classes.actions}
        style={{ justifyContent: "space-between" }}
      >
        <CustomButton onClick={onClose} variant="contained">
          Cancelar
        </CustomButton>
        <CustomButton redButton onClick={onConfirmation} variant="contained">
          Desasignar
        </CustomButton>
      </DialogActions>
    </Fragment>
  );
}

export default DeleteDialogContent;
