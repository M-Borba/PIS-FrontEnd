import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Administradores from "../../components/Administradores";
import { Typography } from "@material-ui/core";

export default function ListarAdministradores() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);
    
  const fetchData = () => {
    axiosInstance.get("/users").then((response) => {
      rows = response.data.administrators;

      let rowsNuevas = rows.map((row) => {
        return {
          id: row.id,
          email: row.email,
          fullName: row.name,
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
