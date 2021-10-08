import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

InfoPopUp.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

function InfoPopUp({ title, content, onConfirm }) {
  const Classes = useStyles();

  const handleOk = () => {
    onConfirm();
  };

  return (
    <Fragment>
      <DialogTitle id="confirmation-dialog-title" className={Classes.title}>{title}
      </DialogTitle>
      <DialogContent className={Classes.content}>{content}</DialogContent>
      <DialogActions className={Classes.actions}>
        <Button onClick={handleOk} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Fragment>
  );
}

export default InfoPopUp;
