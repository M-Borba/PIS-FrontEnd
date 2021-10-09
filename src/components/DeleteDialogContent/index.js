import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

DeleteDialogContent.propTypes = {
  dialogContent: PropTypes.string.isRequired,
  onConfirmation: PropTypes.func.isRequired,
};

function DeleteDialogContent({ dialogContent, onConfirmation }) {
  const Classes = useStyles();

  const handleOk = () => {
    onConfirmation();
  };

  return (
    <Fragment>
      <DialogTitle id="confirmation-dialog-title" className={Classes.title}>
        Confirmar eliminacion
      </DialogTitle>
      <DialogContent className={Classes.content}>{dialogContent}</DialogContent>
      <DialogActions className={Classes.actions}>
        <Button onClick={handleOk} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Fragment>
  );
}

export default DeleteDialogContent;
