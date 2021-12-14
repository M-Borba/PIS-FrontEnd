import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";

import { axiosInstance } from "../../config/axios";
import Administradores from "../../components/Administradores";
import UpdateGridProvider from "../UpdateGridProvider";
import Loading from "../../components/Loading";

export default function ListarAdministradores() {
  let rawRows;
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const fetchData = async () => {
    setIsLoading(true);
    await axiosInstance.get("/users").then((response) => {
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
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
