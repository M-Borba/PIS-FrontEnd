import * as React from "react";
import PropTypes from "prop-types";

import Listado from "../../components/Listado";
import Acciones from "./acciones";
import { UpdateGridContext } from "../../containers/UpdateGridProvider/index";
import { BUTTON_LABELS, PERSON_LABELS } from "../../config/globalVariables";

Administrador.propTypes = {
  rows: PropTypes.array,
  setRows: PropTypes.func,
};

const columns = [
  {
    field: "id",
    headerName: PERSON_LABELS.ID,
    hide: true,
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "fullName",
    headerName: PERSON_LABELS.NOMBRE_COMPLETO,
    sortable: true,
    flex: 1, //tamaño
  },
  {
    field: "email",
    headerName: PERSON_LABELS.EMAIL,
    sortable: true,
    flex: 1,
  },
  {
    field: "actions",
    type: "actions",
    headerName: PERSON_LABELS.ACCIONES,
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

export default function Administrador({ rows, setRows }) {
  const [setRemoveRow, setEditRow] = React.useContext(UpdateGridContext);
  const [openNew, setOpenNew] = React.useState(false);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const handleNewOpen = () => setOpenNew(true);
  const handleNewClose = () => setOpenNew(false);

  const removeRow = (adminId) =>
    setRows(rows.filter((row) => row.id !== adminId));
  setRemoveRow.current = (adminId) => removeRow(adminId);

  return (
    <Listado
      button={BUTTON_LABELS.AGREGAR_ADMINISTRADOR}
      buttonClick={handleNewOpen}
      modalOpen={openNew}
      modalOnClose={handleNewClose}
      sortModel={sortModel}
      setSortModel={setSortModel}
      columns={columns}
      rows={rows}
      setRows={setRows}
      type={2} //type=2 representa admin
    />
  );
}
