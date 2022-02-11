import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";

import { axiosInstance } from "../../config/axios";
import Personas from "../../components/Personas";
import UpdateGridProvider from "../UpdateGridProvider";
import Loading from "../../components/Loading";

export default function ListarPersonas() {
  let rawRows;
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const fetchData = async () => {
    setIsLoading(true);
    await axiosInstance.get("/people").then((response) => {
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
          <UpdateGridProvider>
            <Personas rows={rows} setRows={setRows} />
          </UpdateGridProvider>
        </>
      )}
    </div>
  );
}
