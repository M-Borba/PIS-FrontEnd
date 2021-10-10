import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

InfoPopUp.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function InfoPopUp({ title, content, onConfirm, onClose }) {
  const Classes = useStyles();

  return (
    <Fragment>
      <DialogTitle id="confirmation-dialog-title" className={Classes.title}>
        {title}
        <IconButton
          aria-label="Close"
          className={Classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={Classes.content}>{content}</DialogContent>
      <DialogActions className={Classes.actions}>
        <Button onClick={onConfirm} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Fragment>
  );
}

export default InfoPopUp;
