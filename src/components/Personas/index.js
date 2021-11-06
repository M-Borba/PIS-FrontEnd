import * as React from "react";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import Listado from "../../components/Listado";
import Acciones from "./acciones"


Personas.propTypes = {
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
    field: "fullName",
    headerName: "Nombre Completo",
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
    headerName: "Carga Horaria Semanal",
    flex: 0.7,
  },
  {
    field: "technologies",
    headerName: "Tecnologías",
    hide: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Acciones",
    flex: 0.5,
    renderCell: (params) => {
      return (
        <div>
          <Acciones personRow={params.row} />
        </div>
      );
    },
  },
];

export default function Personas({ rows, setRows }) {
  const [setRemoveRow, setEditRow] = React.useContext(UpdateGridContext);
  const [openNew, setOpenNew] = React.useState(false);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [sortModel, setSortModel] = React.useState([
    {
      field: "fullName",
      sort: "asc",
    },
  ]);
  const classes = useStyles();

  const handleNewOpen = () => setOpenNew(true);

  const handleNewClose = () => setOpenNew(false);

  const addRow = (newRow) => setRows([...rows, newRow]);

  const removeRow = (personId) =>
    setRows(rows.filter((row) => row.id != personId));
  setRemoveRow.current = (personId) => removeRow(personId);

  const editRow = (personData) =>
    setRows(
      rows.map((row) =>
        row.id == personData.id
          ? {
            ...row,
            fullName: personData.fullName,
            firstName: personData.firstName,
            lastName: personData.lastName,
            email: personData.email,
            cargaHoraria: personData.cargaHoraria,
            tag: ".",
            technologies: personData.technologies,
          }
          : row
      )
    );
  setEditRow.current = (personData) => editRow(personData);

  return (
    <Listado
      button={"Agregar Persona"}
      buttonClick={handleNewOpen}
      modalOpen={openNew}
      modalOnClose={handleNewClose}
      sortModel={sortModel}
      setSortModel={setSortModel}
      notify={notify}
      setNotify={setNotify}
      columns={columns}
      rows={rows}
    />
  );
}
