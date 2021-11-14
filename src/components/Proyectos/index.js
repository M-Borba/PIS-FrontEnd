import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import CreateProject from "../../containers/CreateProject";
import { UpdateGridContext } from "../../containers/UpdateGridProvider/index";
import Acciones from "./acciones";

Proyecto.propTypes = {
  rows: propTypes.array,
  setRows: propTypes.func,
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    hide: true,
  },
  {
    field: "name",
    headerName: "Nombre",
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "organization",
    headerName: "Organización",
    sortable: true,
    flex: 0.6,
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
    field: "technologies",
    headerName: "tecnologías",
    hide: true,
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

function formatType(projectType) {
  return projectType
    .replaceAll("_", " ")
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}

function formatState(projectState) {
  return projectState.replace(/^\w/, (m) => m.toUpperCase());
}

export default function Proyecto({ rows, setRows }) {
  const [setRemoveRow, setEditRow] = React.useContext(UpdateGridContext);
  const classes = useStyles();
  const [openNew, setOpenNew] = React.useState(false);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const handleNewOpen = () => setOpenNew(true);
  const handleNewClose = () => setOpenNew(false);

  const addRow = (newRow) => setRows([...rows, newRow]);

  const removeRow = (projectId) =>
    setRows(rows.filter((row) => row.id != projectId));
  setRemoveRow.current = (projectId) => removeRow(projectId);

  const editRow = (projectData) =>
    setRows(
      rows.map((row) =>
        row.id == projectData.id
          ? {
            ...row,
            name: projectData.name,
            project_type: formatType(projectData.project_type),
            project_state: formatState(projectData.project_state),
            description: projectData.description,
            budget: projectData.budget,
            start_date: projectData.start_date.replaceAll("-", "/"),
            end_date: projectData.end_date
              ? projectData.end_date.replaceAll("-", "/")
              : null,
            people: projectData.people,
            organization: projectData.organization,
            technologies: projectData.technologies,
          }
          : row
      )
    );
  setEditRow.current = (projectData) => editRow(projectData);

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
          onClick={handleNewOpen}
        >
          Agregar Proyecto
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
          <CreateProject addRow={addRow} onClose={handleNewClose} />
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
    </div>
  );
}
