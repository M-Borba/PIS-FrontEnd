import React from "react";
import { Alert, Snackbar } from "@mui/material";
import propTypes from "prop-types";
import { createPortal } from "react-dom";

Notificacion.propTypes = {
  notify: propTypes.object.isRequired,
  setNotify: propTypes.func.isRequired,
};

function Notificacion({ notify, setNotify }) {
  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
    notify.reload && window.location.reload();
  };

  return createPortal(
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>,
    document.getElementById("root")
  );
}

export default Notificacion;
