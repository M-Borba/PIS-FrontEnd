import * as React from "react";
import PropTypes from "prop-types";
import Listado from "../../components/Listado";
import Acciones from "./acciones"

Administrador.propTypes = {
  rows: PropTypes.array,
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

export default function Administrador({ rows }) {
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
      type={2} //type=2 representa admin
    />
  );
}
