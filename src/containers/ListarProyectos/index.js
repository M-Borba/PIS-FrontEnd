import React, { useEffect, useState } from "react";

import { axiosInstance } from "../../config/axios";
import Proyectos from "../../components/Proyectos";
import UpdateGridProvider from "../UpdateGridProvider";
import Loading from "../../components/Loading";
import moment from "moment";
import { DATE_FORMAT } from "../../config/globalVariables";

export default function ListarProyectos() {
  var rawRows;
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const fetchData = async () => {
    setIsLoading(true);
    await axiosInstance.get("/projects").then((response) => {
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
          start_date: moment(row.start_date).format(DATE_FORMAT),
          end_date: moment(row.end_date).format(DATE_FORMAT),
          // row.end_date != null              ?
          // : null,
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
