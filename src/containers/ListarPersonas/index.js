import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Personas from "../../components/Personas";
import { Typography } from "@material-ui/core";
import UpdateGridProvider from "../UpdateGridProvider";

export default function ListarPersonas() {
  let rawRows;
  const [rows, setRows] = useState([]);

  const fetchData = () => {
    axiosInstance.get("/people").then((response) => {
      rawRows = response.data.people;

      let rowsNuevas = rawRows.map((row) => {
        return {
          fullName: row.full_name,
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email,
          id: row.id,
          cargaHoraria: row.working_hours,
          technologies: row.technologies,
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
        LISTADO DE PERSONAS
      </Typography>
      <UpdateGridProvider>
        <Personas rows={rows} setRows={setRows} />
      </UpdateGridProvider>
    </div>
  );
}
