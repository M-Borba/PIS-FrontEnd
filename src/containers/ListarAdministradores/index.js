import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Administradores from "../../components/Administradores";
import { Typography } from "@material-ui/core";
import UpdateGridProvider from "../UpdateGridProvider";

export default function ListarAdministradores() {
  let rawRows;
  const [rows, setRows] = useState([]);

  const fetchData = () => {
    axiosInstance.get("/users").then((response) => {
      rawRows = response.data.administrators;

      const rowsNuevas = rawRows.map((row) => {
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
        color="#1c1c1c"
        variant="h4"
        align="center"
      >
        LISTADO DE ADMINISTRADORES
      </Typography>
      <UpdateGridProvider>
        <Administradores rows={rows} setRows={setRows} />
      </UpdateGridProvider>
    </div>
  );
}
