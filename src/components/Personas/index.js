import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import CreatePerson from "../../containers/CreatePerson";
import EditPerson from "../../containers/EditPerson";
Personas.propTypes = {
  rows: PropTypes.array,
};

const Acciones = () => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [personData, setPersonData] = React.useState({});
  const handleEditOpen = (e) => {
    let htmlRow =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode;
    let dataElements = htmlRow.children;
    let fullName = dataElements[1].innerHTML.split(" ");
    setPersonData({
      id: dataElements[0].innerHTML,
      first_name: fullName[0],
      last_name: fullName[1],
      email: dataElements[2].innerHTML,
      working_hours: dataElements[3].innerHTML,
    });
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    window.location.reload();
  };

  const handleRemoveClick = () => {
    // aca para borrar la persona
  };
  const classes = useStyles();
  return (
    <div>
      <FormControlLabel
        control={
          <>
            <IconButton onClick={handleEditOpen}>
              <EditIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Modal
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.modal}>
                <EditPerson personData={personData} id={personData.id} />
              </Box>
            </Modal>
          </>
        }
      />
      <FormControlLabel
        control={
          <IconButton onClick={handleRemoveClick}>
            <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
          </IconButton>
        }
      />
    </div>
  );
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    //id
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
    field: "cargaHoraria",
    headerName: "Carga horaria",
    flex: 0.7,
  },
  {
    field: "tag",
    headerName: "Etiqueta",
    sortable: true,
    flex: 1,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <Acciones />
        </div>
      );
    },
  },
];

export default function Personas({ rows }) {
  const [openNew, setOpenNew] = React.useState(false);
  const handleNewOpen = () => setOpenNew(true);
  const handleNewClose = () => {
    setOpenNew(false);
    window.location.reload();
  };

  const classes = useStyles();
  return (
    <div
      style={{
        position: "fixed",
        top: "15%",
        left: "5%",
        height: "75%",
        width: "90%",
      }}
    >
      <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
      <div
        style={{
          margin: 10,
        }} /* relleno, si alguien sabe hacer esto mejor que lo cambie*/
      ></div>
      <Button color="primary" variant="contained" onClick={handleNewOpen}>
        Agregar Persona
      </Button>
      <Modal
        open={openNew}
        onClose={handleNewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <CreatePerson />
        </Box>
      </Modal>
    </div>
  );
}
