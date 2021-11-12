import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@mui/system";

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
        <Button onClick={onClose} color="primary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={onConfirmation} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Fragment>
  );
}

export default DeleteDialogContent;
