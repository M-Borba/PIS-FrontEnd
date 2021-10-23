import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Proyectos from "../../components/Proyectos";
import { Typography } from "@material-ui/core";

export default function ListarProyectos() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);

  const fetchData = () => {
    return axiosInstance.get("/projects").then((response) => {
      rows = response.data.projects;
      //const currDate = new Date();
      let rowsNuevas =
        rows /*.filter(row => new Date(row.end_date) > currDate)*/
          .map((row) => {
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
      <Proyectos rows={rowsFormateadas} />
    </div>
  );
}
