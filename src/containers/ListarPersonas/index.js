import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Personas from "../../components/Personas";
import { Typography } from "@material-ui/core";

export default function ListarPersonas() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);

  const fetchData = () => {
    return axiosInstance.get("/people").then((response) => {
      rows = response.data.people;
      let rowsNuevas = rows.map((row) => {
        return {
          fullName: row.full_name,
          email: row.email,
          id: row.id,
          cargaHoraria: row.working_hours,
          tag: ".",
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
      <Typography style={{ marginTop: 20 }} color="primary" variant="h4" align="center">
        LISTADO DE PERSONAS
      </Typography>
      <Personas rows={rowsFormateadas} />
    </div>
  );
}
