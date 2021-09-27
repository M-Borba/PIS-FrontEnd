import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

DeleteDialogContent.propTypes = {
  dialogContent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func.isRequired,
};

function DeleteDialogContent({ dialogContent, onClose, onConfirmation }) {
  const Classes = useStyles();

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onConfirmation();
    onClose();
  };

  return (
    <Fragment>
      <DialogTitle id="confirmation-dialog-title" className={Classes.title}>
        Confirmar eliminacion
        <IconButton
          aria-label="Close"
          className={Classes.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={Classes.content}>{dialogContent}</DialogContent>
      <DialogActions className={Classes.actions}>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOk} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Fragment>
  );
}

export default DeleteDialogContent;
