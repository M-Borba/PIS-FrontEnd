import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";
import CustomButton from "../CustomButton";
import { BUTTON_LABELS, PERSON_LABELS } from "../../config/globalVariables";

DeleteDialogContent.propTypes = {
  dialogContent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func.isRequired,
  deleteButtonText: PropTypes.string.isRequired,
};

function DeleteDialogContent({
  dialogContent,
  onClose,
  onConfirmation,
  deleteButtonText,
}) {
  const Classes = useStyles();

  return (
    <Fragment>
      <DialogTitle id="confirmation-dialog-title" className={Classes.title}>
        {PERSON_LABELS.CONFIRMAR_ELIMINACION}
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
          {BUTTON_LABELS.CANCEL}
        </CustomButton>
        <CustomButton redButton onClick={onConfirmation} variant="contained">
          {deleteButtonText}
        </CustomButton>
      </DialogActions>
    </Fragment>
  );
}

export default DeleteDialogContent;
