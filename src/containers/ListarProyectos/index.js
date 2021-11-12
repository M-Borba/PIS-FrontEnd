import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Proyectos from "../../components/Proyectos";
import { Typography } from "@material-ui/core";
import UpdateGridProvider from "../UpdateGridProvider";

export default function ListarProyectos() {
  var rawRows;
  const [rows, setRows] = useState([]);

  const fetchData = () => {
    axiosInstance.get("/projects").then((response) => {
      rawRows = response.data.projects;
      let rowsNuevas = rawRows.map((row) => {
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
          people: row.people,
          organization: row.organization,
          technologies: row.technologies || [],
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
        LISTADO DE PROYECTOS
      </Typography>
      <UpdateGridProvider>
        <Proyectos rows={rows} setRows={setRows} />
      </UpdateGridProvider>
    </div>
  );
}
