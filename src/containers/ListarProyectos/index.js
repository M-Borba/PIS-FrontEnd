import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Proyectos from "../../components/Proyectos";

export default function ListarProyectos() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);

  const fetchData = () => {
    return axiosInstance.get("/projects").then((response) => {
      rows = response.data.projects;
      let rowsNuevas = rows.map((row) => {
        return {
          id: row.id,
          name: row.name,
          project_type: row.project_type
            .replaceAll("_", " ")
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          project_state: row.project_state.replace(/^\w/, (m) =>
            m.toUpperCase()
          ),
          description: row.description,
          budget: row.budget,
          start_date: row.start_date.replaceAll("-", "/"),
          end_date:
            row.end_date != null ? row.end_date.replaceAll("-", "/") : null,
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
