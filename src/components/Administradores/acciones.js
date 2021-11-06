import * as React from "react";
import {
  FormControlLabel,
  IconButton,
  Dialog,
} from "@material-ui/core";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import Notificacion from "../../components/Notificacion";
import EliminarAdministrador from "../../containers/EliminarAdministrador";

Acciones.propTypes = {
  adminRow: PropTypes.any,
};

export default function Acciones({ adminRow }) {
  const [openRemove, setOpenRemove] = React.useState(false);

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  return (
    <div
      style={{
        margin: "10px",
      }}
    >
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleRemoveOpen}>
              <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Dialog
              open={openRemove}
              onClose={handleRemoveClose}
              maxWidth="xs"
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarAdministrador
                administratorId={adminRow.id}
                administratorName={adminRow.name}
                administratorEmail={adminRow.email}
                handleClose={handleRemoveClose}
                setNotify={setNotify}
              />
            </Dialog>
          </>
        }
      />
      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
};