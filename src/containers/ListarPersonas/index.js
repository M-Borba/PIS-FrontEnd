import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Personas from "../../components/Personas";

export default function ListarPersonas() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);

  const fetchData = () => {
    return axiosInstance.get("/people").then((response) => {
      rows = response.data.people;
      let rowsNuevas = rows.map((row) => {
        return {
          fullName: row.full_name,
          id: row.email,
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

  return <Personas rows={rowsFormateadas} />;
}
