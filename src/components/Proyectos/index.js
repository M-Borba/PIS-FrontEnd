import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import EliminarProyecto from "../../containers/EliminarProyecto";
import EditarProyecto from "../../containers/EditarProyecto";
import InfoProyecto from "../../containers/InfoProyecto";

Proyecto.propTypes = {
  rows: PropTypes.array,
};

const Acciones = ({ projectRow }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const classes = useStyles();

  const [projectData] = React.useState({
    id: projectRow.id,
    name: projectRow.name,
    project_type: projectRow.project_type.toLowerCase().replaceAll(" ", "_"),
    project_state: projectRow.project_state.toLowerCase(),
    description: projectRow.description,
    budget: projectRow.budget,
    start_date: projectRow.start_date,
    end_date: projectRow.end_date,
  });

  const handleInfoClick = () => { setOpenInfo(true) };

  const handleInfoClose = () => {
    setOpenInfo(false);
    window.location.reload(); //este reload esta bien?
  };

  const handleEditOpen = (e) => setOpenEdit(true);

  const handleEditClose = () => {
    setOpenEdit(false);
    window.location.reload(); //lo mismo aca
  };

  const handleRemoveOpen = () => setOpenRemove(true);

  const handleRemoveClose = () => setOpenRemove(false);

  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <FormControlLabel
        control={
          <>
            <Button variant="outlined" onClick={handleInfoClick}>
              Ver Info Completa
            </Button>
            <Modal
              open={openInfo}
              onClose={handleInfoClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              disableEnforceFocus
            >
              <Box className={classes.modalInfo}>
                <InfoProyecto projectData={projectData} />
              </Box>
            </Modal>
          </>
        }
      />
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
              disableEnforceFocus
            >
              <Box className={classes.modal}>
                <EditarProyecto projectData={projectData} id={projectData.id} />
              </Box>
            </Modal>
          </>
        }
      />
      <FormControlLabel
        control={
          <React.Fragment>
            <IconButton onClick={handleRemoveOpen}>
              <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
            </IconButton>
            <Dialog
              open={openRemove}
              onClose={handleRemoveClose}
              // disableBackdropClick
              // disableEscapeKeyDown
              maxWidth="xs"
              aria-labelledby="confirmation-dialog-title"
            >
              <EliminarProyecto
                projectId={projectRow.id}
                projectName={projectRow.name}
                handleClose={handleRemoveClose}
              />
            </Dialog>
          </React.Fragment>
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
    field: "name",
    headerName: "Nombre",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "project_type",
    headerName: "Tipo",
    flex: 0.7,
  },
  {
    field: "project_state",
    headerName: "Estado",
    sortable: true,
    flex: 0.5,
  },
  {
    field: "start_date",
    headerName: "Fecha Inicio",
    flex: 0.6,
    type: "date",
  },
  {
    field: "end_date",
    headerName: "Fecha Fin",
    flex: 0.6,
    type: "date",
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 1.5,
    renderCell: (params) => {
      return (
        <div>
          <Acciones projectRow={params.row} />
        </div>
      );
    },
  },
];

Acciones.propTypes = {
  projectRow: PropTypes.any,
};

export default function Proyecto({ rows }) {
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "asc",
    },
  ]);

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
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
      <div
        style={{
          margin: 10,
        }} /* relleno, si alguien sabe hacer esto mejor que lo cambie*/
      ></div>
      <Button
        color="primary"
        variant="contained"
      /*onClick={() =>
Aca va formulario para agregar proyecto
}*/
      >
        Agregar Proyecto
      </Button>
    </div>
  );
}
