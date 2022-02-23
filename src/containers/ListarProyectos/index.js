import React, { useEffect, useState } from "react";

import { axiosInstance } from "../../config/axios";
import Proyectos from "../../components/Proyectos";
import UpdateGridProvider from "../UpdateGridProvider";
import Loading from "../../components/Loading";
import {
  rawDateToDateFormat,
  stateRowDisplayFormat,
  typeRowDisplayFormat,
} from "../../utils/utils";

export default function ListarProyectos() {
  var rawRows;
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    await axiosInstance.get("/projects").then((response) => {
      rawRows = response.data.projects;
      let rowsNuevas = rawRows.map((row) => {
        return {
          id: row.id,
          name: row.name,
          project_type: typeRowDisplayFormat(row.project_type),
          project_state: stateRowDisplayFormat(row.project_state),
          description: row.description,
          budget: row.budget,
          start_date: rawDateToDateFormat(row.start_date),
          end_date:
            row.end_date !== null ? rawDateToDateFormat(row.end_date) : null,
          people: row.people,
          organization: row.organization,
          technologies: row.technologies || [],
        };
      });
      setRows(rowsNuevas);
      setIsLoading(false);
    });
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
          <UpdateGridProvider>
            <Proyectos rows={rows} setRows={setRows} />
          </UpdateGridProvider>
        </>
      )}
    </div>
  );
}
