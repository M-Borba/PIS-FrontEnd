import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Proyectos from "../../components/Proyectos";

export default function ListarProyectos() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);

  const fetchData = () => {
    return axiosInstance.get("/projects").then((response) => {
      rows = response.data.people;
      let rowsNuevas = rows.map((row) => {
        return {
          //parametros
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
