import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import CreatePerson from "../../containers/CreatePerson";
import CreateProject from "../../containers/CreateProject";
import CreateAdministrator from "../../containers/CreateAdministrator";
import Notificacion from "../../components/Notificacion";

Listado.propTypes = {
  button: propTypes.string.isRequired,
  buttonClick: propTypes.func.isRequired,
  modalOpen: propTypes.bool.isRequired,
  modalOnClose: propTypes.func.isRequired,
  sortModel: propTypes.array.isRequired,
  setSortModel: propTypes.func.isRequired,
  notify: propTypes.object.isRequired,
  setNotify: propTypes.func.isRequired,
  columns: propTypes.array.isRequired,
  rows: propTypes.array.isRequired,
  setRows: propTypes.func.isRequired,
  type: propTypes.number.isRequired,
};

export default function Listado({
  button,
  buttonClick,
  modalOpen,
  modalOnClose,
  sortModel,
  setSortModel,
  notify,
  setNotify,
  columns,
  rows,
  setRows,
  type,
}) {
  const addRow = (newRow) => setRows([...rows, newRow]);

  function renderCreate(type) {
    switch (type) {
      case 0: //PERSONA
        return <CreatePerson setNotify={setNotify} />;
      case 1: //PROYECTO
        return <CreateProject setNotify={setNotify} />;
      case 2: //ADMIN
        return (
          <CreateAdministrator
            setNotify={setNotify}
            addRow={addRow}
            onClose={modalOnClose}
          />
        );
    }
  }

  const classes = useStyles();

  return (
    <div
      style={{
        margin: "1vw",
      }}
    >
      <Box m={1} mb={1} className={`${classes.rightBox} ${classes.box}`}>
        <Button
          style={{
            color: "#ffffff",
            background: "#1c1c1c",
          }}
          variant="contained"
          onClick={buttonClick}
        >
          {button}
        </Button>
      </Box>

      <Modal
        open={modalOpen}
        onClose={modalOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <IconButton
            aria-label="Close"
            onClick={modalOnClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          {renderCreate(type)}
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
