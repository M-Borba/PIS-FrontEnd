import * as React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, IconButton, Box, Modal, Button, TextField, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useStyles } from "./styles";
import CreateAdministrator from "../../containers/CreateAdministrator";
import Notificacion from "../../components/Notificacion";

Administrador.propTypes = {
  rows: PropTypes.array,
};

const Acciones = ({ adminRow }) => {
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  const classes = useStyles();
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [adminData] = React.useState({
    id: adminRow.id,
    // name: adminRow.name,
    email: adminRow.email,
  });

  // const handleInfoClick = () => setOpenInfo(true);
  // const handleInfoClose = () => setOpenInfo(false);

  // const handleEditOpen = () => setOpenEdit(true);
  // const handleEditClose = () => setOpenEdit(false);

  const handleRemoveOpen = () => setOpenRemove(true);
  const handleRemoveClose = () => setOpenRemove(false);

  return (
      <div
          style={{
            margin: "10px",
          }}
      >
        {/*
        <FormControlLabel
            control={
              <>
                <IconButton variant="outlined" onClick={handleInfoClick}>
                  <VisibilityIcon style={{ color: "rgb(30, 30, 30)" }} />
                </IconButton>
                <Modal
                    open={openInfo}
                    onClose={handleInfoClose}
                    disableEnforceFocus
                >
                  <Box className={classes.modalInfo}>
                    <IconButton
                        aria-label="Close"
                        onClick={handleInfoClose}
                        className={classes.closeButton}
                    >
                      <CloseIcon />
                    </IconButton>
                    <InfoAdministrador
                        adminData={adminData}
                        email={admintRow.email}
                    />
                  </Box>
                </Modal>
              </>
            }
        />
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
                  <EliminarProyecto
                      projectId={projectRow.id}
                      projectName={projectRow.name}
                      handleClose={handleRemoveClose}
                      setNotify={setNotify}
                  />
                </Dialog>
              </>
            }
        />*/}
        <Notificacion notify={notify} setNotify={setNotify} />
      </div>
  );
};

const columns = [
  {
    field: "id",
    headerName: "Email",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 0.3,
    renderCell: (params) => {
      return (
        <div>
          <Acciones adminRow={params.row}/>
        </div>
      );
    },
  },
];

Acciones.propTypes = {
  adminRow: PropTypes.any,
};


let rows = [
  { id: 'example@effectus.com' },
];

export default function Administrador({ rows }) {
  const classes = useStyles();
  const [openNew, setOpenNew] = React.useState(false);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });

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
        {/*<DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            style={{ height: "70vh" }}
        />
*/}
        <Notificacion notify={notify} setNotify={setNotify} />
      </div>
  );
}