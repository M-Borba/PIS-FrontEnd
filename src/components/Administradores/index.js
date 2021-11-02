import * as React from "react";
import PropTypes from "prop-types";
import {
  FormControlLabel,
  IconButton,
  Box,
  Modal,
  Button,
  Dialog,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useStyles } from "./styles";
import CreateAdministrator from "../../containers/CreateAdministrator";
import Notificacion from "../../components/Notificacion";
import EliminarAdministrador from "../../containers/EliminarAdministrador";

Administrador.propTypes = {
  rows: PropTypes.array,
};

const Acciones = ({ adminRow }) => {
  const [openRemove, setOpenRemove] = React.useState(false);

  const classes = useStyles();
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [adminData] = React.useState({
    id: adminRow.id,
    email: adminRow.email,
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

const columns = [
  {
    field: "id",
    headerName: "Email",
    hide: true,
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "fullName",
    headerName: "Nombre completo",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    flex: 1,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 0.3,
    renderCell: (params) => {
      return (
        <div>
          <Acciones adminRow={params.row} />
        </div>
      );
    },
  },
];

Acciones.propTypes = {
  adminRow: PropTypes.any,
};

export default function Administrador({ rows }) {
  const classes = useStyles();
  const [openNew, setOpenNew] = React.useState(false);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "dsc",
    },
  ]);

  const handleNewOpen = () => setOpenNew(true);
  const handleNewClose = () => setOpenNew(false);

  return (
    <div
      style={{
        margin: "1vw",
      }}
    >
      <Box m={1} mb={1} className={`${classes.rightBox} ${classes.box}`}>
        <Button color="primary" variant="contained" onClick={handleNewOpen}>
          Agregar Administrador
        </Button>
      </Box>
      <Modal
        open={openNew}
        onClose={handleNewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <IconButton
            aria-label="Close"
            onClick={handleNewClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <CreateAdministrator setNotify={setNotify} />
        </Box>
      </Modal>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        style={{ height: "70vh" }}
      />

      <Notificacion notify={notify} setNotify={setNotify} />
    </div>
  );
}
