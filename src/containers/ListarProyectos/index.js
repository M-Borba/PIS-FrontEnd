import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Proyectos from "../../components/Proyectos";

export default function ListarProyectos() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);

  const fetchData = () => {
    return axiosInstance.get("/projects").then((response) => {
      rows = response.data.projects;
      console.log(rows);
      let rowsNuevas = rows.map((row) => {
        return {
          id: row.id,
          nombre: row.name,
          tipo: row.project_type
            .replaceAll("_", " ")
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          estado: row.project_state.replace(/^\w/, (m) => m.toUpperCase()),
          inicio: row.start_date.replaceAll("-", "/"),
          fin: row.end_date.replaceAll("-", "/"),
        };
      });
      setRows(rowsNuevas);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Proyectos rows={rowsFormateadas} />;
}
