import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Administradores from "../../components/Administradores";
import { Typography } from "@material-ui/core";

export default function ListarAdministradores() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);


  //no esta el endpoint en back para traer admins
  const fetchData = () => {
    axiosInstance.get("/people").then((response) => {
      rows = response.data.people;

      let rowsNuevas = rows.map((row) => {
        return {
          fullName: row.full_name,
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email,
          id: row.id,
        };
      });
      setRows(rowsNuevas);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography
        style={{ marginTop: 20 }}
        color="primary"
        variant="h4"
        align="center"
      >
        LISTADO DE ADMINISTRADORES
      </Typography>
      <Administradores rows={rowsFormateadas} />
    </div>
  );
}
