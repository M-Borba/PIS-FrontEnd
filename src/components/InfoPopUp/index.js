import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { Grid } from "@mui/material";

InfoPopUp.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  needConfirm: PropTypes.bool.isRequired,
};

function InfoPopUp({ title, content, onConfirm, onClose, needConfirm }) {
  const Classes = useStyles();

  return (
    <Fragment>
      <DialogTitle
        id="confirmation-dialog-title"
        className={Classes.dialogTitle}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Grid item={true} style={{ marginTop: 7 }}>
            {title}
          </Grid>
          <Grid item={true}>
            <IconButton aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={Classes.content}>{content}</DialogContent>
      <DialogActions className={Classes.actions}>
        {needConfirm ? (
          <Fragment>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={onConfirm} color="primary">
              Confirmar
            </Button>
          </Fragment>
        ) : (
          <Button onClick={onConfirm} color="primary">
            Aceptar
          </Button>
        )}
      </DialogActions>
    </Fragment>
  );
}

export default InfoPopUp;
